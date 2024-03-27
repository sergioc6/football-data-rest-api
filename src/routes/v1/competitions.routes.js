const router = require('express').Router();
const  competitionsController = require('./../../controllers/competitions.controller');

router.post('/:id', competitionsController.importCompetition);
router.get('/', competitionsController.getAllCompetitions);
router.get('/:id', competitionsController.getCompetitionById);
router.get('/:id/teams', competitionsController.getTeamsByCompetition);

module.exports = router;