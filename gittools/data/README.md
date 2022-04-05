# dev-hiring-challenge
[Ateliware hiring challenge for devs](https://github.com/ateliware/dev-hiring-challenge)

This application is an exercise that will search the most relevant github repositories in C, Elixir, Python, PHP and Rust languages.

The application is [deployed](https://alissonthecrow.pythonanywhere.com/) and available for testing

For the *Backend* we used [Django](https://www.djangoproject.com/), which is a popular [Python](https://www.python.org/) web framework, while Frontend uses HTML and pure CSS. *Data persistence* was built into a [PostgreSQL](https://www.postgresql.org) *database*, all in a development environment running on top of [Docker](https://www.docker.com).

## Installation

*Note: The following example commands assume the use of a Debian-based Linux operating system such as Ubuntu.*

The tools needed to build the application locally are **Python 3** with **Pip** and **Venv**, **Git** and **Docker**.

```console
sudo apt install -y python3 python3-pip python3-venv git docker docker-compose
```

It only takes two steps. First we will download the project and then we will build the application.

### Downloading the project

Use **Git** to download the project from the repository, and **Docker** to download the environment's dependencies.

```console
git clone https://github.com/w-a-gomes/dev-hiring-challenge.git && cd dev-hiring-challenge/
```

```console
sudo groupadd docker ; sudo usermod -aG docker $USER ; docker-compose up -d
```

**Pip** is for downloading project dependencies.

```console
python3 -m pip install --upgrade pip && python3 -m venv venv && . venv/bin/activate
```

```console
python -m pip install psycopg2-binary && python -m pip install -r requirements.txt
```

### Build the application

Now just create the cache folder and make the database migrations.

```console
mkdir -p db/postgresql/data/ && cd gittools/
```

```console
python manage.py makemigrations && python manage.py migrate
```

🎉 Finished!

To test, just run the server with `python manage.py runserver` command, and access the address [127.0.0.1:8000](http://127.0.0.1:8000/) in your browser.

```console
python manage.py runserver
```

## Tests

A test coverage report can be done with Coverage tool

```console
coverage run --source='.' manage.py test searchapp && coverage report
```
