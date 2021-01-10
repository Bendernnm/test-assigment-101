require('dotenv').config({ path: `${__dirname}/.env` });

const ENV = process.env;

const REQUIRED_FIELDS = ['PORT', 'HOST', 'MONGODB_URL', 'MONGODB_NAME'];

REQUIRED_FIELDS.forEach((field) => {
  if (!ENV.hasOwnProperty(field)) {
    throw new Error(`Missing required config value - ${field}`);
  }
});

module.exports = Object.freeze({
  PORT        : +ENV.PORT || 80,
  HOST        : ENV.HOST,
  MONGODB_URL : ENV.MONGODB_URL,
  MONGODB_NAME: ENV.MONGODB_NAME,
});
