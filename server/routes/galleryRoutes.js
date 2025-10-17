// const express = require('express');
// const router = express.Router();
// const { createGallery, getGalleries, deleteGallery, getGalleryById } = require('../controllers/galleryController');
// const { protect } = require('../middleware/authMiddleware');
// router.get('/', getGalleries);
// router.get('/:id', getGalleryById);
// router.post('/', protect, createGallery);
// router.delete('/:id', protect, deleteGallery);
// module.exports = router;

const express = require('express');
const router = express.Router();
// --- 1. Import updateGallery ---
const { createGallery, getGalleries, deleteGallery, getGalleryById, updateGallery } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getGalleries);
router.get('/:id', getGalleryById);
router.post('/', protect, createGallery);
router.delete('/:id', protect, deleteGallery);

// --- 2. ADD THIS PUT ROUTE ---
router.put('/:id', protect, updateGallery);

module.exports = router;