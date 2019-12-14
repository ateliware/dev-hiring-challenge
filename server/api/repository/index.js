'use strict';

const express = require('express');
const controller = require('./controller');;
const router = express.Router();

router.post('/', controller.saveOrUpdate);
router.get('/', controller.getAll);

module.exports = router;
