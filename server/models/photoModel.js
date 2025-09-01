const mongoose = require('mongoose');

const photoSchema = mongoose.Schema(
  {
    gallery: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Gallery', // This creates a reference to the Gallery model
    },
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;