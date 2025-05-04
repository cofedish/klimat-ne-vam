import os
import logging
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
from redis import Redis
from rq import Queue, Retry
from rq.job import Job
from rq.registry import FinishedJobRegistry, FailedJobRegistry

app = Flask(__name__)
CORS(app)

# Redis connection
redis_conn = Redis(
    host=os.getenv('REDIS_HOST', 'redis'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    password=os.getenv('REDIS_PASSWORD'),
    decode_responses=True
)

queue = Queue(connection=redis_conn, default_timeout=600)

# Telegram config
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def cleanup_old_jobs():
    """Cleanup old jobs from Redis"""
    try:
        # Clean finished jobs older than 1h
        finished_registry = FinishedJobRegistry(queue=queue)
        for job_id in finished_registry.get_job_ids():
            job = Job.fetch(job_id, connection=redis_conn)
            if job.ended_at and (datetime.now() - job.ended_at) > timedelta(hours=1):
                finished_registry.remove(job)

        # Clean failed jobs older than 7d
        failed_registry = FailedJobRegistry(queue=queue)
        for job_id in failed_registry.get_job_ids():
            job = Job.fetch(job_id, connection=redis_conn)
            if job.ended_at and (datetime.now() - job.ended_at) > timedelta(days=7):
                failed_registry.remove(job)

    except Exception as e:
        logger.error(f"Cleanup error: {str(e)}")


def send_to_bot(job_data):
    """Send request to Telegram bot with retry logic"""
    try:
        response = requests.post(
            f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage',
            json={
                'chat_id': TELEGRAM_CHAT_ID,
                'text': f"New request:\nName: {job_data['name']}\nPhone: {job_data['phone_number']}\nService: {job_data['type_of_service']}"
            },
            timeout=10
        )
        response.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Telegram send error: {str(e)}")
        raise


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()}), 200


@app.route('/callback', methods=['POST', 'OPTIONS'])
def callback():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'preflight'}), 200

    try:
        data = request.get_json()
        if not all(k in data for k in ['name', 'phone_number', 'type_of_service']):
            return jsonify({'error': 'Missing required fields'}), 400

        job = queue.enqueue(
            send_to_bot,
            job_data=data,
            retry=Retry(max=3, interval=[10, 30, 60]),
            job_timeout=300,
            ttl=86400,
            failure_ttl=604800
        )

        return jsonify({'status': 'queued', 'job_id': job.id}), 202

    except Exception as e:
        logger.error(f"API Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    cleanup_old_jobs()
    app.run(host='0.0.0.0', port=8375, debug=False)
