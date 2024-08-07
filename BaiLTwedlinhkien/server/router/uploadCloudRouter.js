var express = require("express");
var router = express.Router();
var fileUploader = require("../configs/cloudinary.config");
var ctrls = require("../app/uploadImages");

router.post(
  "/upload-cloud",
  fileUploader.uploadCloud.single("image"),
  ctrls.uploadSingleImage
);

router.post(
  "/upload-multiple",
  fileUploader.uploadMultipleImage.array("files", 3),
  ctrls.uploadMultipleImage
);

module.exports = router;
