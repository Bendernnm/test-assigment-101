const express = require('express');

const { records } = require('../../controllers');

const router = express.Router();

router.get('/', records.get);

module.exports = router;
