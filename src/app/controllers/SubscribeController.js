import { isBefore } from 'date-fns';
import Subscribers from '../models/Subscribers';
import Meetup from '../models/Meetup';

class SubscribeController {
  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);
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
    // return res.json(isSubscribed);
    // return res.json(meetupId);
    const subscription = await Subscribers.create({
      meetup_id: req.params.meetupId,
      user_id: req.userId,
    });
    return res.json(subscription);
  }
}

export default new SubscribeController();
