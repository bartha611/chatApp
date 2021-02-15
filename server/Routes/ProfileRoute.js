const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const express = require("express");
const userAuth = require("../Middleware/userAuth");
const teamAuth = require("../Middleware/teamAuth");
const ProfileController = require("./../Controllers/ProfileController");

const s3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "flack611",
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `images/${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
  }),
});

const ProfileRouter = express.Router({ mergeParams: true });

ProfileRouter.post("/", userAuth, teamAuth, ProfileController.create);
ProfileRouter.delete(
  "/:profileId",
  userAuth,
  teamAuth,
  ProfileController.delete
);
ProfileRouter.post(
  "/:profileId/photo",
  userAuth,
  teamAuth,
  upload.single("avatar"),
  ProfileController.photo
);
ProfileRouter.put("/:profileId", userAuth, teamAuth, ProfileController.update);
ProfileRouter.get("/confirmation/:token", ProfileController.confirmation);

module.exports = ProfileRouter;
