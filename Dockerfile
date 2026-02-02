# ---------- FRONTEND BUILD ----------
FROM node:22-alpine AS frontend
WORKDIR /frontend
COPY front/frontend/package*.json ./
RUN npm install
COPY front/frontend .
RUN npm run build

# ---------- BACKEND ----------
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpq-dev gcc nginx && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY back/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY back .

# copy frontend build into nginx
COPY --from=frontend /frontend/dist /var/www/frontend

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD service nginx start && gunicorn backend.wsgi:application --bind 0.0.0.0:8000
