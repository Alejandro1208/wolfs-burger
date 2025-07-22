import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import ProductCard from '../../components/public/ProductCard';

const MenuPage = () => {
  const { products, categories, loading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category_id === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategory]);

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      setSearchParams({});
    } else {
      setSelectedCategory(categoryId);
      setSearchParams({ category: categoryId.toString() });
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestro <span className="text-gradient">Menú</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre todos nuestros productos, desde hamburguesas artesanales 
              hasta acompañamientos perfectos.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={clearFilters}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-gray-600">
              {selectedCategory 
                ? 'No se encontraron productos en esta categoría.'
                : 'No hay productos disponibles en este momento.'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory && (
                  <span>
                    {' '}en <strong>{categories.find(cat => cat.id === selectedCategory)?.name}</strong>
                  </span>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;