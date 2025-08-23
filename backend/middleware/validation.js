const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details[0].message
      });
    }
    next();
  };
};

const schemas = {
  register: Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    parentEmail: Joi.string().email().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    displayName: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().optional(),
    parentEmail: Joi.string().email().optional()
  }),

  gameScore: Joi.object({
    contentId: Joi.string().required(),
    score: Joi.number().min(0).required(),
    maxScore: Joi.number().min(0).required(),
    timeSpent: Joi.number().min(0).required()
  })
};

module.exports = { validateRequest, schemas };
