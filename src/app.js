const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const lodashTemplates = require('lodash-express');

const routes = require('./routes');

module.exports = () => {
  const app = express();

  lodashTemplates(app, 'html');

  app.enable('trust proxy');
  app.disable('x-powered-by');

  app.set('view engine', 'html');
  app.set('views', `${__dirname}/views`);

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json({ limit: '500kb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(logger('dev'));

  app.use(routes);

  return app;
};
