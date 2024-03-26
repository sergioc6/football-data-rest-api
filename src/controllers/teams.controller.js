const { Team, Coach, Player } = require('./../database/models/index');
const teamsService = require('./../services/teams.service');

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllTeams = async (req, res) => {
    const { page, pageSize } = req.query; 7
    const teams = await Team.findAll();

    res.json({ status: 'ok', teams });
}

/**
 * @param {Object} req 
 * @param {Object} res 
 */
const getTeamById = async (req, res) => {
    const { id } = req.params;
    let team = await Team.findByPk(id);
    if (!team) {
        const teamResult = await teamsService.getTeamById(id);

        team = await Team.create({
            id: teamResult.id,
            name: teamResult.name,
            shortName: teamResult.shortName,
            tla: teamResult.tla,
            areaName: teamResult.area.name,
            address: teamResult.address
        });

        const { coach, squad } = teamResult;
        if (coach) {
            await Coach.findOrCreate({
                where: { id: coach.id },
                defaults: {
                    id: coach.id,
                    name: `${coach.firstName} ${coach.lastName}`,
                    dateOfBirth: coach.dateOfBirth,
                    nationality: coach.nationality,
                    teamId: team.id
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
                    teamId: team.id
                }
            });
        }
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

    res.json({ status: 'ok', players })
}

module.exports = {
    getAllTeams,
    getTeamById,
    getPlayersByTeam
}