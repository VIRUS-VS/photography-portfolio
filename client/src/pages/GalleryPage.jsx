import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // CORRECT: Import axios directly

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
        // Use the environment variable for the live API URL
        const galleryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`);
        const photosRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${id}`);
        setGallery(galleryRes.data);
        setPhotos(photosRes.data);
      } catch (err) {
        setError('Could not fetch gallery details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryAndPhotos();
  }, [id]);
  
  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|mov)$/);
  }

  if (loading) return <p className="text-center pt-24">Loading gallery...</p>;
  if (error) return <p className="text-center text-red-500 pt-24">{error}</p>;

  return (
    <div className="pt-24 container mx-auto px-4"> 
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to all work</Link>
        <h1 className="text-4xl font-light mb-4">{gallery?.title}</h1>
        <p className="text-gray-400 leading-relaxed">{gallery?.description}</p>
      </div>

      {/* Photo Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {photos.map((photo) => (
          <div key={photo._id} className="mb-4 break-inside-avoid">
             {isVideo(photo.imageUrl) ? (
              <video
                src={photo.imageUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={photo.imageUrl}
                alt={photo.caption || gallery?.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;