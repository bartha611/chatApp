const express = require('express');
var teamRouter = express.Router();
const teamController = require('./../controllers/teamController');

teamRouter.post('/create', teamController.create);

module.exports = teamRouter;