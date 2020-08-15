const routes = require('express').Router()
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require("cors");
const {
    Php,
    Javascript,
    Swift,
    Ruby,
    Python
} = require('./app/models');

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// cors filters
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname, 'src')));

app.get('/repo', (req, res) => {

    Php.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 3
    }).then(function (rowPhps) {
        Javascript.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 3
        }).then(function (rowJavascripts) {
            Ruby.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 3

            }).then(function (rowRubies) {
                Swift.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    limit: 3

                }).then(function (rowSwifts) {
                    Python.findAll({
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        limit: 3
                    }).then(function (rowPythons) {
                        res.status(200).send({ 
                            rowJavascripts,
                            rowPhps,
                            rowPythons,
                            rowRubies,
                            rowSwifts
                        })
                    })
                })
            })
        })
    })
})


app.get('/github-api', (req, res) => {

    const langs = ['php', 'javascript', 'ruby', 'swift', 'python'];
    var n=0;

    var options = {
        headers: {
            'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var classe;
            var info = JSON.parse(body);
            for (i = 0; i < 3; i++) {
                var url = info.items[i].html_url;
                var name = info.items[i].name;
                var star = info.items[i].stargazers_count;
                var own = info.items[i].owner.login;
                var lg = info.items[i].language;

                switch (lg) {
                    case 'Swift':
                        classe = Swift;
                        break;
                    case 'JavaScript':
                        classe = Javascript;
                        break;
                    case 'Ruby':
                        classe = Ruby;
                        break;
                    case 'PHP':
                        classe = Php;
                        break;
                    case 'Python':
                        classe = Python;
                        break;
                    default:
                        console.log("Different language");
                }

                try {
                    classe.create({
                        url: url,
                        stars: star,
                        owner: own,
                        repo: name
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            n++;
        }
    }

    request(`https://api.github.com/search/repositories?q=language:${langs[0]}&sort=stars&order=desc?page=1&per_page=3`, options, callback);
    request(`https://api.github.com/search/repositories?q=language:${langs[1]}&sort=stars&order=desc?page=1&per_page=3`, options, callback);
    request(`https://api.github.com/search/repositories?q=language:${langs[2]}&sort=stars&order=desc?page=1&per_page=3`, options, callback);
    request(`https://api.github.com/search/repositories?q=language:${langs[3]}&sort=stars&order=desc?page=1&per_page=3`, options, callback);
    request(`https://api.github.com/search/repositories?q=language:${langs[4]}&sort=stars&order=desc?page=1&per_page=3`, options, callback);
})

module.exports = routes;