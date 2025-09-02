const Settings = require('../models/settingsModel');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ name: 'siteSettings' });
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const updateSettings = async (req, res) => {
  try {
    res.json(await Settings.findOneAndUpdate({ name: 'siteSettings' }, req.body, { new: true, upsert: true }));
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { getSettings, updateSettings };