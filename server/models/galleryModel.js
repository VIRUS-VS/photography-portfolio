// const mongoose = require('mongoose');
// const gallerySchema = mongoose.Schema({ title: { type: String, required: true }, description: { type: String, required: true }, coverImage: { type: String, required: true } }, { timestamps: true });
// const Gallery = mongoose.model('Gallery', gallerySchema);
// module.exports = Gallery;


// In backend/models/galleryModel.js
// Use require instead of import
const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String },
  youtubeLink: { type: String },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

// Use module.exports instead of export default
module.exports = Gallery;