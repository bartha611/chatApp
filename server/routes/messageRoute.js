const express = require('express');

const router = express.router();
const messageController = require('../controllers/messageController')

router.post("/create", messageController.create)

module.exports = router;