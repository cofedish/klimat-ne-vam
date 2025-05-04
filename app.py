import os
import logging
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
from redis import Redis
from rq import Queue, Retry
from rq.job import Job
from rq.registry import FinishedJobRegistry, FailedJobRegistry
import requests
import traceback

app = Flask(__name__)
CORS(app)

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('api.log')
    ]
)
logger = logging.getLogger(__name__)

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

def log_environment():
    """Логирование конфигурационных параметров"""
    logger.info("Environment variables:")
    logger.info(f"REDIS_HOST: {os.getenv('REDIS_HOST', 'redis')}")
    logger.info(f"TELEGRAM_BOT_TOKEN: {'set' if TELEGRAM_BOT_TOKEN else 'not set!'}")
    logger.info(f"TELEGRAM_CHAT_ID: {'set' if TELEGRAM_CHAT_ID else 'not set!'}")

def cleanup_old_jobs():
    """Cleanup old jobs from Redis"""
    try:
        logger.info("Starting Redis cleanup process")
        finished_registry = FinishedJobRegistry(queue=queue)
        failed_registry = FailedJobRegistry(queue=queue)
        
        # Clean finished jobs
        finished_count = 0
        for job_id in finished_registry.get_job_ids():
            job = Job.fetch(job_id, connection=redis_conn)
            if job.ended_at and (datetime.now() - job.ended_at) > timedelta(hours=1):
                finished_registry.remove(job)
                finished_count += 1
        logger.info(f"Removed {finished_count} finished jobs")
        
        # Clean failed jobs
        failed_count = 0
        for job_id in failed_registry.get_job_ids():
            job = Job.fetch(job_id, connection=redis_conn)
            if job.ended_at and (datetime.now() - job.ended_at) > timedelta(days=7):
                failed_registry.remove(job)
                failed_count += 1
        logger.info(f"Removed {failed_count} failed jobs")

    except Exception as e:
        logger.error(f"Cleanup error: {str(e)}\n{traceback.format_exc()}")
        raise

def send_to_bot(job_data):
    """Send request to Telegram bot with detailed logging"""
    try:
        logger.info("Starting Telegram send process")
        logger.debug("Telegram config check: BOT_TOKEN=%s, CHAT_ID=%s", 
                    TELEGRAM_BOT_TOKEN[:4] + '...' if TELEGRAM_BOT_TOKEN else 'None',
                    TELEGRAM_CHAT_ID[:2] + '...' if TELEGRAM_CHAT_ID else 'None')
        
        if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
            logger.error("Telegram credentials not configured!")
            raise ValueError("Telegram credentials not configured")

        message = (
            f"New request:\n"
            f"Name: {job_data['name']}\n"
            f"Phone: {job_data['phone_number']}\n"
            f"Service: {job_data['type_of_service']}"
        )
        
        logger.debug("Constructed message: %s", message)
        logger.info("Sending message to Telegram API")

        start_time = datetime.now()
        response = requests.post(
            f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage',
            json={'chat_id': TELEGRAM_CHAT_ID, 'text': message},
            timeout=10
        )
        
        duration = (datetime.now() - start_time).total_seconds()
        logger.info(f"Telegram API response time: {duration:.2f}s")
        logger.debug(f"Telegram API response: {response.status_code} {response.text}")

        response.raise_for_status()
        logger.info("Message successfully sent to Telegram")
        return True

    except requests.exceptions.RequestException as e:
        logger.error(f"Telegram API error: {str(e)}\nResponse: {e.response.text if e.response else 'No response'}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error in send_to_bot: {str(e)}\n{traceback.format_exc()}")
        raise

@app.route('/health', methods=['GET'])
def health_check():
    logger.info("Health check request received")
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat(),
        'components': {
            'redis': redis_conn.ping(),
            'telegram': bool(TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)
        }
    }), 200

@app.route('/callback', methods=['POST', 'OPTIONS'])
def callback():
    """Основной обработчик запросов"""
    logger.info("New callback request received")
    logger.debug("Headers: %s", dict(request.headers))
    
    # Проверка Origin
    origin = request.headers.get('Origin')
    logger.debug("Request origin: %s", origin)
    
    allowed_origins = ['https://climatvam-nsk.ru', 'http://localhost:8732']
    if origin not in allowed_origins:
        logger.warning("Forbidden origin: %s", origin)
        return jsonify({'error': 'Forbidden'}), 403
        
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS preflight request")
        return jsonify({'status': 'preflight'}), 200

    try:
        logger.debug("Raw request data: %s", request.get_data(as_text=True))
        data = request.get_json()
        logger.info("Parsed request data: %s", {
            'name': data.get('name'),
            'phone': data.get('phone_number'),
            'service': data.get('type_of_service')
        })

        # Валидация полей
        required_fields = ['name', 'phone_number', 'type_of_service']
        missing_fields = [f for f in required_fields if f not in data]
        if missing_fields:
            logger.warning("Missing required fields: %s", missing_fields)
            return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

        # Добавление задачи в очередь
        logger.info("Enqueueing job to Redis")
        job = queue.enqueue(
            send_to_bot,
            job_data=data,
            retry=Retry(max=3, interval=[10, 30, 60]),
            job_timeout=300,
            ttl=86400,
            failure_ttl=604800
        )
        
        logger.info("Job enqueued successfully. Job ID: %s", job.id)
        return jsonify({
            'status': 'queued',
            'job_id': job.id,
            'queue_position': job.get_position()
        }), 202

    except Exception as e:
        logger.error(f"API Error: {str(e)}\n{traceback.format_exc()}")
        return jsonify({
            'error': 'Internal server error',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    log_environment()
    cleanup_old_jobs()
    try:
        logger.info("Starting API server")
        app.run(host='0.0.0.0', port=8375, debug=False)
    except Exception as e:
        logger.critical(f"Failed to start server: {str(e)}\n{traceback.format_exc()}")
        raise
