FROM tiangolo/uvicorn-gunicorn:python3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT=8000
ENV APP_MODULE=src.main:app


EXPOSE $PORT

WORKDIR /app

RUN apt-get update && apt-get install -y curl

RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python3 && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root --no-dev

COPY src ./src/
COPY ./static ./static/
COPY ./templates ./templates/
COPY src/config/prestart.sh ./alembic.ini ./
