import "reflect-metadata";
import express from 'express';
import cors from 'cors';

import { router } from "./routes";

import './database';

const app = express();

app.use(cors());

app.use(router);

export { app };