const { Player } = require('../database/models/index');
const { getLimitAndOffset } = require('./../utils/pagination.util');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllPlayers = async (req, res) => {
    const { page = 1, pageSize = 20} = req.query;
    const { limit, offset } = getLimitAndOffset(page, pageSize);

    const { count, rows } = await Player.findAndCountAll({
        offset, limit
    });
    res.json({status: 'ok', count, players: rows });
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getPlayerById = async (req, res) => {
    const { id } = req.params;
    let player = await Player.findByPk(id);
    if (!player) {
        res.status(404).json({status: 'error', message: 'Player not found'});
        return;
    }
    res.json({status: 'ok', player});
}

module.exports = {
    getAllPlayers,
    getPlayerById
}