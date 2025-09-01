const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const authAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const admin = await Admin.create({ email, password });
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
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        if (admin) {
            admin.email = req.body.email || admin.email;
            if (req.body.password) {
                admin.password = req.body.password;
            }
            const updatedAdmin = await admin.save();
            res.json({
                _id: updatedAdmin._id,
                email: updatedAdmin.email,
                token: generateToken(updatedAdmin._id),
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { authAdmin, registerAdmin, updateAdminProfile };