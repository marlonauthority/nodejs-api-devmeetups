import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscribe from '../app/models/Subscribe';
import databaseConfig from '../config/database';

// Vetor de models que sera repassada no metodo init mais abaixo
const models = [User, File, Meetup, Subscribe];

class Database {
  // -> Método que inicia automaticamente,
  //   as funcoes repassadas para ele serao automaticamente executadas
  constructor() {
    this.init();
  }

  init() {
    // -> Inicia uma conexao com o DB
    this.connection = new Sequelize(databaseConfig);
    // -> faz um mapeamento de todos os models
    // -> dentro de cada model é chamado a funcao init e repassado a conexao do DB
    models
      .map(model => model.init(this.connection))
      // um segundo map criado para associar model de user com files, porem so é executado no model que existir a funcao "associate"
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
