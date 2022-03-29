const express = require("express");
const route = require("./routes/repositoryRoutes.js");
const morgan = require("morgan");
const { sequelize } = require("./models/index.js");
const Repository = require("./models/repository");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(route);

app.listen(process.env.NODE_DOCKER_PORT || 8080, async () => {
  console.log(`Server running on port ${process.env.NODE_DOCKER_PORT}`);
  await sequelize.sync({ force: true });
  console.log("Database synchronized");
});
