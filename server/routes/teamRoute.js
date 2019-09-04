const express = require("express");

const teamRouter = express.Router();
const teamController = require("./../controllers/teamController");

teamRouter.post("/create", teamController.create);

teamRouter.get("/read", teamController.read);

module.exports = teamRouter;
