import Subscribers from '../models/Subscribers';
import Meetup from '../models/Meetup';

class SubscribeController {
  async store(req, res) {
    const { meetupId } = req.params;
    // return res.json(meetupId);
    const subscription = await Subscribers.create({
      meetup_id: meetupId,
      user_id: req.userId,
    });
    return res.json(subscription);
  }
}

export default new SubscribeController();
