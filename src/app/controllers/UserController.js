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
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
