const express = require("express");
const router = express.Router();
const playersRoutes = require('./players.routes')
const teamsRoutes = require('./teams.routes')
const competitionsRoutes = require('./competitions.routes')

router.use('/v1/competitions', competitionsRoutes);
//router.use('/v1/players', playersRoutes);
//router.use('/v1/teams', teamsRoutes);

module.exports = router;