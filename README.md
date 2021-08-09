# GithubSearch

To start your Phoenix server:

* With docker:
  * Run `docker-compose up --build`
  * You'll need to re-run this command after changing dependencies


* Locally:
  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `npm install` inside the `assets` directory
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

The project was deployed to https://ateliware-github-search.herokuapp.com/

## PS
The GitHub API is not filtering by language, so I filtered on application.
