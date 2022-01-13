
#!/bin/bash
# docker entrypoint script.

# wait until Postgres is ready
while ! pg_isready -q -h db -p 5432 -U postgres -h $db_host
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

bin="/app/bin/ateliware"
# run migrations
eval "$bin eval \"Ateliware.Release.migrate\""
# start the elixir application
exec "$bin" "start"
