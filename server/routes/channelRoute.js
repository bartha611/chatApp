const express = require("express");

const router = express.Router();
const channelController = require("../controllers/channelController");

router.post("/create", channelController.create);

module.exports = router;
