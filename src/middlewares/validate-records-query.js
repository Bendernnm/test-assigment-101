const Joi = require('joi');

const validationSchema = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  minCount: Joi.number(),
  maxCount: Joi.number(),
});

module.exports = (req, res, next) => {
  if (!req.body) {
    return next();
  }

  const { error } = validationSchema.validate(req.body);

  if (error) {
    return res.status(422).json({
      code: 422,
      msg : JSON.stringify(error),
    });
  }

  next();
};
