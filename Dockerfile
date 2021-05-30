FROM elixir:latest

ENV MIX_ENV=prod

RUN apt-get update && \
  apt-get install -y postgresql-client npm

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY . /app
WORKDIR /app

RUN mix local.rebar --force
RUN mix local.hex --force
RUN mix deps.get

RUN npm --prefix assets/ install

# Compile the project
RUN mix do compile

CMD ["/app/entrypoint.sh"]
