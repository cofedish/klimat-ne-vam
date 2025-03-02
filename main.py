from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Настройка CORS с явным указанием параметров
CORS(app, resources={
    r"/callback": {
        "origins": "*",
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})


@app.route('/callback', methods=['POST', 'OPTIONS'])
def callback():
    if request.method == 'OPTIONS':
        # Возвращаем заголовки для preflight-запроса
        response = jsonify({'status': 'preflight'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()

    # Проверка данных и отправка в Telegram-бот
    if not all(key in data for key in ['name', 'phoneNumber', 'TypeOFService']):
        return jsonify({'error': 'Missing fields'}), 400

    # Ваша логика отправки в бот...

    return jsonify({'status': 'success'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8375, debug=True)