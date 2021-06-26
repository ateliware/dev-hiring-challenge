FROM tiangolo/meinheld-gunicorn:python3.8

ENV HOST 0.0.0.0
ENV PORT 5000
ENV BIND 0.0.0.0:5000
ENV LOG_LEVEL info

ENV PYTHONPATH=/app

WORKDIR /app

COPY . /app

COPY requirements.txt /
RUN pip install --no-cache-dir -U pip
RUN pip install --upgrade pip
RUN pip install -r /requirements.txt
RUN pip install greenlet==0.4.17
