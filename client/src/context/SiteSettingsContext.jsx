import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SiteSettingsContext = createContext();

export const useSiteSettings = () => {
  return useContext(SiteSettingsContext);
};

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
        setSettings(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const value = {
    settings,
    loading,
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};