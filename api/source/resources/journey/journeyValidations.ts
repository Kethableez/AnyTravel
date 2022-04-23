import Joi from 'joi';

const createProcess = Joi.object({
  journeyObject: Joi.object().required(),
  step: Joi.string().required()
});

const updateProcess = Joi.object({
  journeyObject: Joi.object().required(),
  step: Joi.string().required()
});

export default {
  createProcess,
  updateProcess
};
