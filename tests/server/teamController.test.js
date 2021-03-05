const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const supertest = require("supertest");
const http = require("http");
const jwt = require("jsonwebtoken");
const app = require("../../server/server");
const db = require("../../server/utils/db");

const user = { email: "fake1@gmail.com", confirmed: 1 };

jest.mock("nanoid", () => {
  return {
    nanoid: () => "helloThere",
  };
});

describe("team controller is working properly", () => {
  let server;
  let request;
  let testUser;
  let token;
  let userTeam;
  beforeAll(async (done) => {
    server = http.createServer(app);
    server.listen();
    request = supertest(server);
    const hashedPassword = await bcrypt.hash("fakePassword", 10);
    await db.table("users").insert({ ...user, password: hashedPassword });
    testUser = await db
      .table("users")
      .where({ email: user.email })
      .then((row) => row[0]);
    token = jwt.sign({ user: testUser }, process.env.ACCESS_SECRET_TOKEN);
    done();
  });
  afterAll(async (done) => {
    server.close();
    done();
  });
  describe("Team controller works properly", () => {
    it("should allow user to create team when authenticated", async () => {
      const query = { name: "newChannel" };
      delete testUser.password;
      const result = await request
        .post("/api/teams")
        .set("Authorization", `Bearer ${token}`)
        .send(query);
      expect(result.status).toBe(200);
      expect(result.body.team).toMatchObject({
        name: "newChannel",
        shortid: "helloThere",
      });
      userTeam = result.body.team;
      const channel = await db("channels")
        .select("*")
        .where({ teamId: result.body.team.id })
        .limit(1)
        .then((row) => row[0]);
      expect(channel).toMatchObject({
        teamId: result.body.team.id,
        name: "random",
        shortid: "helloThere",
        description: "random channel",
      });
      const profile = await db("profiles")
        .select("*")
        .where({ teamId: result.body.team.id })
        .limit(1)
        .then((row) => row[0]);
      expect(profile).toMatchObject({
        fullName: "fake1",
        shortid: "helloThere",
        userId: testUser.id,
      });
      const message = await db("messages")
        .select("*")
        .where({ channelId: channel.id, profileId: profile.id })
        .limit(1)
        .then((row) => row[0]);
      expect(message).toMatchObject({ message: "Joined random" });
    });
    it("should not allow team creation if user is not authenticated", async () => {
      const query = { name: "newTeam" };
      const result = await request.post("/api/teams").send(query);
      expect(result.status).toBe(403);
    });
    it("should get list of teams", async () => {
      const results = await request
        .get("/api/teams")
        .set("Authorization", `Bearer ${token}`);
      expect(results.status).toBe(200);
      expect(results.body.teams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "newChannel" }),
        ])
      );
    });
    it("shouldn't allow delete with wrong deletion", async () => {
      const result = await request.delete(`/api/teams/${userTeam.shortid}`);
      expect(result.status).toBe(403);
    });
    it("should delete with the correct credentials", async () => {
      const result = await request
        .delete(`/api/teams/${userTeam.shortid}`)
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });
  });
});
