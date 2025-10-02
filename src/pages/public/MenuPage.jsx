import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import ProductCard from '../../components/public/ProductCard';
import ProductModal from '../../components/public/ProductModal'; 

const MenuPage = () => {
  const { products, categories, loading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (!categoryParam && orderedCategories.length > 0) {
      setSelectedCategory(orderedCategories[0].id);
    } else if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [searchParams, orderedCategories]);

  const filteredProducts = products.filter(product => product.category_id == selectedCategory);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId.toString() });
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden'; 
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nuestro <span className="text-gradient">Menú</span></h1>
        </div>
      </div>

      <div className="bg-white border-b sticky top-20 md:top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {orderedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                  selectedCategory == category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length > 0 && (
          <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onCardClick={handleOpenModal} />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
};

export default MenuPage;