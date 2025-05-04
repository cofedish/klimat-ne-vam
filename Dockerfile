FROM python:3.11-slim

WORKDIR /app

# Установка system зависимостей
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Установка rq глобально
RUN pip install rq==1.16.1

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8375", "app:app"]
