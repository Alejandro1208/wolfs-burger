import React, { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminBanners = () => {
  const { banners } = useData();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // In a real app, this would upload to PHP backend
    // const formData = new FormData();
    // formData.append('banner', file);
    // const response = await fetch('/api/banners', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // Mock upload
    setTimeout(() => {
      setIsUploading(false);
      alert('Banner subido exitosamente (simulado)');
    }, 2000);
  };

  const handleDelete = async (bannerId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este banner?')) {
      return;
    }

    // In a real app: await fetch(`/api/banners/${bannerId}`, { method: 'DELETE' })
    alert('Banner eliminado exitosamente (simulado)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Banners</h1>
          <p className="mt-2 text-gray-600">
            Administra las imágenes del carrusel principal
          </p>
        </div>
        
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <button
            disabled={isUploading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Subiendo...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Agregar Banner</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner, index) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 h-48">
              <img
                src={banner.image_url}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">Banner {index + 1}</h3>
                  <p className="text-sm text-gray-500">Activo</p>
                </div>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Upload Card */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm font-medium text-gray-900 mb-2">
              Subir nuevo banner
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG hasta 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Instrucciones para banners:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Resolución recomendada: 1920x1080 píxeles</li>
          <li>• Formato: JPG o PNG</li>
          <li>• Tamaño máximo: 10MB</li>
          <li>• Los banners se muestran en orden de subida</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminBanners;