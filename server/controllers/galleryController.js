// const Gallery = require('../models/galleryModel');
// const Photo = require('../models/photoModel');
// const cloudinary = require('cloudinary').v2;

// const getGalleryById = async (req, res) => {
//   try {
//     const gallery = await Gallery.findById(req.params.id);
//     if (gallery) res.json(gallery);
//     else res.status(404).json({ message: 'Gallery not found' });
//   } catch (error) { res.status(500).json({ message: 'Server Error' }); }
// };

// const createGallery = async (req, res) => {
//   // 1. Added youtubeLink to be extracted from the request body
//   const { title, description, coverImage, youtubeLink } = req.body;
//   try {
//     // 2. Added youtubeLink to the object when creating a new gallery
//     const createdGallery = await Gallery.create({ title, description, coverImage, youtubeLink });
//     res.status(201).json(createdGallery);
//   } catch (error) { res.status(500).json({ message: 'Server Error' }); }
// };

// const getGalleries = async (req, res) => {
//   try { res.json(await Gallery.find({})); }
//   catch (error) { res.status(500).json({ message: 'Server Error' }); }
// };

// const deleteGallery = async (req, res) => {
//   try {
//     const gallery = await Gallery.findById(req.params.id);
//     if (gallery) {
//       if (gallery.coverImage) {
//         const publicId = `portfolio_uploads/${gallery.coverImage.split('/').pop().split('.')[0]}`;
//         await cloudinary.uploader.destroy(publicId);
//       }
//       const photos = await Photo.find({ gallery: gallery._id });
//       for (const photo of photos) {
//         const photoPublicId = `portfolio_uploads/${photo.imageUrl.split('/').pop().split('.')[0]}`;
//         await cloudinary.uploader.destroy(photoPublicId);
//       }
//       await Photo.deleteMany({ gallery: gallery._id });
//       await gallery.deleteOne();
//       res.json({ message: 'Gallery and all contents removed' });
//     } else {
//       res.status(404).json({ message: 'Gallery not found' });
//     }
//   } catch (error) { res.status(500).json({ message: 'Server Error' }); }
// };

// // --- 3. NEW FUNCTION ADDED ---
// const updateGallery = async (req, res) => {
//   const { title, description, coverImage, youtubeLink } = req.body;
//   try {
//     const gallery = await Gallery.findById(req.params.id);

//     if (gallery) {
//       // Check if a new cover image is being uploaded and delete the old one
//       if (coverImage && gallery.coverImage && coverImage !== gallery.coverImage) {
//         const publicId = `portfolio_uploads/${gallery.coverImage.split('/').pop().split('.')[0]}`;
//         await cloudinary.uploader.destroy(publicId);
//       }

//       // Update gallery fields
//       gallery.title = title || gallery.title;
//       gallery.description = description || gallery.description;
//       gallery.coverImage = coverImage || gallery.coverImage;
//       gallery.youtubeLink = youtubeLink || gallery.youtubeLink;

//       const updatedGallery = await gallery.save();
//       res.json(updatedGallery);

//     } else {
//       res.status(404).json({ message: 'Gallery not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


// module.exports = {
//   createGallery,
//   getGalleries,
//   deleteGallery,
//   getGalleryById,
//   updateGallery // <-- 4. Export the new updateGallery function
// };


const Gallery = require('../models/galleryModel');
const Photo = require('../models/photoModel');
const cloudinary = require('cloudinary').v2;

// ... (getGalleryById and getGalleries functions remain the same) ...

const createGallery = async (req, res) => {
  // Add 'credits' to be extracted from the request body
  const { title, description, coverImage, youtubeLink, credits } = req.body;
  try {
    // Add 'credits' to the object when creating a new gallery
    const createdGallery = await Gallery.create({ title, description, coverImage, youtubeLink, credits });
    res.status(201).json(createdGallery);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const updateGallery = async (req, res) => {
  // Add 'credits' here
  const { title, description, coverImage, youtubeLink, credits } = req.body;
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (gallery) {
      // ... (logic for deleting old coverImage remains the same) ...

      // Update gallery fields
      gallery.title = title ?? gallery.title;
      gallery.description = description ?? gallery.description;
      gallery.coverImage = coverImage ?? gallery.coverImage;
      gallery.youtubeLink = youtubeLink ?? gallery.youtubeLink;
      gallery.credits = credits ?? gallery.credits; // <-- ADD THIS LINE

      const updatedGallery = await gallery.save();
      res.json(updatedGallery);
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ... (deleteGallery function remains the same) ...

module.exports = {
  createGallery,
  getGalleries,
  deleteGallery,
  getGalleryById,
  updateGallery 
};