const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

const channelSchema = {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true
  },
  channelId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  teamId: {
    type: Sequelize.STRING,
    references: 'teams',
    referencesKey: 'id'
  }
};

const Channel = sequelize.define('Channel', channelSchema);

Channel.sync();


module.exports = {
  Channel
}


