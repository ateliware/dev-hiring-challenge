import express from "express";
import route from "./routes/repositoryRoutes.js"
import morgan from "morgan";
import 'dotenv/config'

const app = express();

app.use(express.json());

app.use(morgan('dev'))
app.use(route);

app.listen(
  process.env.NODE_DOCKER_PORT || 8080,
  () => console.log(`server running on port ${process.env.NODE_DOCKER_PORT}`)
);
