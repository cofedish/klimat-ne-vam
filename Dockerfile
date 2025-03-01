# Используем Python
FROM python:3.9

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Передаем переменные через аргументы сборки
ARG TELEGRAM_BOT_TOKEN
ARG TELEGRAM_USERNAME

# Записываем переменные в окружение контейнера
ENV TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN
ENV TELEGRAM_USERNAME=$TELEGRAM_USERNAME

# Запускаем бота
CMD ["python", "main.py"]
