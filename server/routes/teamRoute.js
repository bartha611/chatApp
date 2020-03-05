const express = require("express");
const authenticate = require("../middleware/userAuthenticate");
const teamDeleteAuth = require("../middleware/teamAuthenticate");

const teamRouter = express.Router();
const teamController = require("./../controllers/teamController");

teamRouter.post("/create", authenticate, teamController.create);

teamRouter.get("/read", authenticate, teamController.read);

teamRouter.delete(
  "/delete/:id",
  authenticate,
  teamDeleteAuth,
  teamController.delete
);

module.exports = teamRouter;
