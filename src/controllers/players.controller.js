const { Player } = require('../database/models/index');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllPlayers = async (req, res) => {
    const players = await Player.findAll();
    res.json({status: 'ok', players});
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