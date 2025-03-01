FROM python:3.9

WORKDIR /app

COPY . .

COPY .env .env

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8374

CMD ["python", "main.py"]
