const { Team } = require('../models/team');
const { userTeam } = require('../models/userTeam');

exports.create = async function(req,res) {
  const { team, open } = req.body;
  try {
    const old_team = await Team.findOne({where: { name: team}});
    if(old_team) {
      return res.status(404).send('Team name has already been taken');
    }
    const new_team = await Team.create({
      name: team,
      open: open
    });
    res.status(200).send(new_team);
  } catch(err) {
    return res.status(404).send(err);
  }
}