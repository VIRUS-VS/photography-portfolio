import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GalleryPage = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryAndPhotos = async () => {
      try {
        setLoading(true);
        // Fetch both the gallery details and the photos for that gallery
        const galleryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`);
        const photosRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${id}`);
        
        setGallery(galleryRes.data);
        setPhotos(photosRes.data);
      } catch (err) {
        setError('Could not fetch gallery details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryAndPhotos();
  }, [id]);
  
  const isVideo = (url) => {
    if (!url) return false;
    // Use a simple regex to check for video file extensions
    return /\.(mp4|mov|avi|wmv)$/i.test(url);
  }

  if (loading) return <p className="text-center pt-24">Loading gallery...</p>;
  if (error) return <p className="text-center text-red-500 pt-24">{error}</p>;

  return (
    <div className="pt-24 container mx-auto px-4"> 
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Link to="/" className="text-gray-400 hover:text-white transition mb-4 inline-block">&larr; Back to all work</Link>
        <h1 className="text-4xl font-light mb-4">{gallery?.title}</h1>
        <p className="text-gray-400 leading-relaxed">{gallery?.description}</p>
      </div>

      {/* Masonry-style Photo Grid */}
      {photos.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="mb-4 break-inside-avoid">
               {isVideo(photo.imageUrl) ? (
                <video
                  src={photo.imageUrl} // Use the full Cloudinary URL directly
                  controls
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <img
                  src={photo.imageUrl} // Use the full Cloudinary URL directly
                  alt={photo.caption || gallery?.title}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No photos have been uploaded to this gallery yet.</p>
      )}
    </div>
  );
};

export default GalleryPage;