const { Team } = require('../models/team');
const { userTeam } = require('../models/userTeam');

exports.create = async function(req,res) {
  const { team, open } = req.body;
  try {
    const oldTeam = await Team.findOne({where: { name: team}});
    if(oldTeam) {
      return res.status(404).send('Team name has already been taken');
    }
    const newTeam = await Team.create({
      name: team,
      open: open
    });
    res.status(200).send(newTeam);
  } catch(err) {
    return res.status(404).send(err);
  }
}