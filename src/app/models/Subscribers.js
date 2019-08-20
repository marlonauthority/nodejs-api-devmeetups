import Sequelize, { Model } from 'sequelize';

class Subscribers extends Model {
  static init(sequelize) {
    super.init(
      {
        // -> Os campos abaixo representao quais receberao dados ou alteracoes
        // porem aqui é uma tabela pivot que somente guarda os id referentes as tabelas mae
        // meetup_id: Sequelize.INTEGER,
        // user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Relacionamentos
  // -> Cria uma function statica que recebe Models
  static associate(models) {
    // Diz que Pertence a..(BelongTo)
    // relacione com o model de meetup onde a chave seja meetup_id e cria um apelido de meetup
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id', as: 'meetup' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
export default Subscribers;
