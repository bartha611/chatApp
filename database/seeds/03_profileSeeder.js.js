// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
const { nanoid } = require("nanoid");
const faker = require("faker");

const createProfile = (userId, teamId) => ({
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  displayName: faker.internet.userName(),
  shortid: nanoid(14),
  role: faker.name.jobTitle(),
  userId,
  teamId,
});

/**
 *
 * @param {Knex} knex
 */

exports.seed = async function(knex) {
  await knex("profiles").del();
  const totalProfiles = 500;
  const fakeProfiles = [];
  let i = 0;
  do {
    const userId = Math.floor(Math.random() * 100) + 1;
    const teamId = Math.floor(Math.random() * 50) + 1;
    if (
      fakeProfiles.filter((x) => {
        return x.userId === userId && x.teamId === teamId;
      }).length === 0
    ) {
      fakeProfiles.push(createProfile(userId, teamId));
      i++;
    }
  } while (i < totalProfiles);
  await knex("profiles").insert(fakeProfiles);
};
