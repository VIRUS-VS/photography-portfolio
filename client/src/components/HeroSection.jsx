import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const HeroSection = () => {
  const { settings, loading } = useSiteSettings();

  if (loading) return <div className="h-screen flex items-center justify-center"><p>Loading...</p></div>;

  const backgroundImageUrl = settings?.heroImage 
    ? settings.heroImage
    : 'https://images.unsplash.com/photo-1502675133333-3a0e82071962?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-thin tracking-widest uppercase mb-4">
          {settings?.heroTitle || "Capturing Stories"}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300">
          {settings?.heroSubtitle || '"Editing is not just a technical process, but an art of storytelling."'}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;