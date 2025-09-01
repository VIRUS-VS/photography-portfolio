const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const authAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  // --- Start of Debugging Logs ---
  console.log('--- NEW LOGIN ATTEMPT ---');
  console.log(`Attempting login for email: ${email}`);
  console.log(`Password received: ${password}`);
  // --- End of Debugging Logs ---

  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
        console.log('Admin user was FOUND in the database.');
        console.log(`Stored Hashed Password is: ${admin.password}`);

        const isMatch = await admin.matchPassword(password);
        
        // --- Crucial Debugging Log ---
        console.log(`Result of password comparison (isMatch): ${isMatch}`);

        if (isMatch) {
            console.log('SUCCESS: Passwords matched!');
            res.json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id),
            });
        } else {
            console.log('FAILURE: Passwords did NOT match.');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        console.log('FAILURE: Admin user was NOT FOUND in the database.');
        res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('--- SEVERE ERROR DURING LOGIN PROCESS ---', error);
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