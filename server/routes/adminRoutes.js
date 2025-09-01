const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin, updateAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerAdmin);
router.post('/login', authAdmin);

// NEW: Add a protected route for updating the profile
router.put('/profile', protect, updateAdminProfile);

module.exports = router;