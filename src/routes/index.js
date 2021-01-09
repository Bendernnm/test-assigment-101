const express = require('express');

const { logger } = require('../utils');

const recordsRouter = require('./records');

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ message: 'API v1' }));

router.get('/view', (req, res) => res.status(200).render('index', { hash: '38dd34c842c' }));

router.use('/records', recordsRouter);

router.use((req, res) => res.status(404).render('not-found'));

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const msg = err.message || err.msg || 'Something went wrong';

  logger.error(err);

  res.status(code).json({ code, msg });
});

module.exports = router;
