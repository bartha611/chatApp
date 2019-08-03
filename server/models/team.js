const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

const teamSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  teamId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  open: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}

const Team = sequelize.define('Team', teamSchema);

Team.sync();

module.exports = {
  Team
}