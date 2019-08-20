import Subscribers from '../models/Subscribers';
import Meetup from '../models/Meetup';

class SubscribeController {
  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);
    // return res.json(meetup);
    // -> se nao for um prestador
    if (meetup.user_id === req.userId) {
      return res.status(401).json({
        erro:
          'Só é possível se inscrever em Meetups ao qual você não seja o dono.',
      });
    }
    // return res.json(meetupId);
    const subscription = await Subscribers.create({
      meetup_id: req.params.meetupId,
      user_id: req.userId,
    });
    return res.json(subscription);
  }
}

export default new SubscribeController();
