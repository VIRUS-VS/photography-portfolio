import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const VideoSection = () => {
    const { settings, loading } = useSiteSettings();

    if (loading) return null;

    const videoUrl = settings?.videoUrl 
        ? settings.videoUrl 
        : "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4";

  return (
    <div className="relative h-[80vh] overflow-hidden flex items-center justify-center">
      <video
        src={videoUrl}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        key={videoUrl}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
      <div className="relative z-20 text-center text-white p-8 max-w-3xl">
        <div className="absolute -top-8 -bottom-8 left-8 right-8 border-2 border-white opacity-50 transform rotate-[-3deg]"></div>
        <div className="absolute -top-8 -bottom-8 left-8 right-8 border-2 border-white opacity-50 transform rotate-[3deg]"></div>

        <h2 className="text-5xl md:text-6xl font-thin tracking-widest uppercase mb-4">{settings?.videoTitle || "SOUL + CINEMA"}</h2>
        <p className="text-gray-300 leading-relaxed">
          {settings?.videoText || "Every story is unique and so are our films. For the past 8 years our studio has set new benchmarks of storytelling."}
        </p>
      </div>
    </div>
  );
};

export default VideoSection;