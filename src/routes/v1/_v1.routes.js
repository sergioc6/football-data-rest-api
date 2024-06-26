const express = require("express");
const router = express.Router();
const playersRoutes = require('./players.routes');
const coachesRoutes = require('./coaches.routes');
const teamsRoutes = require('./teams.routes');
const competitionsRoutes = require('./competitions.routes');

router.use('/v1/competitions', competitionsRoutes);
router.use('/v1/teams', teamsRoutes);
router.use('/v1/players', playersRoutes);
router.use('/v1/coaches', coachesRoutes);

module.exports = router;