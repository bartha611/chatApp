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
  describe("Message Controller", () => {
    it("should allow user to create message if authorized", async () => {
      const query = { message: "I hate testing" };
      const user = { id: 1, email: "faker@gmail.com" };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .post("/api/channels/shortid5/messages")
        .set("Authorization", `Bearer ${token}`)
        .send(query);
      expect(result.status).toBe(200);
      expect(result.body.message).toMatchObject({
        message: "I hate testing",
        user: { id: 1, fullName: "faker" },
      });
    });
    it("should not allow user to create message if not authorized", async () => {
      const query = { message: "I still hate testing" };
      const user = { id: 1, email: "faker@gmail.com" };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .post("/api/channels/shortid7/messages")
        .set("Authorization", `Bearer ${token}`)
        .send(query);
      expect(result.status).toBe(403);
    });
  });
});
