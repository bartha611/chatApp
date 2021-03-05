const express = require("express");
const userAuth = require("../Middleware/userAuth");
const teamAuth = require("../Middleware/teamAuth");

const teamRouter = express.Router();
const teamController = require("./../Controllers/teamController");

teamRouter.post("/", userAuth, teamController.create);
teamRouter.get("/", userAuth, teamController.list);
teamRouter.delete("/:teamId", userAuth, teamAuth, teamController.delete);
teamRouter.get("/:teamId", userAuth, teamAuth, teamController.get);

module.exports = teamRouter;
