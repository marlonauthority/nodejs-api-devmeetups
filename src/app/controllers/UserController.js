import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  // -> Criacao de Usuario
  async store(req, res) {
    //
    // -> Validacao
    //
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    // -> Verifica se no corpo da requisicao batem com as validacoes do yup
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro nas validacões.' });
    }
    //
    // -> Se passou pelas validacoes...
    //
    // -> Verificar se Existe o Email no DB
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // -> Caso exista o email, entra no if
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }
    //
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
    //
    // -> Validacao
    //
    // no caso do password, caso o user passe o oldpassword o campo password é obrigatorio
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // -> Verifica se no corpo da requisicao batem com as validacoes do yup
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro nas validacões.' });
    }
    //
    // -> Se passou pelas validacoes...
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
