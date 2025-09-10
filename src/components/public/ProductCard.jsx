import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const whatsappUrl = product.whatsapp_link
    ? `https://wa.me/${product.whatsapp_link}?text=Hola, me interesa el curso "${product.name}".`
    : '#';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative h-56 overflow-hidden bg-gray-200">
        {product.images && product.images.length > 0 ? (
          <>
            <img 
              src={product.images[currentImageIndex].image_url} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={20} /></button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={20} /></button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-end mt-auto">
          {product.whatsapp_link && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md text-center transition-colors duration-200 shadow-md flex items-center gap-2">
              <WhatsAppIcon/>
              <span className="block text-sm">Más info</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;