import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# URL бота (где он будет слушать новые заявки)
TELEGRAM_BOT_URL = 'http://bot:8374/new_request'  # Поменяй на правильный URL (если бот работает локально, то localhost)


@app.route('/callback', methods=['POST'])
def callback():
    """Эндпоинт для получения заявки с сайта и пересылки в Telegram-бот."""
    data = request.get_json()

    name = data.get('name')
    phone_number = data.get('phoneNumber')
    type_of_service = data.get('TypeOFService')

    if not name or not phone_number or not type_of_service:
        return jsonify({'error': 'Missing required fields'}), 400

    # Отправка заявки в Telegram-бот
    payload = {
        'name': name,
        'phone_number': phone_number,
        'type_of_service': type_of_service
    }

    # Отправляем заявку на Telegram-бота
    response = requests.post(TELEGRAM_BOT_URL, json=payload)

    if response.status_code == 200:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'error': 'Failed to forward request'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8375, host="0.0.0.0")
