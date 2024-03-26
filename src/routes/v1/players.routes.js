const router = require('express').Router();
const  playersController = require('./../../controllers/players.controller');

router.get('/', playersController.getAllPlayers);
router.get('/:id', playersController.getPlayerById);

module.exports = router;