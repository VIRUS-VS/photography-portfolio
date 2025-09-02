import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="py-6 px-4 absolute top-0 left-0 w-full z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-thin tracking-widest uppercase text-white">Editor's Portfolio</Link>
        <nav className="flex items-center space-x-8">
          <button onClick={() => scrollToSection('work-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">Work</button>
          <button onClick={() => scrollToSection('about-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">About</button>
          <button onClick={() => scrollToSection('contact-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">Contact</button>
        </nav>
      </div>
    </header>
  );
};
export default Header;