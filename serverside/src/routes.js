
const express = require("express");
const routes = express.Router();

const GithubRepositoryController = require("./app/controllers/GithubRepositoryController");

routes.get("/github-repository", GithubRepositoryController.index);
routes.post("/github-repository", GithubRepositoryController.store);

module.exports = routes;