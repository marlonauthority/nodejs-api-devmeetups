import { isBefore } from 'date-fns';
import Subscribers from '../models/Subscribers';
import Meetup from '../models/Meetup';

class SubscribeController {
  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);
    // -> Se nao encontrar 404..
    if (!meetup) {
      return res.status(404).json({ error: 'Meetup não existe.' });
    }
    // return res.json(meetup);
    // -> se nao for um owner
    if (meetup.user_id === req.userId) {
      return res.status(401).json({
        erro:
          'Só é possível se inscrever em Meetups ao qual você não seja o dono.',
      });
    }
    // -> Checagem das datas
    // const hoje = new Date();
    // const dataDB = meetup.date_hour;
    // const before = isBefore(dataDB, hoje);
    // return res.json({ hoje, dataDB, before });
    // -> Checa no banco de dados
    if (isBefore(meetup.date_hour, new Date())) {
      return res.status(400).json({ error: 'Este Meetup já passou.' });
    }
    // Checagem se ja foi inscrito
    const isSubscribed = await Subscribers.findOne({
      where: {
        meetup_id: req.params.meetupId,
        user_id: req.userId,
      },
    });
    // -> se ja estiver inscrito..
    if (isSubscribed) {
      return res
        .status(401)
        .json({ erro: 'Não é possível se inscrever mais de uma vez.' });
    }
    //
    // -> Agendamento no mesmo horario?
    const checkAvailability = await Subscribers.findOne({
      // onde o user_id seja o mesmo que faz a requisicao
      where: {
        user_id: req.userId,
      },
      // inclua o relacionamento com meetup
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          // onde a data e hora seja a mesma a qual o user esta tentando subscrever
          where: {
            date_hour: meetup.date_hour,
          },
        },
      ],
    });
    // return res.json(checkAvailability);
    // -> se ele encontrou a inscricao significa que ja se inscreveu em um meetup do mesmo horario..
    if (checkAvailability) {
      return res.status(400).json({
        error: 'Você já possuí inscrição em um Meetup do mesmo horario.',
      });
    }
    //
    // Se passou por todas validacoes..
    const subscription = await Subscribers.create({
      meetup_id: req.params.meetupId,
      user_id: req.userId,
    });
    return res.json(subscription);
  }
}

export default new SubscribeController();
