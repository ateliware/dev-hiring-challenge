import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json({ limit: '5mb', extended: true }));
    this.server.use(
      bodyParser.urlencoded({ limit: '5mb', extended: true }),
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
