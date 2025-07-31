import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Folder } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, loading } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentName, setCurrentName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartAdd = () => {
    setIsAdding(true);
    setCurrentName('');
    setEditingId(null);
  };

  const handleStartEdit = (category) => {
    setEditingId(category.id);
    setCurrentName(category.name);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setCurrentName('');
  };

  const handleSave = async () => {
    if (!currentName.trim()) return;
    setIsProcessing(true);
    if (isAdding) {
      await addCategory({ name: currentName });
    }
    if (editingId) {
      await updateCategory({ id: editingId, name: currentName });
    }
    setIsProcessing(false);
    handleCancel();
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
          <p className="mt-2 text-gray-600">Crea, edita y elimina las categorías de tus productos.</p>
        </div>
        <button onClick={handleStartAdd} disabled={isAdding || editingId} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50">
          <Plus size={16}/>Nueva Categoría
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {isAdding && (
            <div className="p-4 flex items-center gap-4 bg-indigo-50">
              <Folder size={20} className="text-indigo-500 flex-shrink-0" />
              <input
                type="text"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                placeholder="Nombre de la nueva categoría"
                className="input-styled flex-grow"
                autoFocus
              />
              <button onClick={handleSave} disabled={isProcessing || !currentName.trim()} className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"><Save size={18}/></button>
              <button onClick={handleCancel} className="p-2 text-gray-500 hover:bg-gray-200 rounded-md transition-colors"><X size={18}/></button>
            </div>
          )}

          {categories.map((category) => (
            <div key={category.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <Folder size={20} className="text-gray-400 flex-shrink-0" />
              <div className="flex-grow">
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    className="input-styled w-full"
                    autoFocus
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingId === category.id ? (
                  <>
                    <button onClick={handleSave} disabled={isProcessing || !currentName.trim()} className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"><Save size={18}/></button>
                    <button onClick={handleCancel} className="p-2 text-gray-500 hover:bg-gray-200 rounded-md transition-colors"><X size={18}/></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleDelete(category.id)} disabled={isAdding || editingId} className="p-2 text-gray-500 hover:text-red-600 rounded-md transition-colors disabled:opacity-50" title="Eliminar"><Trash2 size={16}/></button>
                    <button onClick={() => handleStartEdit(category)} disabled={isAdding || editingId} className="p-2 text-gray-500 hover:text-indigo-600 rounded-md transition-colors disabled:opacity-50" title="Editar"><Edit size={16}/></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center py-4 text-gray-500">Cargando...</p>}
        {!loading && categories.length === 0 && !isAdding && (
            <div className="text-center py-12">
                <p className="text-gray-500">No hay categorías. ¡Crea la primera!</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;