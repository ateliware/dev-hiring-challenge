const express = require('express');

const LanguageController = require('./controllers/LanguageController');

const routes = express.Router();

routes.get('/api', (request, response) => {
  response.json({ info: `An API that returns Github's main repositories, sorted by language` })
})

routes.get('/api/:language', LanguageController.getLanguage);

module.exports = routes;