const competitionsService = require('./../services/competitions.service');

/**
 * @param {*} req 
 * @param {*} res 
 */
const getAllCompetitions = (req, res) => {

    res.json({message: 'test'});
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getCompetitionById = async (req, res) => {
    const { id } = req.params;
    const competition = await competitionsService.getCompetitionByCode(id);

    res.json({competition});
}

module.exports = {
    getAllCompetitions,
    getCompetitionById
}