const express = require('express');
const router = express.Router();
const controller = require('../controllers/RepoController');

router.route('/repos').get(controller.getAll);
router.route('/repos').post(controller.insert);
router.route('/repos').delete(controller.deleteAll);

module.exports = router;