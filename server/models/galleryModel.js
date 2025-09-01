const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: { // New field for the cover image/video URL
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;