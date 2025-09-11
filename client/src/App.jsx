import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageGalleryPage from './pages/ManageGalleryPage';
import SiteSettingsPage from './pages/SiteSettingsPage';
import AdminProfilePage from './pages/AdminProfilePage';
import { SiteSettingsProvider } from './context/SiteSettingsContext';

// A small helper component to add padding on non-home pages
const PageLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Only add top padding if it's NOT the homepage
  const layoutClass = isHomePage ? '' : 'pt-24 container mx-auto px-4';

  return <div className={layoutClass}>{children}</div>;
};

function App() {
  return (
    <SiteSettingsProvider>
      <Router>
        <div className="bg-[#3C1D1D] text-[#E2B842] min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/login" element={<PageLayout><AdminLoginPage /></PageLayout>} />
              <Route path="/admin/dashboard" element={<PageLayout><AdminDashboardPage /></PageLayout>} />
              <Route path="/admin/gallery/:id" element={<PageLayout><ManageGalleryPage /></PageLayout>} />
              <Route path="/admin/settings" element={<PageLayout><SiteSettingsPage /></PageLayout>} />
              <Route path="/admin/profile" element={<PageLayout><AdminProfilePage /></PageLayout>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SiteSettingsProvider>
  );
}

export default App;