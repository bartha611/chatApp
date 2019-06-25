const Sequelize = require('sequelize');
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
  
}