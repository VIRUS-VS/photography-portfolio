// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;
// const { protect } = require('../middleware/authMiddleware');

// cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
// const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: 'portfolio_uploads', resource_type: 'auto' } });
// const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) cb(null, true);
//   else cb(new Error('Invalid file type.'), false);
// }});
// const uploadSingle = (req, res, next) => {
//   upload.single('image')(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     next();
//   });
// };

// router.post('/', protect, uploadSingle, (req, res) => {
//   if (req.file) res.json({ message: 'File Uploaded', image: req.file.path });
//   else res.status(400).json({ message: 'No file uploaded or invalid type.' });
// });

// module.exports = router;

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
  params: {
    folder: 'portfolio_uploads',
    resource_type: 'auto',
  },
});

const fileFilter = (req, file, cb) => {
  // DEBUG: Log the received file's mimetype to the server console
  console.log(`--- Multer fileFilter received file: '${file.originalname}' with mimetype: '${file.mimetype}' ---`);

  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    console.log('File type accepted.');
    cb(null, true); // Accept the file
  } else {
    console.log('File type REJECTED.');
    // Provide a more specific error message back to the frontend
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Custom middleware to handle multer errors more gracefully
const uploadSingle = (req, res, next) => {
  const uploadMiddleware = upload.single('image');

  uploadMiddleware(req, res, function (err) {
    if (err) {
      // Log the specific error from multer or the fileFilter
      console.error('Upload Error:', err.message);
      return res.status(400).json({ message: err.message });
    }
    // Everything went fine, proceed.
    next();
  });
};

router.post('/', protect, uploadSingle, (req, res) => {
  if (req.file) {
    console.log('File successfully uploaded to Cloudinary:', req.file.path);
    res.json({ message: 'File Uploaded', image: req.file.path });
  } else {
    res.status(400).json({ message: 'No file was uploaded.' });
  }
});

module.exports = router;