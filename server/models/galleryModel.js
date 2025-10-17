// const mongoose = require('mongoose');

// const gallerySchema = mongoose.Schema({
//   title: { type: String, required: true },
//   coverImage: { type: String, required: true },
//   description: { type: String },
//   youtubeLink: { type: String },
// }, { timestamps: true });

// const Gallery = mongoose.model('Gallery', gallerySchema);

// // Use module.exports instead of export default
// module.exports = Gallery;


const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String },
  youtubeLink: { type: String },
  // --- ADD THIS LINE ---
  credits: { type: String }, // For storing info like "Wedding Planner: John Doe"
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;