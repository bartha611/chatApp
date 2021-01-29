const faker = require("faker");
const shortid = require("shortid");

const createChannel = () => ({
  name: faker.random.word(),
  shortid: shortid.generate(),
  description: faker.random.words(),
  teamId: Math.floor(Math.random() * 50) + 1,
});

exports.seed = async function(knex) {
  await knex("channels").del();
  const totalChannels = 500;
  const fakeChannels = [];
  for (let i = 0; i < totalChannels; i++) {
    fakeChannels.push(createChannel());
  }
  await knex("channels").insert(fakeChannels);
};
