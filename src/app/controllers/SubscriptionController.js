import { Op } from 'sequelize';
import Subscribers from '../models/Subscribers';

import Meetup from '../models/Meetup';
import User from '../models/User';

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
}

export default new SubscriptionController();
