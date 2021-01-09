require('./src/config');

const startServer = require('./src/server');
const mongodbClient = require('./src/db');

process.on('unhandledRejection', (reason) => {
  console.error(reason.message || 'unhandled rejection', reason);

  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error(err.message, err);

  process.exit(1);
});

(async () => {
  try {
    await Promise.all([mongodbClient].map(service => service.bootstrap()));

    await startServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
