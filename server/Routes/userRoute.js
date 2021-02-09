const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const userAuth = require("../Middleware/userAuth");

const s3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "flack611",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `images/${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
  }),
});

const router = express.Router();
const userController = require("./../Controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", userAuth, userController.list);
router.get("/confirmation/:token", userController.confirmation);
router.post("/photo", userAuth, upload.single("avatar"), userController.photo);

module.exports = router;
