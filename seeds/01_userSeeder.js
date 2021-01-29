const faker = require("faker");
const bcrypt = require("bcryptjs");

const createUser = (password) => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password,
});

exports.seed = async function(knex) {
  await knex("users").del();
  const password = await bcrypt.hash("a", 10);
  const fakeUsers = [];
  const totalUsers = 99;
  const user = {
    username: "bartha611",
    email: "adambarth611@gmail.com",
    password,
  };
  fakeUsers.push(user);
  for (let i = 0; i < totalUsers; i++) {
    fakeUsers.push(createUser(password));
  }
  await knex("users").insert(fakeUsers);
};
