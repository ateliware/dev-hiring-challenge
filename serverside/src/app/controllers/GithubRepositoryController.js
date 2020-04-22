const connection = require("../../database/connection");
const axios = require('axios');

module.exports = {

    async index(req, res) {
        const githubRepositories = await connection('github_repositories').select('*');
        return res.json(githubRepositories);
    },

    async store(req, res) {
        const { q } = req.body;
        if (q) {
            const response = await axios.get('https://api.github.com/search/repositories?q=' + q + '&sort=stars&order=desc');
            const { items = [] } = response.data;
            for (let i = 0; i < 5; i++) {
                if (items[i] != undefined) {
                    if (String(items[i].language).toLowerCase() == 'javascript' || String(items[i].language).toLowerCase() == 'go' || String(items[i].language).toLowerCase() == 'ruby' || String(items[i].language).toLowerCase() == 'python' || String(items[i].language).toLowerCase() == 'java') {
                        await connection('github_repositories').insert({
                            name: items[i].name,
                            language: items[i].language,
                            search: q,
                            html_url: items[i].html_url,
                            description: items[i].description || "Sem descrição"
                        });
                    }

                }
            }
            return res.status(201).send();
        }
        return res.status(400).send();
    }

}