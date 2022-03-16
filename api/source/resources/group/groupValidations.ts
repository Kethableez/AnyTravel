import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  cover: Joi.string().required()
});

const edit = Joi.object({
  name: Joi.string(),
  cover: Joi.string()
});

const memberEmail = Joi.object({
  memberEmail: Joi.string().required()
});

const memberId = Joi.object({
  memberId: Joi.string().required()
});

const invitationCode = Joi.object({
  invitationCode: Joi.string().required()
});

export default { create, edit, memberEmail, invitationCode, memberId };
