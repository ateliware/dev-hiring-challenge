const express = require('express');

const githubAPIController = require('./controllers/githubAPIController');

const routes = express.Router();

routes.get('/search', githubAPIController.search);

module.exports = routes;