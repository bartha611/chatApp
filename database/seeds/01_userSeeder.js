const faker = require("faker");
const bcrypt = require("bcryptjs");

const createUser = (password) => ({
  email: faker.internet.email(),
  confirmed: true,
  password,
});

exports.seed = async function(knex) {
  await knex("users").del();
  const password = await bcrypt.hash("a", 10);
  const fakeUsers = [];
  const totalUsers = 99;
  const user = {
    email: "adambarth@gmail.com",
    confirmed: true,
    password,
  };
  fakeUsers.push(user);
  for (let i = 0; i < totalUsers; i++) {
    fakeUsers.push(createUser(password));
  }
  await knex("users").insert(fakeUsers);
};
