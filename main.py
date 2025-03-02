from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import requests

app = Flask(__name__)
CORS(app, resources={
    r"/callback": {
        "origins": "*",
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Настройка логов
logging.basicConfig(level=logging.DEBUG)
app.logger.setLevel(logging.DEBUG)


@app.route('/callback', methods=['POST', 'OPTIONS'])
def callback():
    app.logger.info('Received request: %s %s', request.method, request.headers)

    if request.method == 'OPTIONS':
        app.logger.debug('Handling OPTIONS request')
        response = jsonify({'status': 'preflight'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    try:
        data = request.get_json()
        app.logger.debug('Request data: %s', data)

        if not all(key in data for key in ['name', 'phone_number', 'type_of_service']):
            return jsonify({'error': 'Missing fields'}), 400

        # Отправка в Telegram-бот
        response = requests.post(
            'http://bot:8374/new_request',
            json={
                'name': data['name'],
                'phone_number': data['phoneNumber'],
                'type_of_service': data['TypeOFService']
            }
        )

        response.raise_for_status()
        return jsonify({'status': 'success'}), 200

    except Exception as e:
        app.logger.error('Error processing request: %s', str(e))
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8375, debug=True)