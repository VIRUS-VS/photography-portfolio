// const mongoose = require('mongoose');
// const gallerySchema = mongoose.Schema({ title: { type: String, required: true }, description: { type: String, required: true }, coverImage: { type: String, required: true } }, { timestamps: true });
// const Gallery = mongoose.model('Gallery', gallerySchema);
// module.exports = Gallery;


// In backend/models/galleryModel.js
import mongoose from 'mongoose';

const gallerySchema = mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String }, // <-- ADD THIS LINE
  youtubeLink: { type: String }, // <-- ADD THIS LINE
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;