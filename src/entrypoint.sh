#! /bin/bash
function log_time() {
    date '+%Y-%m-%d %H:%M:%S'
}
echo "[$(log_time)] Script starting..."
echo "[$(log_time)] Changing to app folder..."
cd /app/src

    if [[ $MIX_ENV = "prod" ]]; then
        npm run deploy --prefix ./assets
        mix phx.digest
    else
        npm install --prefix ./assets
    fi

while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER; do
        echo "[$(log_time)] Waiting database start"
        sleep 1
    done
    
    if [[ -z $(psql -Atqc "\list $PGDATABASE") ]]; then
        echo "[$(log_time)] database $PGDATABASE doesnt exist. Creating..."
        createdb -E UTF8 $PGDATABASE -l en_US.UTF-8 -T template0
        echo "[$(log_time)] database $PGDATABASE created"
    fi
    echo "[$(log_time)] Migrating..."
    mix ecto.migrate >/dev/null 2>&1
    echo "[$(log_time)] Formating..."
    mix format
    mix format --check-formatted --dry-run



if [[ $MIX_ENV = "prod" ]]; then
    mix release.init
    rm rel/env.sh.eex
    cp templates/env.sh.eex.sample rel/env.sh.eex
    mix release --overwrite
    _build/$MIX_ENV/rel/$PROJECT/bin/$PROJECT start
else
    elixir -S mix phx.server
fi