import express from 'express';
import path from 'path';
import routes from './routes';
// -> Chama um loader de models
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // -> Habilita o uso de JSON
    this.server.use(express.json());
    this.server.use(express.json());
    // -> Habilita o acesso aos Files da pasta tmp
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
