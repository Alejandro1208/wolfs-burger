import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const HeroBanner = () => {
  const { banners } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="relative h-screen bg-gray-700 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Wolf's Burger</h1>
          <p className="text-xl md:text-2xl">Las mejores hamburguesas de la ciudad</p>
        </div>
      </div>
    );
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={banner.image_url} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Wolf's Burger</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow">Descubre el sabor auténtico de nuestras hamburguesas artesanales.</p>
          {/* DIV CORREGIDO PARA ESPACIADO EN MÓVIL */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/menu" className="btn-solid-red">Ver Menú</Link>
            <a href="https://pedidosya.com.ar" target="_blank" rel="noopener noreferrer" className="btn-outline-white">Pedir Ahora</a>
          </div>
        </div>
      </div>
      {banners.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"><ChevronLeft size={28}/></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"><ChevronRight size={28}/></button>
        </>
      )}
    </div>
  );
};

export default HeroBanner;