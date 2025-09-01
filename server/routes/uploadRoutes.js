const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: 'portfolio_uploads', resource_type: 'auto' },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            // Reject the file and pass a specific error message
            cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
        }
    }
});

// Custom middleware to handle multer errors gracefully
const uploadSingle = (req, res, next) => {
    const uploadMiddleware = upload.single('image');
    uploadMiddleware(req, res, function (err) {
        if (err) { // Catches fileFilter errors and other multer errors
            return res.status(400).json({ message: err.message });
        }
        // Everything went fine, proceed to the next function
        next();
    });
};

router.post('/', protect, uploadSingle, (req, res) => {
  if (req.file) {
    res.json({
      message: 'File Uploaded to Cloudinary',
      image: req.file.path,
    });
  } else {
    res.status(400).json({ message: 'No file was uploaded or it was an invalid type.' });
  }
});

module.exports = router;