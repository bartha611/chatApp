const express = require("express");

const userAuth = require("../Middleware/userAuth");
const messageAuth = require("../Middleware/messageAuth");
const channelAuth = require("../Middleware/channelAuth");

const router = express.Router({ mergeParams: true });
const messageController = require("../Controllers/messageController");

router.post("/", userAuth, channelAuth, messageController.create);
router.get("/", userAuth, channelAuth, messageController.read);
router.put(
  "/:messageId",
  userAuth,
  channelAuth,
  messageAuth,
  messageController.update
);

router.delete(
  "/:messageId",
  userAuth,
  channelAuth,
  messageAuth,
  messageController.delete
);

module.exports = router;
