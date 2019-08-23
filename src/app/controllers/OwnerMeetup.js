import Meetup from '../models/Meetup';
import File from '../models/File';

class OwnerMeetup {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: [['date_hour', 'DESC']],
      attributes: ['id', 'title', 'description', 'location', 'date_hour'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(meetups);
  }
}

export default new OwnerMeetup();
