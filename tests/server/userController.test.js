const supertest = require("supertest");
const http = require("http");
const app = require("../../app");

describe("user controller is working properly", () => {
  let server;
  let request;
  let token;
  beforeAll(done => {
    server = http.createServer(app);
    server.listen();
    request = supertest(server);
    done();
  });
  afterAll(done => {
    server.close();
    done();
  });
  describe("registration working properly", () => {
    it("registers user properly", async () => {
      const query = {
        username: "fakeUser",
        password: "fakePassword",
        email: "fake@gmail.com"
      };
      const result = await request
        .post("/user/create")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      expect(result.status).toBe(200);
      const data = JSON.parse(result.text);
      token = data.jwt;
      expect(data.user).toEqual("fakeUser");
    });
  });
  describe("delete route working properly", () => {
    it("properly deletes fake user", async () => {
      const result = await request
        .del("/user/delete")
        .set("authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });
  });
  describe("login route properly logs in user", () => {
    it("logs in given correct credentials", async () => {
      const query = { username: "eric", password: "a" };
      const result = await request
        .post("/user/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      expect(result.status).toBe(200);
      const data = JSON.parse(result.text);
      expect(data.user).toEqual("eric");
    });
    it("rejects login given incorrect username and password", async () => {
      const query = { username: "fake", password: "fakePassword" };
      const result = await request
        .post("/user/login")
        .set("Content-type", "application/x-www-form-urlencoded")
        .send(query);
      expect(result.status).toBe(400);
      expect(result.text).toEqual("No user exists");
    });
    it("rejects login given correct username and incorrect password", async () => {
      const query = { username: "eric", password: "fakePassword" };
      const result = await request
        .post("/user/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      expect(result.status).toBe(400);
      expect(result.text).toEqual("Username or Password is incorrect");
    });
  });
});
