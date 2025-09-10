import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ProductCard = ({ product }) => {
  const { siteSettings } = useData();
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

  const whatsappUrl = product.pedidosya_link
    ? `https://wa.me/${product.pedidosya_link}?text=Hola, me interesa el curso "${product.name}".`
    : '#';

  const buttonText = siteSettings.product_btn_text || 'Más info';
  const buttonBgColor = siteSettings.product_btn_bg_color || '#22c55e';
  const buttonTextColor = siteSettings.product_btn_text_color || '#FFFFFF';
  const buttonIcon = siteSettings.product_btn_icon || '';

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
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold mb-2 self-start">{product.category_name}</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{product.description}</p>
        
        <div className="flex justify-end mt-auto">
          {product.pedidosya_link && (
            <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor
                }}
                className="font-semibold py-2 px-3 rounded-md text-center transition-colors duration-200 shadow-md flex items-center gap-2"
            >
              {buttonIcon && (
                  <span dangerouslySetInnerHTML={{ __html: buttonIcon }} />
              )}
              <span>{buttonText}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;