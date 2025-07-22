import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const PublicFooter = () => {
  const { siteSettings } = useData();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="text-2xl font-bold text-gradient mb-4">
              🍔 Burger House
            </div>
            <p className="text-gray-300 mb-4">
              Las mejores hamburguesas artesanales de la ciudad. Ingredientes frescos, 
              sabores únicos y la mejor atención.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteSettings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-primary-500" />
                <span className="text-gray-300">{siteSettings.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary-500" />
                <span className="text-gray-300">{siteSettings.contact_phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary-500" />
                <span className="text-gray-300">{siteSettings.contact_email}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary-500" />
                <span className="text-gray-300">{siteSettings.hours}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168903919!2d-58.38375908477!3d-34.60373098045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb9f8ff113%3A0x22fd0f8c6cc4d1c7!2sAv.%20Corrientes%201234%2C%20C1043%20CABA!5e0!3m2!1ses!2sar!4v1635789012345!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Burger House"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Burger House. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;