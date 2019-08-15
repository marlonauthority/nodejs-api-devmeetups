import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    // -> Recebemos email e senha do body
    const { email, password } = req.body;
    // -> Procuramos pelo usuario no DB
    const user = await User.findOne({ where: { email } });
    // -> Caso não exista o user
    if (!user) {
      return res.status(401).json({ erro: 'Usuário inexistente.' });
    }
    // -> Verificamos a senha a funcao checkPassword esta criada no Model.
    // Se caso a senha não corresponde
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    // -> Se tudo deu certo ate aqui, pegamos os dados e repassamos para json..
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // -> Repassamos mais um parâmetro que fará a assinatura do token
      // -> Dentro de sign passaremos como primeiro parametro o payload, que são as informacoes criptografadas
      // neste caso o id, e como segundo parametro a chave para criptografar
      // o terceiro parmetro é a validade
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
