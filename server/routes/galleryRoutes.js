const express = require('express');
const router = express.Router();
const {
  createGallery,
  getGalleries,
  deleteGallery,
  getGalleryById, // Make sure this is imported
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

// Route to get all galleries (public)
router.get('/', getGalleries);

// THIS IS THE MISSING ROUTE
router.get('/:id', getGalleryById);

// Route to create a new gallery (protected)
router.post('/', protect, createGallery);

// Route to delete a gallery (protected)
router.delete('/:id', protect, deleteGallery);

module.exports = router;