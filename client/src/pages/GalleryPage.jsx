// In frontend/src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios'; // <-- 1. CHANGE THIS IMPORT

const GalleryPage = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        // 2. USE 'api' INSTEAD OF 'axios'
        const { data: galleryData } = await api.get(`/api/galleries/${id}`);
        setGallery(galleryData);

        const { data: photosData } = await api.get(`/api/photos/gallery/${id}`);
        setPhotos(photosData);

      } catch (error) {
        console.error("Failed to fetch gallery data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [id]);

  if (loading) return <p>Loading gallery...</p>;
  if (!gallery) return <p>Gallery not found.</p>;

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?=&|$)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : '';
  };

  return (
    <div className="container mx-auto p-8">
      <img src={gallery.coverImage} alt={gallery.title} className="w-full h-96 object-cover rounded-lg mb-8" />
      <h1 className="text-4xl font-bold mb-4">{gallery.title}</h1>
      <p className="text-lg text-gray-400 mb-12">{gallery.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {photos.map(photo => (
          <div key={photo._id} className="overflow-hidden rounded-lg">
            <img src={photo.imageUrl} alt="Gallery" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      {gallery.youtubeLink && getYouTubeEmbedUrl(gallery.youtubeLink) && (
        <div>
          <h2 className="text-3xl font-bold mb-4">Watch The Film</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={getYouTubeEmbedUrl(gallery.youtubeLink)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;