const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin, updateAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', registerAdmin);
router.post('/login', authAdmin);
router.put('/profile', protect, updateAdminProfile);
module.exports = router;
