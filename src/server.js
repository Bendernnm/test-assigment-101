const http = require('http');

const App = require('./app');

const { logger } = require('./utils');

const config = require('./config');

module.exports = () => new Promise((resolve, reject) => {
  const app = App();
  const httpServer = http.createServer(app);

  httpServer.on('error', reject);
  httpServer.on('listening', () => {
    logger.info(`http://${config.HOST}:${config.PORT}/`);
    resolve();
  });

  httpServer.listen(config.PORT, config.HOST);
});
