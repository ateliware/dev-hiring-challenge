const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cors = require('cors');
const axios = require('axios').default;
const db = require('./db.js');


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
    axios.get('search/repositories?per_page=10&' + query)
        .then((response) => {
            let { data } = response;
            let result = data.items.map(repo => {
                return {
                    _id: repo.id,
                    full_name: repo.full_name,
                    language: repo.language,
                    description: repo.description,
                    url: repo.html_url,
                    license: repo.license ? repo.license.name : '',
                    homepage: repo.homepage,
                    stars: repo.stargazers_count
                }
            });
            
            let values = result.map(item => {
                return [
                    item._id, 
                    item.full_name,
                    item.language,
                    "", 
                    item.url, 
                    item.license, 
                    item.homepage, 
                    item.stars
                ];
            });

            // save in the database
            const sql = "INSERT INTO repositories (_id, full_name, language, description, license, url, homepage, stars) VALUES ?";
            db().query(sql, [values], function (err, result) {
                if (err) throw err;
            });

            res.json(result);
        })
        .catch(error => console.log(error));
});


app.get('/list', (req, res) => {
    db().query(
        'SELECT _id, language, full_name, language, description, url, license, homepage FROM repositories', 
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.get('/download', (req, res) => {
    db().query(
        'SELECT _id, full_name, description, url, license, homepage FROM repositories', 
        function (error, result, fields) {
            if (error) throw error;
            res.status(200);
            res.header("Content-Disposition", "attachment;filename=repositories.json");
            res.send(result);
        }
    );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))