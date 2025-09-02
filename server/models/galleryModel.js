const mongoose = require('mongoose');
const gallerySchema = mongoose.Schema({ title: { type: String, required: true }, description: { type: String, required: true }, coverImage: { type: String, required: true } }, { timestamps: true });
const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;