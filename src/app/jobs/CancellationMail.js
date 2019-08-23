import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;
    // console.log('a fila executou com sucesso :D');
    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `Uma nova inscrição foi feita no ${meetup.title}`,
      // text: `Um novo usuário se inscreveu para o Meetup`,
      template: 'subscribe',
      context: {
        owner: meetup.user.name,
        meetup: meetup.title,
        user: user.name,
        date: format(
          parseISO(meetup.date_hour),
          "dd 'de' MMMM 'de' Y', para iniciar às' H'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}
export default new CancellationMail();
