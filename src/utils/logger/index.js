const winston = require('winston');

const config = require('../../config');

const { format, transports, createLogger } = winston;

const defaultLevel = config.LOGGER_LEVEL || 'info';

module.exports = createLogger({
  level     : defaultLevel,
  transports: [new transports.Console()],
  format    : format.combine(format.timestamp(), format.json()),
});
