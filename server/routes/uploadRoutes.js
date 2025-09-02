const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: 'portfolio_uploads', resource_type: 'auto' } });
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) cb(null, true);
  else cb(new Error('Invalid file type.'), false);
}});
const uploadSingle = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

router.post('/', protect, uploadSingle, (req, res) => {
  if (req.file) res.json({ message: 'File Uploaded', image: req.file.path });
  else res.status(400).json({ message: 'No file uploaded or invalid type.' });
});

module.exports = router;