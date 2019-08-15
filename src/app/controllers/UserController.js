import User from '../models/User';

class UserController {
  async store(req, res) {
    // -> Verificar se Existe o Email no DB
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // -> Caso exista o email, entra no if
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }
    // Se passou..
    // -> Cria um User e apenas os dados repassados pelo body
    const { id, name, email } = await User.create(req.body);
    // -> Retorna os dados repassados em forma de json
    return res.json({
      id,
      name,
      email,
    });
  }

  // -> Metodo Atualizar
  async update(req, res) {
    // -> Pagamos os campos do body
    const { email, oldPassword } = req.body;
    //
    // -> Buscamos o User usando o primary key
    const user = await User.findByPk(req.userId);
    //
    // -> Caso houver um email e for diferente
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      // -> Caso exista o email, entra no if
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }
    //
    // -> Caso foi informado o campo oldpassword, cairá aqui...
    // -> Caso a senha Antiga "old" bater com a atual
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senhas não coincidem' });
    }
    //
    // Se passou pelas verificacoes anteriores, atualize o User
    const { id, name } = await user.update(req.body);
    //
    // -> Retorna os dados repassados
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
