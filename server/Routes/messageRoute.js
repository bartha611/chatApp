const express = require("express");

const userAuth = require("../Middleware/userAuth");
const channelAuth = require("../Middleware/channelAuth");

const router = express.Router({ mergeParams: true });
const messageController = require("../Controllers/messageController");

router.post("/", userAuth, channelAuth, messageController.create);
router.get("/", userAuth, channelAuth, messageController.read);
module.exports = router;
