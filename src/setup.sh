#!/bin/bash

MIX_ENV=$ENV mix deps.get
MIX_ENV=$ENV mix compile

MIX_ENV=$ENV mix ecto.create
MIX_ENV=$ENV mix ecto.migrate

PORT=$PORT MIX_ENV=$ENV mix phx.server
