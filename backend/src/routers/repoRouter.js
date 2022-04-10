const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController')


router.get('/', repoController.getTodos)

router.get('/:id', repoController.getRepoPorId)

router.post('/', repoController.inserirRepo)

router.delete('/:id', repoController.deleteRepo)


module.exports = router