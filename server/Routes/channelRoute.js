const express = require("express");

const userAuth = require("../Middleware/userAuth");
const teamAuth = require("../Middleware/teamAuth");
const channelAuth = require("../Middleware/channelAuth");

const router = express.Router({ mergeParams: true });
const channelController = require("../Controllers/channelController");

router.post("/", userAuth, teamAuth, channelController.create);
router.get("/:channelId", userAuth, channelAuth, channelController.read);
router.delete("/:channelId", userAuth, teamAuth, channelController.delete);

module.exports = router;
