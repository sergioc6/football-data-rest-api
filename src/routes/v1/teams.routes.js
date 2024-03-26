const router = require('express').Router();
const  teamsController = require('./../../controllers/teams.controller');

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeamById);
router.get('/:id/players', teamsController.getPlayersByTeam);
router.get('/:id/coaches', teamsController.getCoachesByTeam);

module.exports = router;