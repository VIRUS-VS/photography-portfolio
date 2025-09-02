const mongoose = require('mongoose');
const photoSchema = mongoose.Schema({ gallery: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Gallery' }, imageUrl: { type: String, required: true }, caption: { type: String } }, { timestamps: true });
const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;