const supertest = require("supertest");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const http = require("http");
const app = require("../../server/server");
const db = require("../../server/utils/db");

const token = jwt.sign({ id: 1 }, process.env.ACCESS_SECRET_TOKEN);
const userToken = jwt.sign(
  { email: "fake@gmail.com", id: 1 },
  process.env.ACCESS_SECRET_TOKEN
);

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn(),
  };
});

describe("user controller is working properly", () => {
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
    await db.migrate.rollback();
    server.close();
    done();
  });
  describe("registration working properly", () => {
    it("registers user properly", async () => {
      const query = {
        password: "fakePassword",
        email: "fake@gmail.com",
      };
      sgMail.send = jest.fn();
      jwt.sign = jest.fn().mockReturnValue(token);
      const result = await request
        .post("/api/user/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      expect(sgMail.send).toHaveBeenCalledWith({
        to: "fake@gmail.com",
        from: "adambarth611@gmail.com",
        subject: "Join Flack",
        html: `Click here to confirm email <a href=http://127.0.0.1:${
          server.address().port
        }/api/user/confirmation/${token}>http://127.0.0.1:${
          server.address().port
        }/api/user/confirmation/${token}</a>`,
      });
      expect(result.status).toBe(200);
    });
    it("should confirm user after email", async () => {
      const result = await request
        .get(`/api/user/confirmation/${token}`)
        .set("Content-Type", "application/x-www-form-urlencoded");
      expect(result.status).toBe(200);
    });
  });
  describe("Login works successfully", () => {
    it("should send jwt token when login successful", async () => {
      const query = { email: "fake@gmail.com", password: "fakePassword" };
      jwt.sign = jest.fn().mockReturnValue(userToken);
      const result = await request
        .post("/api/user/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      expect(result.status).toBe(200);
      expect(result.body.token).toEqual(userToken);
      expect(result.body.user).toEqual({
        email: "fake@gmail.com",
        id: 1,
        confirmed: 1,
      });
    });
    it("should send a 404 when login credentials are incorrect", async () => {
      const query = { email: "fake1@gmail.com", password: "fakePassword" };
      const result = await request
        .post("/api/user/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      expect(result.status).toBe(404);
    });
  });
});
