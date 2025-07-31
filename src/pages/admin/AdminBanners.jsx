import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminBanners = () => {
  const { banners, heroContent, addBanner, deleteBanner, updateHeroContent, loading } = useData();
  
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (heroContent) {
      setFormData({
        title: heroContent.title || '',
        subtitle: heroContent.subtitle || '',
        cta1_text: heroContent.cta1_text || '',
        cta1_link: heroContent.cta1_link || '',
        cta2_text: heroContent.cta2_text || '',
        cta2_link: heroContent.cta2_link || '',
      });
    }
  }, [heroContent]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    const result = await updateHeroContent(formData);
    if(result.success) {
      showSuccessMessage('Contenido guardado exitosamente.');
    } else {
      setError(result.error || 'No se pudo guardar el contenido.');
    }
    setIsSaving(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    
    const uploadFormData = new FormData();
    uploadFormData.append('banner', file);
    
    const result = await addBanner(uploadFormData);
    if (!result.success) {
      setError(result.error || 'Error al subir la imagen.');
    } else {
      showSuccessMessage('Imagen subida exitosamente.');
    }
    setIsUploading(false);
    event.target.value = null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración de Portada</h1>
        <p className="mt-2 text-gray-600">
          Edita el texto principal y gestiona las imágenes de fondo del carrusel.
        </p>
      </div>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center gap-3" role="alert"><AlertCircle size={20}/><p>{error}</p></div>}
      {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center gap-3" role="alert"><CheckCircle size={20}/><p>{success}</p></div>}
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleContentSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Contenido Fijo de la Portada</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} className="input-styled" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
            <textarea name="subtitle" value={formData.subtitle || ''} onChange={handleInputChange} className="input-styled" rows="2"></textarea>
          </div>
          <fieldset className="border p-4 rounded-md space-y-3">
            <legend className="text-sm font-medium px-1">Botón 1 (Principal)</legend>
            <input type="text" name="cta1_text" value={formData.cta1_text || ''} onChange={handleInputChange} placeholder="Texto del botón (ej: Ver Menú)" className="input-styled"/>
            <input type="text" name="cta1_link" value={formData.cta1_link || ''} onChange={handleInputChange} placeholder="Enlace (ej: /menu)" className="input-styled"/>
          </fieldset>
          <fieldset className="border p-4 rounded-md space-y-3">
            <legend className="text-sm font-medium px-1">Botón 2 (Secundario)</legend>
            <input type="text" name="cta2_text" value={formData.cta2_text || ''} onChange={handleInputChange} placeholder="Texto del botón (ej: Pedir Ahora)" className="input-styled"/>
            <input type="text" name="cta2_link" value={formData.cta2_link || ''} onChange={handleInputChange} placeholder="Enlace (URL completa de PedidosYa)" className="input-styled"/>
          </fieldset>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isSaving} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50">
              <Save size={16}/>{isSaving ? 'Guardando...' : 'Guardar Contenido'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
           <h2 className="text-xl font-semibold text-gray-800">Imágenes del Carrusel</h2>
           <label htmlFor="image-upload-input" className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-colors flex items-center gap-2 ${isUploading && 'opacity-50'}`}>
              {isUploading ? 'Subiendo...' : <><Upload size={16}/> Agregar Imagen</>}
              <input id="image-upload-input" type="file" onChange={handleImageUpload} disabled={isUploading} className="hidden"/>
           </label>
        </div>
        {loading && <p className="text-center text-gray-500 py-4">Cargando imágenes...</p>}
        {!loading && banners.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No hay imágenes en el carrusel.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {banners.map(banner => (
              <div key={banner.id} className="relative group rounded-md overflow-hidden aspect-video shadow-sm">
                <img src={banner.image_url} alt={banner.alt_text || ''} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => deleteBanner(banner.id)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors" title="Eliminar Imagen">
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminBanners;