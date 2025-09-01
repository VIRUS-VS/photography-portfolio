import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import VideoSection from '../components/VideoSection';
import GalleryModal from '../components/GalleryModal';

const HomePage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/galleries');
        setGalleries(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch galleries. Please try again later.');
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  // ... keep the top part of the file the same ...

  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|mov)$/) != null;
  }
  
  const openGalleryModal = (id) => setSelectedGalleryId(id);
  const closeGalleryModal = () => setSelectedGalleryId(null);

  return (
    <div>
      <HeroSection />
      <div id="about-section">
        <AboutSection />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-4xl font-light mb-12">Our Work</h2>
        {loading && <p className="text-center">Loading galleries...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <div 
              key={gallery._id} 
              className="group relative w-full h-80 overflow-hidden cursor-pointer"
              onClick={() => openGalleryModal(gallery._id)}
            >
              {gallery.coverImage ? (
                <>
                  {isVideo(gallery.coverImage) ? (
                    <video src={gallery.coverImage} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" autoPlay loop muted playsInline />
                  ) : (
                    <img src={gallery.coverImage} alt={gallery.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center"><p className="text-gray-500">No Image</p></div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-semibold">{gallery.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoSection />

      {selectedGalleryId && <GalleryModal galleryId={selectedGalleryId} onClose={closeGalleryModal} />}
    </div>
  );
};

export default HomePage;