import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Package, Star } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import ProductForm from '../../components/admin/ProductForm';

const AdminProducts = () => {
  const { products, categories, deleteProduct, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products;
    if (filter === 'featured') return products.filter(p => p.is_featured);
    return products.filter(p => p.category_id == filter);
  }, [products, filter]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
      await deleteProduct(id);
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="mt-2 text-gray-600">Crea, edita y elimina los productos de tu menú.</p>
        </div>
        <button onClick={handleNew} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2">
          <Plus size={16}/>Nuevo Producto
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
        <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">Filtrar por:</label>
        <select
          id="category-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="all">Todas las categorías</option>
          <option value="featured">Solo Destacados</option>
          <optgroup label="Categorías">
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </optgroup>
        </select>
        <span className="text-sm text-gray-500">{filteredProducts.length} producto(s)</span>
      </div>
      
      {loading && <p className="text-center py-12 text-gray-500">Cargando productos...</p>}
      
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-dashed">
          <Package size={48} className="mx-auto text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No se encontraron productos</h3>
          <p className="mt-1 text-sm text-gray-500">Prueba con otro filtro o agrega un nuevo producto.</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                <img
                  src={product.images.length > 0 ? product.images[0].image_url : 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                 {product.is_featured === true && (
                    <div className="absolute top-2 right-2 bg-amber-400 p-1.5 rounded-full shadow-lg">
                        <Star size={16} className="text-white" fill="currentColor"/>
                    </div>
                 )}
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{product.category_name || 'Sin categoría'}</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                </div>
                <h3 className="text-lg font-semibold my-2 text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 flex-grow line-clamp-3">{product.description}</p>
              </div>
              <div className="bg-gray-50 p-3 flex justify-end gap-2 border-t">
                <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-md transition-colors" title="Eliminar"><Trash2 size={16}/></button>
                <button onClick={() => handleEdit(product)} className="p-2 text-gray-500 hover:text-indigo-600 rounded-md transition-colors" title="Editar"><Edit size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProductForm product={editingProduct} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default AdminProducts;