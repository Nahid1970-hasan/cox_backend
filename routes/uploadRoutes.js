const express = require("express");
const router = express.Router();

const {
  uploadSingle,
  handleUploadSingle,
  uploadMultiple,
  handleUploadMultiple,
  uploadErrorHandler,
} = require("../controllers/uploadController");

router.post("/upload", uploadSingle, handleUploadSingle, uploadErrorHandler);

router.post(
  "/upload/multiple",
  uploadMultiple,
  handleUploadMultiple,
  uploadErrorHandler
);

module.exports = router;
