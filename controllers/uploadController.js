const fs = require("fs");
const path = require("path");
const multer = require("multer");

const UPLOAD_ROOT = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_ROOT)) {
  fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
}

const sanitize = (name) =>
  name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_+/g, "_");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_ROOT),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = sanitize(path.basename(file.originalname, ext));
    const stamp = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${stamp}${ext.toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const buildPublicUrl = (req, filename) => {
  const host = `${req.protocol}://${req.get("host")}`;
  return `${host}/uploads/${filename}`;
};

const fileToPayload = (req, file) => ({
  filename: file.filename,
  originalname: file.originalname,
  mimetype: file.mimetype,
  size: file.size,
  path: `/uploads/${file.filename}`,
  url: buildPublicUrl(req, file.filename),
});

exports.uploadSingle = upload.single("file");

exports.handleUploadSingle = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded. Send as multipart/form-data with field 'file'.",
    });
  }
  res.status(201).json({
    success: true,
    data: fileToPayload(req, req.file),
  });
};

exports.uploadMultiple = upload.array("files", 10);

exports.handleUploadMultiple = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded. Send as multipart/form-data with field 'files'.",
    });
  }
  res.status(201).json({
    success: true,
    count: req.files.length,
    data: req.files.map((f) => fileToPayload(req, f)),
  });
};

exports.uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
  next();
};
