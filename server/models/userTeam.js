const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

const userTeamSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    referencesKey: 'id',
    references: 'User'
  },
  teamId: {
    type: Sequelize.INTEGER,
    referencesKey: 'id',
    references: 'Team'
  }
}

const userTeam = sequelize.define('userTeam', userTeamSchema);

userTeam.sync();

module.exports = {
  userTeam
};