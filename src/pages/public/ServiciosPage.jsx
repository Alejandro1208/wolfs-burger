import React from 'react';
import { useData } from '../../contexts/DataContext';
import ProductCard from '../../components/public/ProductCard';

const ServiciosPage = () => {
    const { products, categories, loading, siteSettings } = useData();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sección Principal - Contenido editable desde el panel de admin */}
            <div className="bg-gray-900 text-white text-center py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        {siteSettings.services_main_title || 'Cursos de Manejo de Moto'}
                    </h1>
                    <p className="text-xl text-gray-300 drop-shadow">
                        {siteSettings.services_main_subtitle || 'Aprende a conducir de forma segura y certificada en nuestra pista habilitada en CABA.'}
                    </p>
                </div>
            </div>
            
            {/* Sección de Beneficios/Puntos Clave - Contenido editable desde el panel de admin */}
            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Tarjeta 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {siteSettings.services_card1_title || 'Pista Habilitada y Segura'}
                        </h2>
                        <p className="text-gray-600">
                            {siteSettings.services_card1_description || 'Practica con tu moto en un entorno controlado y seguro, sin exponerte a los riesgos de la calle. Contamos con todas las comodidades y medidas de seguridad necesarias.'}
                        </p>
                    </div>
                    
                    {/* Tarjeta 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {siteSettings.services_card2_title || 'Agenda tus Clases a tu Medida'}
                        </h2>
                        <p className="text-gray-600">
                            {siteSettings.services_card2_description || 'Nuestras clases se adaptan a tu horario. Elige la duración y la frecuencia que mejor se ajuste a tu disponibilidad.'}
                        </p>
                    </div>
                    
                    {/* Tarjeta 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {siteSettings.services_card3_title || 'Clases Particulares con Instructor'}
                        </h2>
                        <p className="text-gray-600">
                            {siteSettings.services_card3_description || 'Recibe un acompañamiento personalizado. Nuestros instructores certificados te guiarán paso a paso, proporcionando moto y equipo completo si lo necesitas.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección para listar las categorías y cursos */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                        Nuestros cursos disponibles
                    </h2>
                </div>
                
                {categories.map(category => (
                    <div key={category.id} className="mb-16">
                        {/* Nuevo diseño para la tarjeta de categoría */}
                        <div className="bg-gray-200 p-8 rounded-lg shadow-md max-w-3xl mx-auto mb-12">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    {category.description}
                                </p>
                                {category.requirements && (
                                    <div className="mt-6 pt-4 border-t border-gray-400">
                                        <p className="text-sm font-semibold text-gray-800">Requisitos para Iniciar:</p>
                                        <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: category.requirements }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Lista de cursos de la categoría */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.filter(product => product.category_id === category.id).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiciosPage;