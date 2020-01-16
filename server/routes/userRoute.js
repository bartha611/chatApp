const express = require("express");

const authenticate = require("../middleware");

const router = express.Router();
const userController = require("./../controllers/userController");

router.post("/login", userController.login);

router.post("/create", userController.register);

router.post("/logout", userController.logout);

router.delete("/delete", authenticate, userController.delete);

module.exports = router;
