import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageGalleryPage from './pages/ManageGalleryPage';
import SiteSettingsPage from './pages/SiteSettingsPage';
import AdminProfilePage from './pages/AdminProfilePage';
import { SiteSettingsProvider } from './context/SiteSettingsContext';

function App() {
  return (
    <SiteSettingsProvider>
      <Router>
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/gallery/:id" element={<ManageGalleryPage />} />
              <Route path="/admin/settings" element={<SiteSettingsPage />} />
              <Route path="/admin/profile" element={<AdminProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SiteSettingsProvider>
  );
}

export default App;