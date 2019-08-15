import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // -> Os campos abaixo representao quais receberao dados ou alteracoes
        // -> O Campo password é virtual e nao esta presente no model de User
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // -> Metodo antes de salvar
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // -> Caso existir um password user o bcript vai usar essa string e fazer um hash de senha
        // -> O Nº 8 é a sua força
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
}
export default User;
