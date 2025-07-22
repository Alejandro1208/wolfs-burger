import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import HeroBanner from '../../components/public/HeroBanner';
import ProductCard from '../../components/public/ProductCard';
import CategoryCard from '../../components/public/CategoryCard';

const HomePage = () => {
  const { products, categories, loading } = useData();

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  // Category images and descriptions
  const categoryData = {
    1: {
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      description: "Hamburguesas artesanales con ingredientes premium"
    },
    2: {
      image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg",
      description: "Bebidas refrescantes para acompañar tu comida"
    },
    3: {
      image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
      description: "Papas fritas doradas y crocantes"
    },
    4: {
      image: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg",
      description: "Combos completos al mejor precio"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestras <span className="text-gradient">Burgers</span> Destacadas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestras hamburguesas más populares, preparadas con ingredientes 
              frescos y recetas únicas que conquistarán tu paladar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/menu"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Ver Menú Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explora Nuestras <span className="text-gradient">Categorías</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desde hamburguesas gourmet hasta acompañamientos perfectos, 
              tenemos todo lo que necesitas para una experiencia gastronómica completa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                image={categoryData[category.id]?.image}
                description={categoryData[category.id]?.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para disfrutar?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Ordena ahora y recibe nuestras deliciosas hamburguesas en la comodidad de tu hogar.
          </p>
          <div className="space-x-4">
            <Link
              to="/menu"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
            >
              Ver Menú
            </Link>
            <a
              href="https://pedidosya.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 inline-block"
            >
              Pedir en PedidosYa
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;