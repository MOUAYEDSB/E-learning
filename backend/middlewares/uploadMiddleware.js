const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helper function to ensure directory exists
const ensureDirectoryExistence = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
};

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    switch (req.body.role) {
      case 'Parent':
        folder = 'uploads/parent_img';
        break;
      case 'Formateur':
        folder = 'uploads/formateur_img';
        break;
      case 'Enfant':
        folder = 'uploads/enfant_img';
        break;
      default:
        folder = 'uploads/others';
    }
    ensureDirectoryExistence(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Create the upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter
});

module.exports = upload;
