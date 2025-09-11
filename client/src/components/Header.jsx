import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    setIsOpen(false); // Close mobile menu on click
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="py-6 px-4 absolute top-0 left-0 w-full z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-thin tracking-widest uppercase text-white">
          LUXE VOWS
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('work-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">Work</button>
          <button onClick={() => scrollToSection('about-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">About</button>
          <button onClick={() => scrollToSection('contact-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">Contact</button>
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 mt-2">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <button onClick={() => scrollToSection('work-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">Work</button>
            <button onClick={() => scrollToSection('about-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">About</button>
            <button onClick={() => scrollToSection('contact-section')} className="tracking-wider uppercase text-sm text-gray-300 hover:text-white transition">Contact</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;