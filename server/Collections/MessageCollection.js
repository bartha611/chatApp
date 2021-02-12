/**
 * @param {Object} message - Message object
 * @param {Number} message.id - Message id
 * @param {String} message.message - Message
 * @param {String} message.avatar - Avatar image of user
 * @param {String} message.username - Username of user
 * @param {String} message.created_at - Time message was created
 * @param {Number} message.profileId - Profile id of person who wrote the message
 * @param {String} message.role - Userteam role
 */

const MessageCollection = (message) => ({
  id: message.id,
  message: message.message,
  created_at: message.created_at,
  user: {
    id: message.profileId,
    avatar: message.avatar,
    displayName: message.displayName,
    fullName: message.fullName,
    role: message.role,
  },
});

module.exports = MessageCollection;
