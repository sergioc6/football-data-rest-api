const { Competition } = require('./../database/models/index');
const competitionsService = require('./../services/competitions.service');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllCompetitions = async (req, res) => {
    const competitions = await Competition.findAll();
    res.json({status: 'ok', competitions});
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getCompetitionById = async (req, res) => {
    const { id } = req.params;
    let competition = await Competition.findByPk(id);
    if(!competition) {
        const competitionResult = await competitionsService.getCompetitionByCode(id);
        competition = await Competition.create({
            id: competitionResult.id,
            name: competitionResult.name,
            code: competitionResult.code,
            areaName: competitionResult.area.name
        });
    }

    res.json({status: 'ok', competition});
}

module.exports = {
    getAllCompetitions,
    getCompetitionById
}