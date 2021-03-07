const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const http = require("http");
const app = require("../../server/server");

describe("Message Controller", () => {
  let server;
  let request;
  beforeAll(async (done) => {
    server = http.createServer(app);
    server.listen();
    request = supertest(server);
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
    it("should get list of messages if authorized", async () => {
      const user = { id: 1, email: "faker@gmail.com" };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .get("/api/channels/shortid5/messages")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body.messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "message 1",
            user: expect.objectContaining({ id: 1, fullName: "faker" }),
          }),
          expect.objectContaining({
            message: "message 2",
            user: expect.objectContaining({ id: 1, fullName: "faker" }),
          }),
          expect.objectContaining({
            message: "I hate testing",
            user: expect.objectContaining({ id: 1, fullName: "faker" }),
          }),
        ])
      );
      expect(result.body.cursor).toBeNull();
      expect(result.body.channel).toMatchObject({
        shortid: "shortid5",
        name: "channel1",
      });
    });
    it("should get 50 messages when channel has greater than 50 messages and no cursor is provided", async () => {
      const user = { email: "faker1@gmail.com", id: 2 };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .get("/api/channels/shortid7/messages")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body.cursor).toBe(51);
      expect(result.body.messages.length).toBe(50);
    });
    it("should get paginate with messages when cursor is supplied", async () => {
      const user = { email: "faker1@gmail.com", id: 2 };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .get("/api/channels/shortid7/messages?cursor=51")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body.cursor).toBe(1);
      expect(result.body.messages.length).toBe(50);
    });
    it("should not allow user to get list of messages if not authorized", async () => {
      const user = { email: "faker1@gmail.com", id: 2 };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      const result = await request
        .get("/api/channels/shortid5/messages")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(403);
    });
  });
});
