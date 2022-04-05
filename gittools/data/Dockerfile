# pull the official base image
FROM ubuntu

# set work directory
RUN mkdir -p /dev-hiring-challenge/db/postgresql/data
WORKDIR /dev-hiring-challenge/gittools

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apt update && apt upgrade -y && apt install -y python3 python3-pip
RUN python3 -m pip install --upgrade pip && python3 -m pip install psycopg2-binary

COPY ./requirements.txt /dev-hiring-challenge
RUN python3 -m pip install -r /dev-hiring-challenge/requirements.txt


# copy project
COPY . /dev-hiring-challenge

EXPOSE 8000

CMD ["python3", "manage.py", "makemigrations"]
CMD ["python3", "manage.py", "migrate"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
