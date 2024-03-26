const router = require('express').Router();
const  competitionsController = require('./../../controllers/competitions.controller');

router.get('/', competitionsController.getAllCompetitions);
router.get('/:id', competitionsController.getCompetitionById);

module.exports = router;