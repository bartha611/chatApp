const express = require("express");

const memberRoute = express.Router();
const memberController = require("../controllers/memberController");

memberRoute.post("/create", memberController.create);
memberRoute.get("/read", memberController.read);

module.exports = memberRoute;
