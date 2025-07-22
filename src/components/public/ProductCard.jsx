import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import pedidosyaLogo from '../../assets/pedidosya-logo.png';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault(); // Evita que el enlace del contenedor se active
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault(); // Evita que el enlace del contenedor se active
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover flex flex-col">
      {/* Carrusel de Imágenes */}
      <div className="relative h-56 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <>
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-full object-cover" />
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-all"><ChevronLeft size={20} /></button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-all"><ChevronRight size={20} /></button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-400">Sin imagen</span></div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium mb-2 self-start">{product.category_name}</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-bold text-primary">{formatPrice(product.price)}</div>
          <a href={product.pedidosya_link} target="_blank" rel="noopener noreferrer" className="bg-[#ec2f42] hover:bg-[#c5273a] text-white font-semibold py-2 px-3 rounded-md text-center transition-colors duration-200 shadow-md">
            <span className="block text-xs">Pedir en</span>
            <img src={pedidosyaLogo} alt="PedidosYa" className="h-5 w-auto mx-auto" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;