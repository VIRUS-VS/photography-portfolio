// const express = require('express');
// const router = express.Router();
// const { uploadPhotos, getPhotosForGallery, deletePhoto } = require('../controllers/photoController');
// const { protect } = require('../middleware/authMiddleware');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
// const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: 'portfolio_uploads', resource_type: 'auto' } });
// const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) cb(null, true);
//   else cb(new Error('Invalid file type.'), false);
// }});
// const uploadMultiple = (req, res, next) => {
//   upload.array('images', 10)(req, res, (err) => {
//     if (err) return res.status(400).json({ message: err.message });
//     next();
//   });
// };

// router.get('/:galleryId', getPhotosForGallery);
// router.post('/:galleryId', protect, uploadMultiple, uploadPhotos);
// router.delete('/:id', protect, deletePhoto);
// module.exports = router;

const express = require('express');
const router = express.Router();
const { uploadPhotos, getPhotosForGallery, deletePhoto } = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: 'portfolio_uploads', resource_type: 'auto' } });
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) cb(null, true);
  else cb(new Error('Invalid file type.'), false);
}});
const uploadMultiple = (req, res, next) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

// --- THIS IS THE CORRECTED LINE ---
router.get('/gallery/:galleryId', getPhotosForGallery);

router.post('/:galleryId', protect, uploadMultiple, uploadPhotos);
router.delete('/:id', protect, deletePhoto);

module.exports = router;