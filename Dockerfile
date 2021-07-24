FROM python:3

ENV PYTHONUNBUFFERED=1
ENV FLASK_DEBUG=1
RUN mkdir -p /opt/services/flaskapp/src
#VOLUME ["/opt/services/flaskapp/src"]
# We copy the requirements.txt file first to avoid cache invalidations
COPY requirements.txt /opt/services/flaskapp/src/
WORKDIR /opt/services/flaskapp/src
RUN pip install -r requirements.txt
COPY . /opt/services/flaskapp/src
#EXPOSE 5000/tcp
#CMD ["python", "app.py"]
CMD ["flask", "run"]
