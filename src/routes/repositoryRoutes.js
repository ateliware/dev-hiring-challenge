const { Router } = require("express");
const repositoryController = require("../controller/repositoryController.js")

const route = Router();

route.get("/most-starred/:language", repositoryController.getMostStarredRepository);

module.exports = route;


