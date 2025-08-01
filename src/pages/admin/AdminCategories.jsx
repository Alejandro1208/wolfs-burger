import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, GripVertical, Save, X, Folder, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const CategoryForm = ({ category, onClose }) => {
    const { addCategory, updateCategory } = useData();
    const [name, setName] = useState(category?.name || '');
    const [description, setDescription] = useState(category?.description || '');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(category?.image_url || '');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setIsProcessing(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (category) {
            formData.append('id', category.id);
            await updateCategory(formData);
        } else {
            await addCategory(formData);
        }
        setIsProcessing(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" style={{ marginTop: 0 }}>
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">{category ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </div>
                <form onSubmit={handleSubmit} id="category-form" className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="w-24 h-24 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                                {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                            </div>
                            <label htmlFor="cat-image-upload" className="btn-secondary cursor-pointer">
                                Subir Imagen
                                <input id="cat-image-upload" type="file" className="hidden" onChange={handleImageChange} accept="image/*"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input-styled w-full"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-styled w-full" rows="3"></textarea>
                    </div>
                </form>
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm">Cancelar</button>
                    <button type="submit" form="category-form" disabled={isProcessing} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        {isProcessing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminCategories = () => {
  const { categories, deleteCategory, updateCategoryOrder, loading } = useData();
  const [orderedCategories, setOrderedCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    setOrderedCategories(categories);
  }, [categories]);

  const handleOpenForm = (category = null) => {
    setEditingCategory(category);
    setShowForm(true);
  };
  
  const handleCloseForm = () => setShowForm(false);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      await deleteCategory(id);
    }
  };

  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e) => {
    const copyListItems = [...orderedCategories];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setOrderedCategories(copyListItems);
  };
  
  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    const orderedIds = orderedCategories.map(cat => cat.id);
    await updateCategoryOrder(orderedIds);
    setIsSavingOrder(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
          <p className="mt-2 text-gray-600">Arrastra y suelta las categorías para ordenarlas. Luego guarda los cambios.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleSaveOrder} disabled={isSavingOrder} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 disabled:opacity-50">
            <Save size={16}/>{isSavingOrder ? 'Guardando...' : 'Guardar Orden'}
          </button>
          <button onClick={() => handleOpenForm()} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-2">
            <Plus size={16}/>Nueva Categoría
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {orderedCategories.map((category, index) => (
            <div 
              key={category.id} 
              className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <GripVertical className="cursor-grab text-gray-400" />
              <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                {category.image_url ? <img src={category.image_url} alt={category.name} className="w-full h-full object-cover"/> : <Folder size={24} className="text-gray-400 m-auto"/>}
              </div>
              <div className="flex-grow">
                  <p className="font-semibold text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-md" title="Eliminar"><Trash2 size={16}/></button>
                <button onClick={() => handleOpenForm(category)} className="p-2 text-gray-500 hover:text-indigo-600 rounded-md" title="Editar"><Edit size={16}/></button>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center py-4">Cargando...</p>}
        {!loading && categories.length === 0 && (
            <div className="text-center py-12"><p className="text-gray-500">No hay categorías. ¡Crea la primera!</p></div>
        )}
      </div>
      
      {showForm && (
          <CategoryForm category={editingCategory} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default AdminCategories;