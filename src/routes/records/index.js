const express = require('express');

const { records } = require('../../controllers');
const { validateRecordsQuery } = require('../../middlewares');

const router = express.Router();

router.post('/', validateRecordsQuery, records.get);

module.exports = router;
