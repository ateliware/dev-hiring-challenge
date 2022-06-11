# Ateliware



### Execution

- After clone the project install dependencies with poetry

```sh
$ poetry install
```

- Use docker compose to start PostgreSQL

```sh
$ docker-compose up -d --build postgres
```

- Run migrations to update the database

```sh
$ poetry run alembic upgrade head
```

- Start the Backend

```sh
$ poetry run uvicorn src.main:app --reload --port 8000
```


- Application
```sh
$ http://localhost:8000/search
```

### Tests
Run all tests
````sh
$ poetry run pytest test --asyncio-mode=strict
````

### Access Heroku
````sh
$ http://dev-hiring-challenge-backend.herokuapp.com/search
````

### Migrations

For auto-generating a migration after some mapping change, run the following command:

```sh
$ poetry run alembic revision --autogenerate -m "<migration name>"
```