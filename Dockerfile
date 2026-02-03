

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


ENV SECRET_KEY=dummy-build-key
ENV DATABASE_URL=sqlite:///buildtime.db
ENV REDIS_URL=redis://localhost:6379
ENV DEBUG=False

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD sh -c "python manage.py migrate && daphne backend.asgi:application --bind 0.0.0.0 --port 8000"

