#!/bin/bash

shopt -s expand_aliases

docker-compose build

mkdir src

# creates the mix command alias to run it inside the container
alias mix="docker-compose run --rm phoenix mix"

mix phx.new . --app gh_top_repos && \
sudo sed -i 's/hostname: "localhost"/hostname: "db"/' src/config/dev.exs

cd src
mix ecto.create
mix ecto.migrate

cd ..

sudo chown -R $(id -u):$(id -g) src/

