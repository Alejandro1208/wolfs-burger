import React, { useState, useEffect } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const BannerForm = ({ banner, onClose }) => {
  const { addBanner } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    cta1_text: '',
    cta1_link: '',
    cta2_text: '',
    cta2_link: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        cta1_text: banner.cta1_text || '',
        cta1_link: banner.cta1_link || '',
        cta2_text: banner.cta2_text || '',
        cta2_link: banner.cta2_link || '',
      });
      setImagePreview(banner.image_url || '');
    }
  }, [banner]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files.length > 0 ? e.target.files.item(0) : null;
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => submissionData.append(key, formData.key));

    if (banner?.id) submissionData.append('id', banner.id);
    if (imageFile) submissionData.append('banner_image', imageFile);
    else if (banner) submissionData.append('existing_image_url', banner.image_url.split('/').slice(-3).join('/'));

    const result = await addBanner(submissionData);

    setLoading(false);
    if (result.success) onClose();
    else setError(result.error || 'Ocurrió un error inesperado.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{banner ? 'Editar Banner' : 'Nuevo Banner'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Banner</label>
            <div className="mt-1 flex items-center gap-4">
              <span className="inline-block h-24 w-40 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <Image className="h-8 w-8 text-gray-400" />}
              </span>
              <label htmlFor="image-upload" className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                <span>{imageFile ? "Cambiar" : "Subir"} imagen</span>
                <input id="image-upload" name="banner_image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
            <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-2">Botón 1 (Principal)</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cta1_text" className="block text-xs font-medium text-gray-700">Texto</label>
                <input type="text" id="cta1_text" name="cta1_text" value={formData.cta1_text} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="cta1_link" className="block text-xs font-medium text-gray-700">Enlace (URL)</label>
                <input type="text" id="cta1_link" name="cta1_link" value={formData.cta1_link} onChange={handleInputChange} placeholder="/menu" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-2">Botón 2 (Secundario)</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cta2_text" className="block text-xs font-medium text-gray-700">Texto</label>
                <input type="text" id="cta2_text" name="cta2_text" value={formData.cta2_text} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="cta2_link" className="block text-xs font-medium text-gray-700">Enlace (URL)</label>
                <input type="text" id="cta2_link" name="cta2_link" value={formData.cta2_link} onChange={handleInputChange} placeholder="https://pedidosya.com.ar" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow-sm">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow-sm disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;