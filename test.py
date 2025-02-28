import requests

# URL твоего API, который принимает запросы
API_URL = 'http://localhost:5000/callback'  # Поменяй на свой API URL

# Данные заявки
data = {
    "name": "Иван Иванов",
    "phoneNumber": "1234567890",
    "TypeOFService": "Услуга 1"
}

# Отправляем POST-запрос на API
response = requests.post(API_URL, json=data)

# Проверяем статус ответа
if response.status_code == 200:
    print("Заявка успешно отправлена в Telegram!")
else:
    print(f"Ошибка: {response.status_code}, {response.text}")
