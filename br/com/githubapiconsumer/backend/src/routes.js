const express = require('express');

const githubAPIController = require('./controllers/githubAPIController');
const repositoryController = require('./controllers/repositoryController');
const userController = require('./controllers/userController');

const routes = express.Router();

routes.get('/search/:page', githubAPIController.search);
routes.get('/repository/:id', repositoryController.get);
routes.get('/user/:id', userController.get);

module.exports = routes;