const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const http = require("http");
const app = require("../../server/server");

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn(),
  };
});

describe("Profile Controller", () => {
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
  describe("Profile Controller working properly", () => {
    it("should create a profile", async () => {
      const user = { email: "faker@gmail.com", id: 1 };
      const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);
      expect(token).not.toBeNull();
    });
  });
});
