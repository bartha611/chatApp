const express = require("express");
const userAuth = require("../Middleware/userAuth");

const router = express.Router();
const userController = require("./../Controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", userAuth, userController.list);

module.exports = router;
