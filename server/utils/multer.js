import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

// Safe and strict file filter
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".pdf", ".mp4", ".mov", ".avi", ".webm"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${ext} is not allowed!`), false);
  }
};

export const upload = multer({
  storage: multer.memoryStorage(), // ✅ Needed for buffer
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowed = [".jpeg", ".jpg", ".png", ".pdf", ".mp4", ".mov", ".avi", ".webm"];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext)
      ? cb(null, true)
      : cb(new Error(`File type ${ext} not allowed`));
  },

});

export const courseUpload = multer({
  storage: multer.memoryStorage(),          // buffer in RAM
  limits: { fileSize: 100 * 1024 * 1024 },  // 100 MB
  fileFilter: (req, file, cb) => {
    const allowed = [".jpeg", ".jpg", ".png", ".pdf", ".mp4", ".mov", ".avi", ".webm"];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext)
      ? cb(null, true)
      : cb(new Error(`File type ${ext} not allowed`));
  },
});