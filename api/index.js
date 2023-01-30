const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const axios = require('axios').default;
const cors = require('cors');

const app = express();

const PORT = 9000;

axios.defaults.baseURL = 'https://api.github.com';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/search', (req, res) => {
    const query = querystring.stringify(req.query);
    if (!req.query.q) {
        res.status(400).json({});
        return;
    }
    axios.get('search/repositories?' + query)
        .then((response) => {
            let { data } = response;
            let result = data.items.map(repo => {
                return {
                    id: repo.id,
                    full_name: repo.full_name,
                    description: repo.description,
                    url: repo.html_url,
                    license: repo.license,
                    homepage: repo.homepage,
                    stars: repo.stargazers_count
                }
            });
            res.json(result);
        })
        .catch(error => console.log(error));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))