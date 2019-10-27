import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .strict(true)
        .required(),
      email: Yup.string()
        .strict(true)
        .email()
        .required(),
      password: Yup.string()
        .strict(true)
        .min(6)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'Validation failure' } });
  }
};
