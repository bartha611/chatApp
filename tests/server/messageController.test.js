const supertest = require("supertest");
const http = require("http");
const app = require("../../app");

jest.mock(
  "../../server/middleware/userAuthenticate",
  () => (req, res, next) => {
    req.username = "eric";
    next();
  }
);

describe("message controller working properly", () => {
  let server;
  let request;
  beforeAll(done => {
    server = http.createServer(app);
    server.listen();
    request = supertest(app);
    done();
  });
  afterAll(done => {
    server.close();
    done();
  });
  describe("can create a message", () => {
    it("can create a message properly", () => {
      const query = {};
    });
  });
});
