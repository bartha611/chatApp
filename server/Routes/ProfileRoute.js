const express = require("express");
const userAuth = require("../Middleware/userAuth");
const teamAuth = require("../Middleware/teamAuth");
const ProfileController = require("./../Controllers/ProfileController");

const ProfileRouter = express.Router();

ProfileRouter.post("/", userAuth, teamAuth, ProfileController.create);

ProfileRouter.delete(
  "/:profileId",
  userAuth,
  teamAuth,
  ProfileController.delete
);

ProfileRouter.get(
  "/confirmation/:token",
  userAuth,
  teamAuth,
  ProfileController.confirmation
);

module.exports = ProfileRouter;
