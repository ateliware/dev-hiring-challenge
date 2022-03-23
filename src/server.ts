import express from "express";
import route from "./routes/routes";

require("dotenv/config");

const app = express();

app.use(express.json());

app.use(route);

app.listen(process.env.PORT, () => "server running on port 3000");
