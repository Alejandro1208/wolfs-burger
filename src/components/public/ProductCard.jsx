import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

// Recibe la nueva prop 'onCardClick'
const ProductCard = ({ product, onCardClick }) => { 
  const { siteSettings } = useData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que se abra el modal al hacer clic en las flechas
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que se abra el modal al hacer clic en las flechas
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  return (
    // Envolvemos todo en un div clicable que llama a onCardClick
    <div 
      onClick={() => onCardClick(product)} 
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
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

        {/* La descripción ahora siempre está cortada, ya que el detalle se ve en el modal */}
        <p className="whitespace-pre-wrap text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto pt-4 space-y-3">
          <div className="text-2xl font-bold text-primary text-right">
            {formatPrice(product.price)}
          </div>

          {product.pedidosya_link && (
            <a 
              href={product.pedidosya_link} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()} // Evita que se abra el modal al hacer clic en el botón
              style={{
                backgroundColor: siteSettings.pedidosya_button_bg,
                color: siteSettings.pedidosya_button_text_color
              }}
              className="font-semibold py-2 px-3 rounded-md text-center transition-colors duration-200 shadow-md flex items-center justify-center gap-1.5 w-full"
            >
              {siteSettings.pedidosya_button_icon && (
                <span 
                  style={{ color: siteSettings.pedidosya_button_text_color }}
                  dangerouslySetInnerHTML={{ __html: siteSettings.pedidosya_button_icon }}
                />
              )}
              <span>Pedir Ahora</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;