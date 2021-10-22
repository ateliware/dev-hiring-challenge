# Github Top Repos

This small toy app built with [Phoenix](https://www.phoenixframework.org/) allows you to find Github repositories according to any search term, for the following languages:

- Elixir
- Clojure
- Python
- Ruby
- Haskell

## Dev setup

To run it, you'll need to have Docker installed with `docker-compose`. Notice that I strongly recommend you to add the group `docker` to your system's user, since I've experienced some permissions issues while running Docker with `sudo`.

Clone the application repository, and enter its directory.

Create the `db.env` file for the development database, with the following content:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

Then, to start it in development mode, issue the command:
```
$ docker-compose up phoenix db
```

If everything goes well, go to `http://localhost:4000` and you'll see the app running.

### Commands

To run commands **inside** the application container, use the `mix_cmd` utility, e.g.:
```
$ cd src
$ ./mix_cmd ecto.migrate
```

If you wish to use your own `mix` installation on the host machine, change the `src/config/dev.exs` configuration line, in the database section:
```
# from 
hostname: "db",

# to
hostname: "localhost"

```
This way you can run `mix` commands straight on your `src` folder, just don't forget to have the `db` container started.


### Tests

Similarly to `mix_cmd`, run tests with (in the `src` folder):

```
$ ./mix_test

$ ./mix_test test/path/file.exs
```


## Prod setup

The process to run it in production mode is almost the same, except you need also an `.env` file in the root directory.

Here's an example of such file:
```
SECRET_KEY_BASE=8asajhajshVXz7tEL8s9a14uPmVY8IPCksms09a9+9382838jdd
DATABASE_URL=ecto://postgres:postgres@db/gh_top_repos
PORT=7555
ENV=prod
```
Replace the data above with the values of your environment, including the `DATABASE_URL` field pointing to your production instance.

You can generate a `SECRET_KEY_BASE` using:
```
$ mix phx.gen.secret
```

Now, instead of the `phoenix` container above, replace it by the `phoenix_prod`. You can safely remove `db` from the command below if you have your own instance of Postgresql configured with `DATABASE_URL`.

```
$ docker-compose up phoenix_prod db
```




