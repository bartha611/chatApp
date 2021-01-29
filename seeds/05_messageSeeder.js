const faker = require("faker");

const getDates = (total) => {
  const dates = [];
  for (let i = 0; i < total; i++) {
    dates.push(faker.date.between("2020-12-01", "2021-02-28"));
  }
  const sortedDates = dates.sort((a, b) => a - b);
  return sortedDates;
};

const createMessage = (date) => ({
  message: faker.lorem.text(),
  userId: Math.floor(Math.random() * 100) + 1,
  created_at: date,
  channelId: Math.floor(Math.random() * 500) + 1,
});

exports.seed = async function(knex) {
  await knex("messages").del();
  const totalMessages = 10000;
  const fakeMessages = [];
  const dates = getDates(totalMessages);
  for (let i = 0; i < totalMessages; i++) {
    fakeMessages.push(createMessage(dates[i]));
  }
  await knex("messages").insert(fakeMessages);
};
