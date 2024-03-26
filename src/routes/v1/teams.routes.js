const router = require('express').Router();
const  teamsController = require('./../../controllers/teams.controller');

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeamById);

module.exports = router;