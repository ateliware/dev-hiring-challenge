const { Router } = require("express");
const repositoryController = require("../controller/repository.controller.js")

const route = Router();

route.get("/most-starred/:language", repositoryController.getMostStarredRepository);

module.exports = route;


