# Используем официальный образ Python
FROM python:3.9

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы проекта в контейнер
COPY . .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Указываем порт, который будет слушать API
EXPOSE 8375

# Запускаем API-сервер (Flask) на порту 8375
CMD ["python", "api_server.py"]
