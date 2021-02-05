/**
 * @param {Object} message - Message object
 * @param {Number} message.id - Message id
 * @param {String} message.message - Message
 * @param {String} message.avatar - Avatar image of user
 * @param {String} message.username - Username of user
 * @param {String} message.created_at - Time message was created
 * @param {String} message.role - Userteam role
 */

const MessageCollection = (message) => ({
  id: message.id,
  message: message.message,
  created_at: message.created_at,
  user: {
    username: message.username,
    avatar: message.avatar,
    fullName: message.fullName,
    role: message.role,
  },
});

export default MessageCollection;
