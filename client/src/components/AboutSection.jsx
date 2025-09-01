import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const AboutSection = () => {
    const { settings, loading } = useSiteSettings();

    if (loading) return null;

    const aboutImage1 = settings?.aboutImage1 ? settings.aboutImage1 : "https://images.unsplash.com/photo-1598043596283-8873a1139b4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const aboutImage2 = settings?.aboutImage2 ? settings.aboutImage2 : "https://images.unsplash.com/photo-1616684534720-3398d523826a?q=80&w=2803&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-thin mb-4 tracking-wider">{settings?.aboutTitle || "A MODERN APPROACH"}</h2>
          <p className="text-gray-400 leading-relaxed">
            {settings?.aboutText || "Considered to be the epitome of Modern Photo & Videography, our studio has transformed the landscape on a regular basis."}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={aboutImage1} alt="Studio shot 1" className="rounded-lg object-cover w-full h-64" />
          <img src={aboutImage2} alt="Studio shot 2" className="rounded-lg object-cover w-full h-64 mt-8" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;