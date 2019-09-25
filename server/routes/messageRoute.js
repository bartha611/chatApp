const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController')

router.post("/create", messageController.create);
router.get("/read", messageController.read);

module.exports = router;