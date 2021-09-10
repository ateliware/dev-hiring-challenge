# Github Top Repos

This small toy app allows you to find Github repositories according to any search term, for the following languages:

- Elixir
- Clojure
- Python
- Ruby
- Haskell

## Dev setup

To run it, you'll need to have Docker installed with `docker-compose`. Notice that I strongly recommend you to add the group `docker` to your system's user, since I've experienced some permissions issues while running Docker with `sudo`.

Just clone the application repository, and enter its directory.

Then, to start it in development mode, issue the command:
```
$ PG_USER=postgres PG_PASS=postgres docker-compose up phoenix db
```

If everything goes well, go to `http://localhost:4000` and you'll see the app running.


## Prod setup

The process to run it in production mode is almost the same, except you need also an `.env` file in the root directory.

Here's an example of such file:
```
SECRET_KEY_BASE=O/JLVXz7tEL14uPmVY8IPCksms09a9+9382djndf
DATABASE_URL=ecto://postgres:postgres@db/gh_top_repos
PORT=7555
ENV=prod

```
Replace the data above with the values of your environment.


