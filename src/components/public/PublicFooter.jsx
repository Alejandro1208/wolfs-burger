import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import staticLogo from '../../assets/logo.png';

const PublicFooter = () => {
  const { siteSettings } = useData();

  const defaultMapUrl = "http://googleusercontent.com/maps.google.com/7";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src={siteSettings.site_logo_url || staticLogo} 
                alt="Wolf's Burger Logo" 
                className="h-24 w-auto"
              />
            </div>
            {/* TEXTO DE DESCRIPCIÓN DINÁMICO */}
            <p className="text-gray-300 mb-4">
              {siteSettings.footer_description || 'Las mejores hamburguesas artesanales de la ciudad. Ingredientes frescos, sabores únicos y la mejor atención.'}
            </p>
            <div className="flex space-x-4">
              <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center"><MapPin className="h-5 w-5 mr-3 text-primary" /><span className="text-gray-300">{siteSettings.address}</span></div>
              <div className="flex items-center"><Phone className="h-5 w-5 mr-3 text-primary" /><span className="text-gray-300">{siteSettings.contact_phone}</span></div>
              <div className="flex items-center"><Mail className="h-5 w-5 mr-3 text-primary" /><span className="text-gray-300">{siteSettings.contact_email}</span></div>
              <div className="flex items-center"><Clock className="h-5 w-5 mr-3 text-primary" /><span className="text-gray-300">{siteSettings.hours}</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden h-48">
              <iframe
                src={siteSettings.Maps_url || defaultMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={"Ubicación de Wolf's Burger"}
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          {/* TEXTO DE COPYRIGHT DINÁMICO */}
          <p className="text-gray-400">
            {siteSettings.footer_copyright || '© 2024 Wolf\'s Burger. Todos los derechos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default PublicFooter;