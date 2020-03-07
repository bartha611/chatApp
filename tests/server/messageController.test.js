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
  let id;
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
      const query = {
        zone: "America/Chicago",
        input: "Hello there",
        channel: "L1VJ2aRL2"
      };
      request
        .post("/message/create")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query)
        .expect(response => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Hello there");
          ({ id } = response.body);
        });
    });
  });
  describe("can delete a message", () => {
    it("deletes message properly", () => {
      request.del(`/message/delete/${id}`).expect(response => {
        expect(response.status).toBe(200);
      });
    });
  });
});
