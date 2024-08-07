const asyncHandler = require("express-async-handler");

// async function uploadSingleImage(req, res) {

// }

// async function uploadMultipleImage(req, res) {

// }

const uploadSingleImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    return res.status(200).json({
      sucess: true,
      img: req.file.path,
    });
  } catch (error) {
    console.log("error upload single image" + error);
  }
});

const uploadMultipleImage = asyncHandler(async (req, res) => {
  if (!req.files && req.files.length === 0) {
    next(new Error("No files uploaded!"));
    return;
  }
  const listUrls = req.files.map((val) => val.path);
  return res.status(200).json({
    sucess: true,
    album: listUrls,
  });
});
module.exports = {
  uploadSingleImage: uploadSingleImage,
  uploadMultipleImage: uploadMultipleImage,
};
