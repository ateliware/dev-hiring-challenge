// Express setup
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Postgres setup
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

// Express routes
// Create
app.post('/repos', async (req, res) => {
    try {
        await pgClient.query(
            'INSERT INTO repos (r_id, r_name, r_language, r_description, r_owner_login, r_owner_avatar_url, r_created_at, r_updated_at, r_stargazers_count, r_watchers_count, r_size, r_forks_count, r_open_issues_count, r_html_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
            [req.body.id, req.body.name, req.body.language, req.body.description, req.body.owner.login, req.body.owner.avatar_url, req.body.created_at, req.body.updated_at, req.body.stargazers_count, req.body.watchers_count, req.body.size, req.body.forks_count, req.body.open_issues_count, req.body.html_url]
        );
        res.json('A repository has been inserted!');
    } catch (err) {
        console.log(err.message);
    }
});

// Get all
app.get('/repos', async (req, res) => {
    try {
        const allRepos = await pgClient.query('SELECT * FROM repos');
        res.json(allRepos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete all
app.delete('/repos', async (req, res) => {
    try {
        await pgClient.query('DELETE FROM repos');
        res.json('All repositories have been deleted!');
    } catch (err) {
        console.log(err.message);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});