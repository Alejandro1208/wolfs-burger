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
  <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="7 1 50 60" width="20px" height="20px"><path d="M40.227,12C51.146,12,52,12.854,52,23.773v16.453C52,51.145,51.146,52,40.227,52H23.773C12.855,52,12,51.145,12,40.227	V23.773C12,12.854,12.855,12,23.773,12H40.227z M42.732,29.737v-4.196c0,0-2.218,0.011-4.091-1.705	c-1.574-1.442-1.705-4.143-1.705-4.143h-4.196c0,0,0,14.318,0,16.6c0,2.281-1.985,3.462-3.409,3.462	c-1.073,0-3.514-0.841-3.514-3.488c0-2.778,2.806-3.488,3.54-3.488c0.734,0,1.023,0.157,1.023,0.157v-4.429	c0,0-0.682-0.065-1.18-0.082c-4.235-0.143-7.736,3.657-7.736,7.841c0,3.535,2.765,7.815,7.815,7.815	c5.379,0,7.841-4.486,7.841-7.789c0-2.413,0-8.234,0-8.234s1.547,0.865,2.806,1.259C41.185,29.711,42.732,29.737,42.732,29.737z"/></svg>
);
export default PublicFooter;