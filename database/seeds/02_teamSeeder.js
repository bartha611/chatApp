const faker = require("faker");
const { nanoid } = require("nanoid");

const createTeam = () => ({
  name: faker.random.word(),
  shortid: nanoid(14),
  administrator: Math.floor(Math.random() * 100) + 1,
});

exports.seed = async function(knex) {
  await knex("teams").del();
  const fakeTeams = [];
  const totalTeams = 50;
  for (let i = 0; i < totalTeams; i++) {
    fakeTeams.push(createTeam());
  }
  await knex("teams").insert(fakeTeams);
};
