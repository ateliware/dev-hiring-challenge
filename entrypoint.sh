#!/bin/bash
# Note: !/bin/sh must be at the top of the line,

# Alpine doesn't have bash so we need to use shell.
# Docker entrypoint script.
# Don't forget to give this file execution rights via `chmod +x entrypoint.sh`
# which I've added to the Dockerfile but you could do this manually instead.
# Wait until Postgres is ready before running the next step.

# while ! pg_isready -q -h $DB_HOST -p $DB_PORT -U $DB_USERNAME
# do
#   echo "$(date) - waiting for database to start."
#   sleep 2
# done

# If the database exists, migrate. Otherwise setup (create and migrate)
# echo "Running database migrations..."
# bundle exec rails db:migrate 2>/dev/null || bundle exec rails db:create db:migrate
# echo "Finished running database migrations."

# Remove a potentially pre-existing server.pid for Rails.
echo "Deleting server.pid file..."

set -e

# Remove a potentially pre-existing server.pid for Rails.
if [ -f /tmp/pids/server.pid ]; then
  rm /tmp/pids/server.pid
fi

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"