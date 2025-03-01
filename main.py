import os
from flask import Flask, request, jsonify
import requests
from flask.cli import load_dotenv

app = Flask(__name__)
load_dotenv()
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")  # Здесь вставь свой токен

def get_chat_id(username):
    # Запрос к API Telegram, чтобы получить последние обновления
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        print(data)
        if data["result"]:
            for update in data["result"]:
                if "message" in update:
                    user = update["message"]["from"]
                    print(f"user: {user}")
                    if user.get("username") == username:
                        chat_id = update["message"]["chat"]["id"]
                        print(username)
                        return chat_id

        else:
            print("Нет сообщений")
            return None
    else:
        print(f"Ошибка при запросе: {response.status_code}")
        return None

TELEGRAM_CHAT_ID = get_chat_id("COFEDISH")


@app.route('/new_request', methods=['POST'])
def new_request():
    """Эндпоинт для получения заявки от API-сервера и отправки её в Telegram."""
    data = request.get_json()

    name = data.get('name')
    phone_number = data.get('phone_number')
    type_of_service = data.get('type_of_service')

    if not name or not phone_number or not type_of_service:
        return jsonify({'error': 'Invalid data'}), 400

    # Формируем сообщение для Telegram
    message = f"Новая заявка!\nИмя: {name}\nТелефон: {phone_number}"

    # Отправляем сообщение в Telegram
    send_to_telegram(message)

    return jsonify({'status': 'success'}), 200


def send_to_telegram(message):
    """Отправка сообщения в Telegram через Bot API."""
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    params = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message
    }
    response = requests.post(url, data=params)
    return response


if __name__ == '__main__':
    app.run(debug=True, port=5001)
