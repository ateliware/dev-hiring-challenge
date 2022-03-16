const express = require('express');
const router = express.Router();

const repoRoute = require("./RepoRoute");
router.use("/api", repoRoute);

module.exports = router;
