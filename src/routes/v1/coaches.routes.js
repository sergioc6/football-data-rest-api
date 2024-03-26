const router = require('express').Router();
const coachesController = require('../../controllers/coaches.controller');

router.get('/', coachesController.getAllCoaches);
router.get('/:id', coachesController.getCoachById);

module.exports = router;