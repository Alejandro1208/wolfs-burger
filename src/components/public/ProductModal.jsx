import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ProductModal = ({ product, onClose }) => {
    const { siteSettings } = useData();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!product) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
        }).format(price);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full md:w-1/2 bg-gray-100 relative">
                    {product.images && product.images.length > 0 ? (
                        <>
                            <img src={product.images[currentImageIndex].image_url} alt={product.name} className="w-full h-64 md:h-full object-cover"/>
                            {product.images.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"><ChevronLeft size={24} /></button>
                                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"><ChevronRight size={24} /></button>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-64 md:h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black transition"><X size={24}/></button>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <span className="text-sm font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mb-4 self-start">{product.category_name}</span>

                    <p className="whitespace-pre-wrap text-gray-700 mb-6 flex-grow">{product.description}</p>

                    <div className="mt-auto">
                        <div className="text-3xl font-bold text-primary text-right mb-4">
                            {formatPrice(product.price)}
                        </div>

                        {product.pedidosya_link && (
                            <a 
                            href={product.pedidosya_link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{
                                backgroundColor: siteSettings.pedidosya_button_bg,
                                color: siteSettings.pedidosya_button_text_color
                            }}
                            className="font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-200 shadow-md flex items-center justify-center gap-2 w-full"
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
        </div>
    );
};

export default ProductModal;