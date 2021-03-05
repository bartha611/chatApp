const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const http = require("http");
const app = require("../../server/server");
const db = require("../../server/utils/db");

describe("channel controller is working properly", () => {
  let server;
  let request;
  beforeAll(async (done) => {
    server = http.createServer(app);
    server.listen();
    request = supertest(server);
    await db.migrate.latest();
    done();
  });
  afterAll(async (done) => {
    server.close();
    done();
  });
  describe("channel controller is working", () => {
    it("should allow user to create channel if he or she belongs to team", async () => {
      const query = { name: "channel3", description: "description 4" };
      const user = { id: 1, email: "faker@gmail.com" };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .post("/api/teams/shortid1/channels")
        .set("Authorization", `Bearer ${token}`)
        .send(query);
      expect(result.status).toBe(200);
      expect(result.body.channel).toMatchObject(query);
    });
    it("should not allow user to create channel with incorrect credentials", async () => {
      const query = { name: "channel4", description: "lkasjdlkfj" };
      const user = { id: 2, email: "faker1@gmail.com" };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .post("/api/teams/shortid1/channels")
        .set("Authorization", `Bearer ${token}`)
        .send(query);
      expect(result.status).toBe(403);
    });
  });
});
