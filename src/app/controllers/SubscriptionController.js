import { Op } from 'sequelize';
import { isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Subscribers from '../models/Subscribers';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscribers.findAll({
      where: { user_id: req.userId },
      // attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          // onde
          where: {
            // campo date_houw
            date_hour: {
              // ja passou da data atual
              [Op.gt]: new Date(),
            },
          },
          attributes: ['title', 'description', 'location', 'date_hour'],
          order: [['date_hour', 'DESC']],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },

        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId, {
      attributes: ['name'],
    });
    // return res.json(user);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

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

    // Enviamos um email
    await Queue.add(CancellationMail.key, {
      meetup,
      user,
    });
    //
    return res.json(subscription);
  }

  async delete(req, res) {
    const cancelmeetup = await Subscribers.findOne({
      where: {
        id: req.params.meetupId,
        user_id: req.userId,
      },
    });

    if (isBefore(cancelmeetup.date_hour, new Date())) {
      return res
        .status(400)
        .json({ error: 'Não é possivel cancelar meetups que já passaram.' });
    }
    await cancelmeetup.destroy();
    return res.json();
  }
}

export default new SubscriptionController();
