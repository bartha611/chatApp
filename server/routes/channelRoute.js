const express = require("express");

const authenticate = require("../middleware/userAuthenticate");

const router = express.Router();
const channelController = require("../controllers/channelController");

router.post("/create", channelController.create);
router.get("/read", authenticate, channelController.read);
router.delete("/delete/:id", authenticate, channelController.delete);

module.exports = router;
