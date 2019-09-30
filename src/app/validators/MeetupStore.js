import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    // -> Validacao
    //
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date_hour: Yup.date().required(),
      location: Yup.string().required(),
      banner_id: Yup.number().required(),
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Erro nas validacões.', messages: err.inner });
  }
};
