import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import routes from './routes';
// -> para ouvir o erros alem do sentry precisamos ouvir os erros que vem dos controllers que usam async
// por padrao o express nao ouve.. dai usaremos a extensao abaixo
import 'express-async-errors';
//
// -> Chama um loader de models
import './database';

class App {
  constructor() {
    this.server = express();

    // instancia o sentry para vizualizacao de erros
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // -> antes de todas as chamadas de rotas chamamos o funcao do sentry
    this.server.use(Sentry.Handlers.requestHandler());
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
    // para finalizar o sentry colocamos a function por volta das rotas a serem ouvidas
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
