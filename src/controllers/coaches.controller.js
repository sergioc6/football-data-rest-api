const { Coach } = require('../database/models/index');
const { getLimitAndOffset } = require('./../utils/pagination.util');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllCoaches = async (req, res) => {
    const { page = 1, pageSize = 20} = req.query;
    const { limit, offset } = getLimitAndOffset(page, pageSize);

    const { count, rows } = await Coach.findAndCountAll({
        offset, limit
    });
    res.json({status: 'ok', count, coaches: rows});
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