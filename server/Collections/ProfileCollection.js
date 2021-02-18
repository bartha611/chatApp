/**
 * @param {Object} profile - Profile object
 * @param {Number} [profile.profileId] - Id of profile
 * @param {Number} [profile.id] - Id of profile
 * @param {String} profile.fullName - Full name of profile
 * @param {String} profile.displayName - Display Name of profile
 * @param {String} profile.avatar - Avatar of profile
 * @param {String} profile.role - Role of profile
 * @param {String} profile.profileShortid - Shortid of profile
 */

const ProfileCollection = (profile) => ({
  id: profile.profileId ?? profile.id,
  fullName: profile.fullName,
  displayName: profile.displayName,
  avatar: profile.avatar,
  role: profile.role,
  shortid: profile.profileShortid,
});

module.exports = ProfileCollection;
