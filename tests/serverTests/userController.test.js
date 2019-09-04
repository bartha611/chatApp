import app from "../../app";

const supertest = require("supertest");
const http = require("http");

describe("POST /user", () => {
  let server;
  let request;
  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });
  afterAll(done => server.close(done));
  it("user login working correctly for acutal user", async () => {
    const query = { username: "eric", password: "a" };
    const result = await request
      .post("/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(query);
    expect(result.status).toBe(200);
    expect(result.text).toEqual("eric");
  });
  it("login fails properly", async () => {
    const query = { username: "lakjflksajdf", password: "aljfdlas" };
    const response = await request
      .post("/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(query);
    expect(response.status).toEqual(400);
    expect(response.text).toEqual("No user exists");
  });
  it("login fails with incorrect password", async () => {
    const query = { username: "eric", password: "shlasdjf" };
    const response = await request
      .post("/user/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(query);
    expect(response.status).toBe(400);
    expect(response.text).toEqual("Username or Password is incorrect");
  });
});
