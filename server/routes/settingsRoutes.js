const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// Route to get settings (public)
router.get('/', getSettings);

// Route to update settings (protected)
router.put('/', protect, updateSettings);

module.exports = router;