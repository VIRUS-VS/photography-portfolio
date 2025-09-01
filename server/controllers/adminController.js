const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// A utility function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register a new admin
// @route   POST /api/admin
// @access  Public (for initial setup)
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            res.status(400).json({ message: 'Admin already exists' });
            return;
        }

        const admin = await Admin.create({
            email,
            password,
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { authAdmin, registerAdmin };