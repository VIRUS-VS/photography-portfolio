// const express = require('express');
// const router = express.Router();
// const { uploadPhotos, getPhotosForGallery, deletePhoto } = require('../controllers/photoController');
// const { protect } = require('../middleware/authMiddleware');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// // --- Multer/Cloudinary config (no changes here) ---
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


// // --- CORRECTED ROUTES SECTION ---
// // This route supports the NEW public gallery page
// router.get('/gallery/:galleryId', getPhotosForGallery);

// // This route supports the EXISTING admin "Manage Gallery" page
// router.get('/:galleryId', getPhotosForGallery);


// // --- Other routes (no changes here) ---
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

// --- Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: 'portfolio_uploads', resource_type: 'auto' }});
const upload = multer({ storage: storage });
const uploadMultiple = upload.array('images', 10);

// --- API ROUTES ---

// 1. PUBLIC ROUTE: For the "customer side". It is NOT protected.
router.get('/view/:galleryId', getPhotosForGallery);

// 2. ADMIN ROUTE: For the admin dashboard. It IS protected.
router.get('/:galleryId', protect, getPhotosForGallery);

// 3. ADMIN ROUTE: To upload new photos. (Protected)
router.post('/:galleryId', protect, uploadMultiple, uploadPhotos);

// 4. ADMIN ROUTE: To delete a photo. (Protected)
router.delete('/:id', protect, deletePhoto);

module.exports = router;