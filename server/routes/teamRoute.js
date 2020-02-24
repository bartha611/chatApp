const express = require("express");
const authenticate = require("../middleware");

const teamRouter = express.Router();
const teamController = require("./../controllers/teamController");

teamRouter.post("/create", authenticate, teamController.create);

teamRouter.get("/read", authenticate, teamController.read);

teamRouter.delete("/delete/:id", teamController.delete);

module.exports = teamRouter;
