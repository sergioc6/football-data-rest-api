const { Competition, Team, Player, Coach } = require('./../database/models/index');
const competitionsService = require('./../services/competitions.service');
const { getLimitAndOffset } = require('./../utils/pagination.util');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const importCompetition = async (req, res) => {
    const { id } = req.params;
    try {
        const competitionResult = await competitionsService.getCompetitionByCode(id);

        const [ competition, isCreated ] = await Competition.findOrCreate(
            {
                where: {
                    id
                },
                defaults: {
                    id: competitionResult.id,
                    name: competitionResult.name,
                    code: competitionResult.code,
                    areaName: competitionResult.area.name
                }
            });

        const { teams } = await competitionsService.getTeamsForCompetition(id);

        for (const teamResult of teams) {
            await Team.findOrCreate({
                where: { id: teamResult.id },
                defaults: {
                    id: teamResult.id,
                    name: teamResult.name,
                    shortName: teamResult.shortName,
                    tla: teamResult.tla,
                    areaName: teamResult.area.name,
                    address: teamResult.address
                }
            });

            await competition.addTeam(teamResult.id);

            const { coach, squad } = teamResult;
            if (coach) {
                await Coach.findOrCreate({
                    where: { id: coach.id },
                    defaults: {
                        id: coach.id,
                        name: `${coach.firstName} ${coach.lastName}`,
                        dateOfBirth: coach.dateOfBirth,
                        nationality: coach.nationality,
                        teamId: teamResult.id
                    }
                }
                );
            }

            for (const player of squad) {
                await Player.findOrCreate({
                    where: { id: player.id },
                    defaults: {
                        id: player.id,
                        name: player.name,
                        position: player.position,
                        dateOfBirth: player.dateOfBirth,
                        nationality: player.nationality,
                        teamId: teamResult.id
                    }
                });
            }
        }

        res.json({ status: 'ok', message: 'Competition imported successfully', competition });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'error', message: 'Competition not found in External API.' })
        return;
    }
};

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllCompetitions = async (req, res) => {
    const { page = 1, pageSize = 20} = req.query;
    const { limit, offset } = getLimitAndOffset(page, pageSize);

    const { count, rows } = await Competition.findAndCountAll({
        offset, limit
    });
    res.json({status: 'ok', count, competitions: rows});
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getCompetitionById = async (req, res) => {
    const { id } = req.params;
    let competition = await Competition.findByPk(id);
    if (!competition) {
        res.status(404).json({ status: 'error', message: 'Competition not found' });
        return;
    }

    res.json({ status: 'ok', competition });
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getTeamsByCompetition = async (req, res) => {
    const { id } = req.params;
    const competition = await Competition.findByPk(id);
    if (!competition) {
        res.status(404).json({ status: 'error', message: 'Competition not found' });
        return;
    }
    const teams = await competition.getTeams();
    res.json({ status: 'ok', teams });
}

module.exports = {
    importCompetition,
    getAllCompetitions,
    getCompetitionById,
    getTeamsByCompetition
}