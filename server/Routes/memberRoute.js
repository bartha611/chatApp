const express = require("express");

const memberRoute = express.Router({ mergeParams: true });
const memberController = require("../Controllers/memberController");

memberRoute.post("/", memberController.create);
memberRoute.get("/", memberController.read);

module.exports = memberRoute;
