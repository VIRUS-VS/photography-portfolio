const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin } = require('../controllers/adminController');

// Route for registering a new admin
// POST /api/admin
router.post('/', registerAdmin);

// Route for admin login
// POST /api/admin/login
router.post('/login', authAdmin);

module.exports = router;