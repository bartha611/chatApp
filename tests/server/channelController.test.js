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

describe("channel controller is working properly", () => {
  let server;
  let request;
  const team = "UdZJeHwe";
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
  describe("creation of channel working properly", () => {
    const query = { name: "jaime", team, description: "about kingslayer" };
    it("can create channel", () => {
      request
        .post("/channel/create")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(query)
        .expect(response => {
          expect(response.status).toBe(200);
          ({ id } = response.body);
        });
    });
  });
  describe("reading of channel working properly", () => {
    const expectedResponse = {
      id: 14,
      name: "general",
      shortid: "L1VJ2aRL2",
      description: "general channel",
      createdat: "2020-03-07T02:31:45.111Z",
      teamid: 14
    };
    it("can read", () => {
      request.get(`/channel/read?team=${team}`).expect(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
  describe("deletion of channel working properly", () => {
    it("can delete channel", () => {
      request.del(`/channel/delete/${id}`).expect(response => {
        expect(response.status).toBe(200);
      });
    });
  });
});
