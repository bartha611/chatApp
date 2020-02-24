const supertest = require("supertest");
const http = require("http");
const app = require("../../app");

jest.mock("../../server/middleware", () => (req, res, next) => {
  req.username = "eric";
  next();
});

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
      const query = { team: "fakeTeam1", open: false };
      const result = await request
        .post("/team/create")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query);
      console.log(result.res);
      expect(result.status).toBe(200);
    });
  });
  describe("can delete a team", () => {
    it("deletes a team", async () => {
      const result = await request.del(`/team/delete/${id}`);
      expect(result.status).toBe(200);
    });
  });
});
