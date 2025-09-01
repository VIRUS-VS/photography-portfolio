const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  // We use a singleton pattern with a fixed name
  name: {
    type: String,
    required: true,
    default: 'siteSettings',
    unique: true,
  },
  heroImage: { type: String },
  aboutImage1: { type: String },
  aboutImage2: { type: String },
  videoUrl: { type: String },
  heroTitle: { type: String },
  heroSubtitle: { type: String },
  aboutTitle: { type: String },
  aboutText: { type: String },
  videoTitle: { type: String },
  videoText: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  instagramUrl: { type: String },
  facebookUrl: { type: String },
  twitterUrl: { type: String },
}, {
  timestamps: true,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;