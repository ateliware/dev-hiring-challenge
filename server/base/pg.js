const Pool = require('pg').Pool;

const poolConfig = {
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'admin',
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || 'postgres',
};

if (process.env.NODE_ENV === 'production') {
    poolConfig.connectionString = process.env.DATABASE_URL;
    poolConfig.ssl = { rejectUnauthorized: false }
}

const pgClient = new Pool(poolConfig);

try {
    pgClient.query(
        `CREATE TABLE IF NOT EXISTS public.repos
        (
            r_id integer NOT NULL,
            r_name text NOT NULL,
            r_language text NOT NULL,
            r_description text NOT NULL,
            r_owner_login text NOT NULL,
            r_owner_avatar_url text NOT NULL,
            r_created_at date NOT NULL,
            r_updated_at date NOT NULL,
            r_stargazers_count integer NOT NULL,
            r_watchers_count integer NOT NULL,
            r_size integer NOT NULL,
            r_forks_count integer NOT NULL,
            r_open_issues_count integer NOT NULL,
            r_html_url text NOT NULL,
            PRIMARY KEY (r_id)
        )`
    );
} catch (err) {
    console.log(err.message);
}

module.exports = pgClient;