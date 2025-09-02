import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryModal = ({ galleryId, onClose }) => {
  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fetchGalleryAndPhotos = async () => {
      try {
        const galleryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries/${galleryId}`);
        const photosRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${galleryId}`);
        setGallery(galleryRes.data);
        setPhotos(photosRes.data);
        setLoading(false);
      } catch (err) { setLoading(false); }
    };
    fetchGalleryAndPhotos();
    return () => { document.body.style.overflow = 'unset'; };
  }, [galleryId]);

  const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
  const isVideo = (url) => url && url.match(/\.(mp4|mov)$/);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-5xl z-50">&times;</button>
      {loading ? <p className="text-white">Loading...</p> : photos.length > 0 ? (
        <div className="relative flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
          <button onClick={goToPrevious} className="absolute left-4 md:left-8 text-white text-4xl z-50 p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 transition">&#10094;</button>
          <button onClick={goToNext} className="absolute right-4 md:right-8 text-white text-4xl z-50 p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 transition">&#10095;</button>
          <div className="relative max-w-3xl max-h-[90vh]">
            {isVideo(photos[currentIndex].imageUrl) ? <video src={photos[currentIndex].imageUrl} controls autoPlay className="max-w-full max-h-[90vh]" key={photos[currentIndex]._id} /> : <img src={photos[currentIndex].imageUrl} alt={`${gallery.title} - ${currentIndex + 1}`} className="max-w-full max-h-[90vh] object-contain" />}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">{gallery.title} ({currentIndex + 1} / {photos.length})</div>
          </div>
        </div>
      ) : (
         <div className="text-white text-center"><h2 className="text-2xl mb-2">{gallery?.title}</h2><p>No photos have been uploaded to this gallery yet.</p></div>
      )}
    </div>
  );
};
export default GalleryModal;