import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import ProductForm from '../../components/admin/ProductForm';

const AdminProducts = () => {
  const { products, categories, deleteProduct } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category_id === parseInt(selectedCategory))
    : products;

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    setLoading(true);
    await deleteProduct(id);
    setLoading(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="mt-2 text-gray-600">
            Administra el catálogo de productos
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Filtrar por categoría:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Image */}
            <div className="h-48 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                  {product.category_name}
                </span>
                <span className="text-xs text-gray-500">ID: {product.id}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center space-x-1">
                  {product.images && product.images.length > 0 ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-xs text-gray-500">
                    {product.images ? product.images.length : 0} img
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4 inline mr-1" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍔</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay productos
          </h3>
          <p className="text-gray-500">
            {selectedCategory 
              ? 'No se encontraron productos en esta categoría.'
              : 'Comienza agregando tu primer producto.'
            }
          </p>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminProducts;