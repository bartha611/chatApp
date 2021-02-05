const faker = require("faker");
const bcrypt = require("bcryptjs");

const createUser = (password) => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: "https://flack611.s3.amazonaws.com/images/nightsky.jpg",
  password,
});

exports.seed = async function(knex) {
  await knex("users").del();
  const password = await bcrypt.hash("a", 10);
  const fakeUsers = [];
  const totalUsers = 99;
  const user = {
    username: "bartha611",
    fullName: "Adam Barth",
    email: "adambarth611@gmail.com",
    avatar:
      "https://flack611.s3.amazonaws.com/images/bartha611_2021-02-02T04%3A34%3A24137Z.png",
    password,
  };
  fakeUsers.push(user);
  for (let i = 0; i < totalUsers; i++) {
    fakeUsers.push(createUser(password));
  }
  await knex("users").insert(fakeUsers);
};
