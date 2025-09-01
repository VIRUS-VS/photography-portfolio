const Settings = require('../models/settingsModel');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    // Find the single settings document, or create it if it doesn't exist
    let settings = await Settings.findOne({ name: 'siteSettings' });
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { name: 'siteSettings' },
      req.body, // The body will contain the fields to update
      { new: true, upsert: true } // 'new' returns the updated doc, 'upsert' creates it if it doesn't exist
    );
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getSettings, updateSettings };