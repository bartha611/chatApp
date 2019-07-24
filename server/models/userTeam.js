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
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  teamId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Teams',
      key: 'id'
    }
  }
}

const userTeam = sequelize.define('userTeam', userTeamSchema);

userTeam.sync();

module.exports = {
  userTeam
};