import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import logo from '../../assets/logo.png'; // Asegúrate de tener el logo en src/assets/logo.png

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { siteSettings } = useData();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Menú', href: '/menu' },
  ];

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Wolf's Burger Logo" className="h-20 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation - MEJORADA */}
          <nav className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-semibold tracking-wide transition-colors duration-300 relative group pb-1 ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-base-content hover:text-primary'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-center ${
                    location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
             <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-accent" />
              <span className="font-medium">{siteSettings.contact_phone}</span>
            </div>
             <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-accent" />
              <span className="font-medium">{siteSettings.address}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="px-4 flex flex-col items-center space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-700 hover:text-primary">
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t w-full text-center space-y-2">
                <div className="flex items-center justify-center text-gray-600"><Phone className="h-4 w-4 mr-2 text-primary"/>{siteSettings.contact_phone}</div>
                <div className="flex items-center justify-center text-gray-600"><MapPin className="h-4 w-4 mr-2 text-primary"/>{siteSettings.address}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;