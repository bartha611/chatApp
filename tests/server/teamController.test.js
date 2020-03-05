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

describe("team controller working properly", () => {
  let server;
  let request;
  let id;
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
  describe("can create a team", () => {
    it("creates a team", async () => {
      const query = { team: "fakeTeam", open: false };
      request
        .post("/team/create")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query)
        .expect(response => {
          expect(response.status).toBe(200);
          ({ id } = response.body);
        });
    });
  });
  describe("READ teams is working properly", () => {
    it("queries data with correct data", () => {
      request
        .get("/team/read")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .expect(response => {
          expect(response.status).toBe(200);
          expect(response.body.name).toBe("fakeTeam");
        });
    });
  });
  describe("can delete a team", () => {
    it("deletes a team", async () => {
      request.del(`/team/delete/${id}`).expect(response => {
        expect(response.status).toBe(200);
      });
    });
  });
});
