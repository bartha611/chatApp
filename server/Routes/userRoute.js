const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const userAuth = require("../Middleware/userAuth");

const router = express.Router();
const userController = require("./../Controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", userAuth, userController.list);
router.get("/confirmation/:token", userController.confirmation);

module.exports = router;
