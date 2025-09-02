const mongoose = require('mongoose');
const settingsSchema = mongoose.Schema({ name: { type: String, required: true, default: 'siteSettings', unique: true }, heroImage: String, aboutImage1: String, aboutImage2: String, videoUrl: String, heroTitle: String, heroSubtitle: String, aboutTitle: String, aboutText: String, videoTitle: String, videoText: String, contactEmail: String, contactPhone: String, instagramUrl: String, facebookUrl: String, twitterUrl: String }, { timestamps: true });
const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;