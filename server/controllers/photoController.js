const Photo = require('../models/photoModel');
const Gallery = require('../models/galleryModel');
const cloudinary = require('cloudinary').v2;

// @desc    Upload photos to a specific gallery
// @route   POST /api/photos/:galleryId
// @access  Private/Admin
const uploadPhotos = async (req, res) => {
  const { galleryId } = req.params;
  
  try {
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    if (req.files && req.files.length > 0) {
      const photos = req.files.map(file => ({
        gallery: galleryId,
        imageUrl: file.path, // Cloudinary provides a full URL
      }));

      const createdPhotos = await Photo.insertMany(photos);
      res.status(201).json(createdPhotos);
    } else {
      res.status(400).json({ message: 'No files uploaded' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all photos for a specific gallery
// @route   GET /api/photos/:galleryId
// @access  Public
const getPhotosForGallery = async (req, res) => {
  const { galleryId } = req.params;
  try {
    const photos = await Photo.find({ gallery: galleryId });
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a single photo
// @route   DELETE /api/photos/:id
// @access  Private/Admin
const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (photo) {
            // Extract the public_id from the full Cloudinary URL
            const urlParts = photo.imageUrl.split('/');
            const publicIdWithExtension = urlParts[urlParts.length - 1];
            const publicId = `portfolio_uploads/${publicIdWithExtension.split('.')[0]}`;
            
            // Delete the file from Cloudinary
            await cloudinary.uploader.destroy(publicId);
            
            // Delete the photo record from the database
            await photo.deleteOne();
            res.json({ message: 'Photo removed' });
        } else {
            res.status(404).json({ message: 'Photo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { uploadPhotos, getPhotosForGallery, deletePhoto };