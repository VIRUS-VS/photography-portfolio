import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
const SiteSettingsContext = createContext();
export const useSiteSettings = () => useContext(SiteSettingsContext);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return <SiteSettingsContext.Provider value={{ settings, loading }}>{children}</SiteSettingsContext.Provider>;
};
