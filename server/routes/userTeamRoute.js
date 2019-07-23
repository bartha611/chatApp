const express = require('express');
const router = express.Router();
const userTeamController = require('./../controllers/userTeamController');

router.post("/create", userTeamController.create);

module.exports = router;