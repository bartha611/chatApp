const faker = require("faker");

const getDates = (total) => {
  const dates = [];
  for (let i = 0; i < total; i++) {
    dates.push(faker.date.between("2020-12-01", "2021-02-28"));
  }
  const sortedDates = dates.sort((a, b) => a - b);
  return sortedDates;
};

const createMessage = async (date, knex) => {
  const channelId = Math.floor(Math.random() * 500) + 1;
  const response = await knex("channels AS c")
    .select("userId")
    .join("teams AS t", "t.id", "=", "c.teamId")
    .join("userteams AS ut", "ut.teamId", "=", "t.id")
    .where("c.id", channelId);
  const userIds = response.map((result) => result.userId);
  return {
    created_at: date,
    message: faker.lorem.text(),
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    channelId,
  };
};

exports.seed = async function(knex) {
  await knex("messages").del();
  const totalMessages = 10000;
  const dates = getDates(totalMessages);
  const promises = [];
  for (let i = 0; i < totalMessages; i++) {
    promises.push(createMessage(dates[i], knex));
  }
  const fakeMessages = await Promise.all(promises);
  await knex("messages").insert(fakeMessages);
};
