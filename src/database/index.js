import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import databaseConfig from '../config/database';

// Vetor de models que sera repassada no metodo init mais abaixo
const models = [User, File];

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
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
