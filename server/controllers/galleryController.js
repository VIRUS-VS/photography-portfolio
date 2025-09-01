const Gallery = require('../models/galleryModel');
const Photo = require('../models/photoModel');
const cloudinary = require('cloudinary').v2;

// @desc    Get a single gallery by ID
// @route   GET /api/galleries/:id
// @access  Public
const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) {
      res.json(gallery);
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new gallery
// @route   POST /api/galleries
// @access  Private/Admin
const createGallery = async (req, res) => {
  const { title, description, coverImage } = req.body;
  try {
    const gallery = new Gallery({ title, description, coverImage });
    const createdGallery = await gallery.save();
    res.status(201).json(createdGallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all galleries
// @route   GET /api/galleries
// @access  Public
const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({});
    res.json(galleries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a gallery (and all its contents from Cloudinary)
// @route   DELETE /api/galleries/:id
// @access  Private/Admin
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (gallery) {
      // 1. Delete the cover image from Cloudinary if it exists
      if (gallery.coverImage) {
        const urlParts = gallery.coverImage.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = `portfolio_uploads/${publicIdWithExtension.split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
      }

      // 2. Find all photos in this gallery
      const photos = await Photo.find({ gallery: gallery._id });
      
      // 3. Delete all photo files from Cloudinary
      for (const photo of photos) {
        const photoUrlParts = photo.imageUrl.split('/');
        const photoPublicIdWithExtension = photoUrlParts[photoUrlParts.length - 1];
        const photoPublicId = `portfolio_uploads/${photoPublicIdWithExtension.split('.')[0]}`;
        await cloudinary.uploader.destroy(photoPublicId);
      }
      
      // 4. Delete all photo documents from the database
      await Photo.deleteMany({ gallery: gallery._id });
      
      // 5. Delete the gallery document itself
      await gallery.deleteOne();
      
      res.json({ message: 'Gallery and all its contents removed' });
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createGallery, getGalleries, deleteGallery, getGalleryById };