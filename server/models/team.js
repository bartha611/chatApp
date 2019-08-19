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
  shortid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
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