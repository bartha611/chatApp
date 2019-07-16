const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const channelSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  teamId: {
    type: Sequelize.INTEGER,
    references: 'teams',
    referencesKey: 'id'
  }
};

const Channel = sequelize.define('Channel', channelSchema);

Channel.sync();


module.exports = {
  Channel
}


