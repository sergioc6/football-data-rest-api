const { Team } = require('./../database/models/index');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllTeams = async (req, res) => {
    const { page, pageSize } = req.query;
    const teams = await Team.findAll();

    res.json({ status: 'ok', teams });
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getTeamById = async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByPk(id);
    if (!team) {
        res.status(404).json({ status: 'error', message: 'Team not found'});
        return;
    }

    res.json({ status: 'ok', team });
}

const getPlayersByTeam = async (req, res) => {
    const { id } = req.params;
    let team = await Team.findByPk(id);
    if(!team) {
        res.status(404).json({status: 'error', message: 'Team not found'});
        return;
    }
    const players =  await team.getPlayers();

    res.json({ status: 'ok', players });
}

const getCoachesByTeam = async (req, res) => {
    const { id } = req.params;
    let team = await Team.findByPk(id);
    if(!team) {
        res.status(404).json({status: 'error', message: 'Team not found'});
        return;
    }
    const coaches =  await team.getCoaches();

    res.json({ status: 'ok', coaches });
}

module.exports = {
    getAllTeams,
    getTeamById,
    getPlayersByTeam,
    getCoachesByTeam
}