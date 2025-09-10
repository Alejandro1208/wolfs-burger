import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, HelpCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminServices = () => {
  const { siteSettings, updateSiteSettings } = useData();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setFormData({
        services_main_title: siteSettings.services_main_title || '',
        services_main_subtitle: siteSettings.services_main_subtitle || '',
        services_card1_title: siteSettings.services_card1_title || '',
        services_card1_description: siteSettings.services_card1_description || '',
        services_card2_title: siteSettings.services_card2_title || '',
        services_card2_description: siteSettings.services_card2_description || '',
        services_card3_title: siteSettings.services_card3_title || '',
        services_card3_description: siteSettings.services_card3_description || '',
        
      });
    }
  }, [siteSettings]);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });

    const result = await updateSiteSettings(submissionData);

    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Servicios</h1>
        <p className="mt-2 text-gray-600">
          Edita el contenido de la página de "Servicios".
        </p>
      </div>

      {saved && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center gap-3 rounded-md" role="alert">
          <CheckCircle size={20}/>
          <p className="font-bold">Contenido guardado exitosamente.</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Sección Principal</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input type="text" name="services_main_title" value={formData.services_main_title || ''} onChange={handleInputChange} className="input-styled" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
              <textarea name="services_main_subtitle" value={formData.services_main_subtitle || ''} onChange={handleInputChange} className="input-styled" rows="2"></textarea>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
            {/* Tarjeta 1 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tarjeta 1</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="services_card1_title" value={formData.services_card1_title || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="services_card1_description" value={formData.services_card1_description || ''} onChange={handleInputChange} className="input-styled" rows="3"></textarea>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tarjeta 2</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="services_card2_title" value={formData.services_card2_title || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="services_card2_description" value={formData.services_card2_description || ''} onChange={handleInputChange} className="input-styled" rows="3"></textarea>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tarjeta 3</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="services_card3_title" value={formData.services_card3_title || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="services_card3_description" value={formData.services_card3_description || ''} onChange={handleInputChange} className="input-styled" rows="3"></textarea>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? 'Guardando...' : 'Guardar Contenido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminServices;