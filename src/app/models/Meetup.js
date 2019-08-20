import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        // -> Os campos abaixo representao quais receberao dados ou alteracoes
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date_hour: Sequelize.STRING,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
  }
}
export default Meetup;
