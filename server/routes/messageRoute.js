const express = require("express");

const authenticate = require("../middleware/userAuthenticate");
const messageAuth = require("../middleware/messageAuth");

const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/create", authenticate, messageController.create);
router.get("/read", authenticate, messageController.read);
router.delete(
  "/delete/:id",
  authenticate,
  messageAuth,
  messageController.delete
);

module.exports = router;
