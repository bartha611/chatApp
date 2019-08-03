const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

const messageSchema = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    default: Sequelize.NOW
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  channelId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Channels',
      key: 'id'
    }
  }
}

const Message = sequelize.define('Message', messageSchema);

Message.sync();

module.exports = {
  Message
}
