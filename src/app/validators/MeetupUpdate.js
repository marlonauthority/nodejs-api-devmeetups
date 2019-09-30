import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    // -> Validacao
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date_hour: Yup.date(),
      location: Yup.string(),
      banner_id: Yup.number(),
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Erro nas validacões.', messages: err.inner });
  }
};
