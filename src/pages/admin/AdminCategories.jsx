import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!formData.name.trim()) return;
    
    setLoading(true);
    const result = await addCategory(formData);
    
    if (result.success) {
      setFormData({ name: '' });
      setIsAdding(false);
    }
    setLoading(false);
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name });
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) return;
    
    setLoading(true);
    const result = await updateCategory(editingId, formData);
    
    if (result.success) {
      setEditingId(null);
      setFormData({ name: '' });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      return;
    }

    setLoading(true);
    await deleteCategory(id);
    setLoading(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
          <p className="mt-2 text-gray-600">
            Administra las categorías de productos
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          disabled={isAdding || editingId}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Add New Row */}
            {isAdding && (
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Nuevo
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    placeholder="Nombre de la categoría"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    autoFocus
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleAdd}
                      disabled={loading || !formData.name.trim()}
                      className="text-green-600 hover:text-green-900 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Existing Categories */}
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === category.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      autoFocus
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingId === category.id ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleUpdate}
                        disabled={loading || !formData.name.trim()}
                        className="text-green-600 hover:text-green-900 disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        disabled={isAdding || editingId}
                        className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        disabled={loading || isAdding || editingId}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay categorías
            </h3>
            <p className="text-gray-500">
              Comienza agregando tu primera categoría de productos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;