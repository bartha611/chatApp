/**
 * @param {Object} channel - Channel object
 * @param {Number} channel.id - Id of channel
 * @param {String} channel.name - Channel name
 * @param {String} channel.shortid - Shortid of channel
 * @param {String} channel.description - Description of channel
 */

const ChannelCollection = (channel) => ({
  id: channel.id,
  shortid: channel.shortid,
  name: channel.name,
  description: channel.description,
});

module.exports = ChannelCollection;
