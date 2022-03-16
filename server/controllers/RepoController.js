const pgClient = require('../base/pg');

module.exports = {
    getAll: async (req, res) => {
        try {
            const allRepos = await pgClient.query('SELECT * FROM repos');
            res.json(allRepos.rows);
        } catch (err) {
            console.error(err.message);
        }
    },

    insert: async (req, res) => {
        try {
            await pgClient.query(
                'INSERT INTO repos (r_id, r_name, r_language, r_description, r_owner_login, r_owner_avatar_url, r_created_at, r_updated_at, r_stargazers_count, r_watchers_count, r_size, r_forks_count, r_open_issues_count, r_html_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
                [req.body.id, req.body.name, req.body.language, req.body.description, req.body.owner.login, req.body.owner.avatar_url, req.body.created_at, req.body.updated_at, req.body.stargazers_count, req.body.watchers_count, req.body.size, req.body.forks_count, req.body.open_issues_count, req.body.html_url]
            );
            res.json('A repository has been inserted!');
        } catch (err) {
            console.log(err.message);
        }
    },

    deleteAll: async (req, res) => {
        try {
            await pgClient.query('DELETE FROM repos');
            res.json('All repositories have been deleted!');
        } catch (err) {
            console.log(err.message);
        }
    },
};