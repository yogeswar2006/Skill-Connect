FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    libpq-dev gcc python3-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .


CMD ["sh", "-c", "python manage.py migrate && daphne -b 0.0.0.0 -p 8000 backend.asgi:application"]
