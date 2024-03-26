const { Coach } = require('../database/models/index');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllCoaches = async (req, res) => {
    const coaches = await Coach.findAll();
    res.json({status: 'ok', coaches});
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getCoachById = async (req, res) => {
    const { id } = req.params;
    const coach = await Coach.findByPk(id);
    res.json({status: 'ok', coach});
}

module.exports = {
    getAllCoaches,
    getCoachById
}