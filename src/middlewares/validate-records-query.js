const Joi = require('joi');

const validationSchema = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  minCount: Joi.number(),
  maxCount: Joi.number(),
});

module.exports = (req) => {

};
