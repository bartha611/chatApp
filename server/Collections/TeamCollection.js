/**
 * @param {Object} team
 * @param {Number} team.id - Id of team
 * @param {String} team.name - Name of Team
 * @param {String} team.shortid - Shortid of team
 * @param {Number} team.administrator - Administrator user Id
 */

const TeamCollection = (team) => ({
  id: team.id,
  name: team.name,
  shortid: team.shortid,
  administrator: team.administrator,
});

module.exports = TeamCollection;
