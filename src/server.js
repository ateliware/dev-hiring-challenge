import express from "express";
import route from "./routes/repositoryRoutes.js"
import morgan from "morgan";
import db from "./models/index.js";
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(route);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)).catch((er) => console.log(er));

app.listen(
  process.env.NODE_DOCKER_PORT || 8080,
  () => console.log(`server running on port ${process.env.NODE_DOCKER_PORT}`)
);
