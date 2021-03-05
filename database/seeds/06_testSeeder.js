// eslint-disable-next-line
const Knex = require("knex");
const bcrypt = require("bcryptjs");

/**
 *
 * @param {Knex} knex
 */

exports.seed = async function(knex) {
  // create fake users
  if (process.env.NODE_ENV === "test") {
    const hashedPassword = await bcrypt.hash("a", 10);
    await knex.table("users").insert([
      { email: "faker@gmail.com", password: hashedPassword, confirmed: true },
      { email: "faker1@gmail.com", password: hashedPassword, confirmed: true },
    ]);

    // create teams
    await knex.table("teams").insert([
      { name: "team1", shortid: "shortid1", administrator: 1 },
      { name: "team2", shortid: "shortid2", administrator: 2 },
    ]);

    // create profiles
    await knex.table("profiles").insert([
      {
        fullName: "faker",
        confirmed: true,
        shortid: "shortid3",
        teamId: 1,
        userId: 1,
      },
      {
        fullName: "faker1",
        confirmed: true,
        shortid: "shortid4",
        teamId: 2,
        userId: 2,
      },
    ]);

    // create channels
    await knex.table("channels").insert([
      {
        name: "channel1",
        shortid: "shortid5",
        description: "description 1",
        teamId: 1,
      },
      {
        name: "channel2",
        shortid: "shortid6",
        description: "description 2",
        teamId: 1,
      },
      {
        name: "channel3",
        shortid: "shortid7",
        description: "description 3",
        teamId: 2,
      },
    ]);

    // create messages
    await knex("messages").insert([
      { message: "message 1", channelId: 1, profileId: 1 },
      { message: "message 2", channelId: 1, profileId: 1 },
      { message: "message 3", channelId: 2, profileId: 1 },
      { message: "message 4", channelId: 3, profileId: 2 },
      { message: "message 5", channelId: 3, profileId: 2 },
    ]);
  }
};
