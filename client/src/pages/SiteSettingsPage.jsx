import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import heic2any from 'heic2any';

const SiteSettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({});

  const adminInfo = useMemo(() => JSON.parse(localStorage.getItem('adminInfo')), []);

  useEffect(() => {
    if (!adminInfo) navigate('/admin/login');
    else {
      const fetchSettings = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
          setSettings(data);
        } catch (err) {
          setError('Could not fetch settings.');
        } finally {
          setLoading(false);
        }
      };
      fetchSettings();
    }
  }, [adminInfo, navigate]);

  const handleInputChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });

  const uploadFileHandler = async (e) => {
    let file = e.target.files[0];
    const fieldName = e.target.name;
    if (!file) return;
    setUploading(true);
    try {
      if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
        const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
        file = new File([convertedBlob], `${file.name.split('.')[0]}.jpeg`, { type: 'image/jpeg' });
      }
      const formData = new FormData();
      formData.append('image', file);
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${adminInfo.token}` } };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, config);
      setSettings(prev => ({ ...prev, [fieldName]: data.image }));
    } catch (error) {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` } };
      await axios.put(`${import.meta.env.VITE_API_URL}/api/settings`, settings, config);
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Failed to update settings.');
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="pt-24 container mx-auto px-4">
      <Link to="/admin/dashboard" className="text-blue-400 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-light mb-6">Site Settings</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={submitHandler} className="space-y-8">
        <div className="p-4 border border-gray-700 rounded">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div><label className="block text-sm mb-1">Hero Title</label><input type="text" name="heroTitle" value={settings.heroTitle || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">Hero Subtitle</label><textarea name="heroSubtitle" value={settings.heroSubtitle || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" rows="3"></textarea></div>
            <div><label className="block text-sm mb-1">Hero Background Image</label><input type="file" name="heroImage" onChange={uploadFileHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700" />{settings.heroImage && <img src={settings.heroImage} alt="Hero preview" className="mt-2 h-20 object-cover" />}</div>
          </div>
        </div>
        <div className="p-4 border border-gray-700 rounded">
          <h2 className="text-xl font-semibold mb-4">About Section</h2>
          <div className="space-y-4">
            <div><label className="block text-sm mb-1">About Title</label><input type="text" name="aboutTitle" value={settings.aboutTitle || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">About Text</label><textarea name="aboutText" value={settings.aboutText || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" rows="3"></textarea></div>
            <div><label className="block text-sm mb-1">About Image 1</label><input type="file" name="aboutImage1" onChange={uploadFileHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700" />{settings.aboutImage1 && <img src={settings.aboutImage1} alt="About 1 preview" className="mt-2 h-20 object-cover" />}</div>
            <div><label className="block text-sm mb-1">About Image 2</label><input type="file" name="aboutImage2" onChange={uploadFileHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700" />{settings.aboutImage2 && <img src={settings.aboutImage2} alt="About 2 preview" className="mt-2 h-20 object-cover" />}</div>
          </div>
        </div>
        <div className="p-4 border border-gray-700 rounded">
          <h2 className="text-xl font-semibold mb-4">Video Section</h2>
          <div className="space-y-4">
            <div><label className="block text-sm mb-1">Video Title</label><input type="text" name="videoTitle" value={settings.videoTitle || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">Video Text</label><textarea name="videoText" value={settings.videoText || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" rows="3"></textarea></div>
            <div><label className="block text-sm mb-1">Background Video</label><input type="file" name="videoUrl" onChange={uploadFileHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700" />{settings.videoUrl && <p className="text-xs text-gray-400 mt-1">{settings.videoUrl}</p>}</div>
          </div>
        </div>
        <div className="p-4 border border-gray-700 rounded">
          <h2 className="text-xl font-semibold mb-4">Footer & Contact</h2>
          <div className="space-y-4">
            <div><label className="block text-sm mb-1">Contact Email</label><input type="email" name="contactEmail" value={settings.contactEmail || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">Contact Phone</label><input type="text" name="contactPhone" value={settings.contactPhone || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">Instagram URL</label><input type="text" name="instagramUrl" value={settings.instagramUrl || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">Facebook URL</label><input type="text" name="facebookUrl" value={settings.facebookUrl || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
            <div><label className="block text-sm mb-1">Twitter URL</label><input type="text" name="twitterUrl" value={settings.twitterUrl || ''} onChange={handleInputChange} className="w-full p-2 bg-gray-800 rounded" /></div>
          </div>
        </div>
        {uploading && <p className="text-blue-400">Uploading...</p>}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">Save Settings</button>
      </form>
    </div>
  );
};
export default SiteSettingsPage;
