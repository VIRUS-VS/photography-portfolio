const Gallery = require('../models/galleryModel');
const Photo = require('../models/photoModel');
const cloudinary = require('cloudinary').v2;

const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) res.json(gallery);
    else res.status(404).json({ message: 'Gallery not found' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const createGallery = async (req, res) => {
  const { title, description, coverImage } = req.body;
  try {
    const createdGallery = await Gallery.create({ title, description, coverImage });
    res.status(201).json(createdGallery);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const getGalleries = async (req, res) => {
  try { res.json(await Gallery.find({})); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) {
      if (gallery.coverImage) {
        const publicId = `portfolio_uploads/${gallery.coverImage.split('/').pop().split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
      }
      const photos = await Photo.find({ gallery: gallery._id });
      for (const photo of photos) {
        const photoPublicId = `portfolio_uploads/${photo.imageUrl.split('/').pop().split('.')[0]}`;
        await cloudinary.uploader.destroy(photoPublicId);
      }
      await Photo.deleteMany({ gallery: gallery._id });
      await gallery.deleteOne();
      res.json({ message: 'Gallery and all contents removed' });
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { createGallery, getGalleries, deleteGallery, getGalleryById };