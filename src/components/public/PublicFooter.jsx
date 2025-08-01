import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const PublicFooter = () => {
  const { siteSettings } = useData();

  const defaultMapUrl = "http://googleusercontent.com/maps.google.com/7";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img src={siteSettings.site_logo_url || ''} alt="Logo" className="h-24 w-auto" />
            </div>
            <p className="text-gray-300 mb-4">
              {siteSettings.footer_description}
            </p>
            <div className="flex space-x-4">
              {siteSettings.facebook_url && <a href={siteSettings.facebook_url} /* ... */><Facebook/></a>}
              {siteSettings.instagram_url && <a href={siteSettings.instagram_url} /* ... */><Instagram/></a>}
              {siteSettings.tiktok_url && <a href={siteSettings.tiktok_url} /* ... */><TikTokIcon /></a>}
              {siteSettings.youtube_url && <a href={siteSettings.youtube_url} /* ... */><Youtube/></a>}
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
          <p className="text-gray-400">
            {siteSettings.footer_copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
export default PublicFooter;