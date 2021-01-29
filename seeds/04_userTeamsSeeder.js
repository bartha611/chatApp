exports.seed = async function(knex) {
  await knex("userteams").del();
  const totalUserTeams = 500;
  const fakeUserTeams = [];
  let i = 0;
  do {
    const userId = Math.floor(Math.random() * 100) + 1;
    const teamId = Math.floor(Math.random() * 50) + 1;
    const unique =
      fakeUserTeams.filter((x) => {
        return x.userId === userId && x.teamId === teamId;
      }).length === 0;
    if (unique) {
      fakeUserTeams.push({ userId, teamId });
      i++;
    }
  } while (i < totalUserTeams);
  await knex("userteams").insert(fakeUserTeams);
};
