import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const HeroBanner = () => {
  const { banners, heroContent, loading } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!banners || banners.length < 2) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (loading) {
    return <div className="h-screen bg-gray-200 animate-pulse"></div>;
  }
  
  return (
    <div className="relative h-screen overflow-hidden bg-gray-900">
      <div className="h-full">
        {banners && banners.length > 0 ? (
            banners.map((banner, index) => (
              <div
                key={banner.id || index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={banner.image_url} alt={banner.alt_text} className="w-full h-full object-cover" />
              </div>
            ))
        ) : (
            <div className="absolute inset-0 bg-gray-700"></div> // Fondo si no hay imágenes
        )}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-white px-4">
        {heroContent && (
            <div className="animate-fade-in space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">{heroContent.title}</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow">{heroContent.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {heroContent.cta1_text && heroContent.cta1_link && (
                    <Link to={heroContent.cta1_link} className="btn-solid-red text-lg">
                        {heroContent.cta1_text}
                    </Link>
                )}
                {heroContent.cta2_text && heroContent.cta2_link && (
                    <a href={heroContent.cta2_link} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-lg">
                        {heroContent.cta2_text}
                    </a>
                )}
              </div>
            </div>
        )}
      </div>

      {banners && banners.length > 1 && (
        <>
          <button onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:opacity-75 transition"><ChevronLeft size={32}/></button>
          <button onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:opacity-75 transition"><ChevronRight size={32}/></button>
        </>
      )}
    </div>
  );
};

export default HeroBanner;