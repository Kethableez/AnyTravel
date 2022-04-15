import Joi from 'joi';

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const confirm = Joi.object({
  confirmId: Joi.string().required(),
  activationCode: Joi.string().required()
});

const resend = Joi.object({
  confirmId: Joi.string().required()
});

export default { login, confirm, resend };
