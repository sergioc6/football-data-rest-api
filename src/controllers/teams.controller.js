const { Team } = require('./../database/models/index');
const { getLimitAndOffset } = require('./../utils/pagination.util');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllTeams = async (req, res) => {
    const { page = 1, pageSize = 20} = req.query;
    const { limit, offset } = getLimitAndOffset(page, pageSize);

    const { count, rows } = await Team.findAndCountAll({
        offset, limit
    });
    res.json({status: 'ok', count, teams: rows});
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