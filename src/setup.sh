#!/bin/bash

MIX_ENV=$ENV mix deps.get

cd assets && npm install && node node_modules/webpack/bin/webpack.js --mode development
cd ..

MIX_ENV=$ENV mix compile

MIX_ENV=$ENV mix ecto.create
MIX_ENV=$ENV mix ecto.migrate

npm run deploy --prefix ./assets
mix phx.digest

PORT=$PORT MIX_ENV=$ENV mix phx.server
