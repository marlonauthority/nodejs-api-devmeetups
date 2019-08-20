import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    //
    // -> Validacao
    //
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date_hour: Yup.date().required(),
      location: Yup.string().required(),
      banner_id: Yup.number().required(),
    });
    // -> Verifica se no corpo da requisicao batem com as validacoes do yup
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro nas validacões.' });
    }
    // Pega os dados do corpo da requicicao
    const { title, description, location, date_hour, banner_id } = req.body;

    // Criar
    const meetup = await Meetup.create({
      title,
      description,
      location,
      date_hour,
      banner_id,
      user_id: req.userId,
    });
    return res.json(meetup);
  }
}

export default new MeetupController();
