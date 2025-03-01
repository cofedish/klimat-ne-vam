import requests

# URL твоего Telegram-бота
TELEGRAM_BOT_URL = 'http://localhost:5001/new_request'  # Поменяй на правильный URL (если бот работает локально, то localhost)

# Данные, которые ты отправляешь на бота (например, данные заявки)
data = {
    "name": "Иван Иванов",
    "phone_number": "1234567890",
    "type_of_service": "Услуга 1"
}

# Отправляем POST-запрос на сервер бота
response = requests.post(TELEGRAM_BOT_URL, json=data)

# Выводим ответ от бота
print(response.status_code)  # Статус код ответа
print(response.json())  # Ответ от бота
