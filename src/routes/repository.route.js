const { Router } = require("express");
const repositoryController = require("../controller/repository.controller.js");

const route = Router();

route.get(
  "/most-starred/:language",
  repositoryController.getMostStarredRepository
);
route.get("/", (req, res) => {
  res.send({ status: "ok" });
});

module.exports = route;
