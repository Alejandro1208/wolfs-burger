// src/pages/admin/AdminSettings.jsx
import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminSettings = () => {
  const { siteSettings, updateSiteSettings } = useData();
  const [formData, setFormData] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setFormData({
        contact_phone: siteSettings.contact_phone || '',
        contact_email: siteSettings.contact_email || '',
        address: siteSettings.address || '',
        hours: siteSettings.hours || '',
        facebook_url: siteSettings.facebook_url || '',
        instagram_url: siteSettings.instagram_url || '',
      });
      setLogoPreview(siteSettings.site_logo_url || '');
    }
  }, [siteSettings]);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    if (logoFile) {
      submissionData.append('site_logo', logoFile);
    }

    const result = await updateSiteSettings(submissionData);

    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sitio</h1>
        <p className="mt-2 text-gray-600">
          Administra la información de contacto y configuración general
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          ✅ Configuración guardada exitosamente
        </div>
      )}

      {/* Settings Form */}
      <div className="bg-white shadow rounded-lg">
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* SECCIÓN DEL LOGO */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Logo del Sitio</h2>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {logoPreview ? <img src={logoPreview} alt="Logo actual" className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
              </div>
              <label htmlFor="logo-upload" className="btn-secondary cursor-pointer">
                Cambiar Logo
                <input id="logo-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoChange} />
              </label>
            </div>
          </div>
          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Información de Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="11-2233-4455"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="info@burgerhouse.com"
                />
              </div>
            </div>
          </div>

          {/* Address and Hours */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Ubicación y Horarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Av. Corrientes 1234, CABA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horarios de Atención
                </label>
                <input
                  type="text"
                  name="hours"
                  value={formData.hours || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Lun-Dom: 11:00 - 23:00"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Redes Sociales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://facebook.com/burgerhouse"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://instagram.com/burgerhouse"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Guardar Configuración</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Instrucciones:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Esta información se mostrará en el footer del sitio web</li>
          <li>• El teléfono aparecerá en el header para contacto rápido</li>
          <li>• La dirección se usará para el mapa de Google Maps</li>
          <li>• Los enlaces de redes sociales deben incluir "https://"</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSettings;