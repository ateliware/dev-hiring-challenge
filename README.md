# HighlightRepo

HighlighRepo is a fullstack application to show you the top 10 highlighted git repos 
languages built in Elixir, Python, Javascript, PHP and Rust.

**Application deployed and available at: [Gigalixir](https://highlight-repo.gigalixirapp.com/)** 

This application was built with the stack:

**Backend: [Elixir](https://elixir-lang.org) ([Phoenix](https://www.phoenixframework.org))**

**Frontend: [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) (No framework)**

**Database: [Postgres](https://www.postgresql.org)**

**Database: [Docker](https://www.docker.com)**

*Note: since this project's API is using the free githup repositories API, multiple searches at the same time
or too much requests in a short period may exceed the Github's rate limit per request and an error will be returned.* 

## **Installation**

To use this service you'll need [Elixir](https://elixir-lang.org/install.html),
[Phoenix](https://hexdocs.pm/phoenix/installation.html) e [PostgreSql](https://www.postgresql.org/).

You may want to use postgres from a docker container. 
For that, type the following command to create an "up and running" postgres container automatically for you `docker-compose -f postgres-compose.yml up -d`

* Install dependencies by using `mix deps.get`
* Setup your database structure by using `mix ecto.setup`
* Initialize Phoenix locally by typing `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser or api tool to access routes.

## **Tests**

This application has 100% tests coverage. So in order to run follow the below:

* Run the tests using the command `mix test`

* Check tests coverage with the command `mix coveralls.html`

## **API**

Here's a little bit about the api in case you want to use it alone without the frontend.

Why not? It's a open source project.

*Note: Using the api, you can search for ANY languages to get highlighted repos on github*

## **Routes**

### **Repos Info**

endpoint: `/repos`

type: `POST`

**Params**

* To be searched for: `language string`

**Body Params (JSON)**

```json
{
 "language": "elixir"
}
```

**Response**

```json
{
  "data": [
    {
      "description": "Elixir is a dynamic, functional language designed for building scalable and maintainable applications",
      "forks": 2833,
      "name": "elixir",
      "owner": {
        "avatar_url": "https://avatars.githubusercontent.com/u/1481354?v=4",
        "name": "elixir-lang",
        "url": "https://github.com/elixir-lang"
      },
      "stars": 19799,
      "url": "https://github.com/elixir-lang/elixir"
    }
  ]
}
```

### **Get Repo**

endpoint: `/repo?name={name}`

**Params**

* Repo name: `name string`

type: `GET`

**Response**

```json
{
  "description": "Elixir is a dynamic, functional language designed for building scalable and maintainable applications",
  "forks": 2833,
  "name": "elixir",
  "owner": {
    "avatar_url": "https://avatars.githubusercontent.com/u/1481354?v=4",
    "name": "elixir-lang",
    "url": "https://github.com/elixir-lang"
  },
  "stars": 19799,
  "url": "https://github.com/elixir-lang/elixir"
}
```