const express = require("express");

const router = express.Router();
const channelController = require("../controllers/channelController");

router.post("/create", channelController.create);
router.get("/read", channelController.read);

module.exports = router;
