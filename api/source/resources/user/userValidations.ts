import Joi from 'joi';

const register = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthdate: Joi.date().less('now').required(),
  isSubscribed: Joi.boolean().required()
});

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const availability = Joi.object({
  selector: Joi.string().required(),
  value: Joi.string().required()
});

const edit = Joi.object({
  oldPassword: Joi.string(),
  password: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  birthdate: Joi.date().less('now'),
  isSubscribed: Joi.boolean()
});

const remove = Joi.object({
  password: Joi.string().required()
});

export default { register, login, availability, edit, remove };
