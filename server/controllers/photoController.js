const Photo = require('../models/photoModel');
const Gallery = require('../models/galleryModel'); // This is the corrected line
const cloudinary = require('cloudinary').v2;

// ... the rest of the file remains the same ...

const uploadPhotos = async (req, res) => {
  const { galleryId } = req.params;
  try {
    if (!await Gallery.findById(galleryId)) return res.status(404).json({ message: 'Gallery not found' });
    if (req.files?.length > 0) {
      const photos = req.files.map(file => ({ gallery: galleryId, imageUrl: file.path }));
      res.status(201).json(await Photo.insertMany(photos));
    } else {
      res.status(400).json({ message: 'No files uploaded' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const getPhotosForGallery = async (req, res) => {
  try { res.json(await Photo.find({ gallery: req.params.galleryId })); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (photo) {
      const publicId = `portfolio_uploads/${photo.imageUrl.split('/').pop().split('.')[0]}`;
      await cloudinary.uploader.destroy(publicId);
      await photo.deleteOne();
      res.json({ message: 'Photo removed' });
    } else {
      res.status(404).json({ message: 'Photo not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { uploadPhotos, getPhotosForGallery, deletePhoto };

//new code