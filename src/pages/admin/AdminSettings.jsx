import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Image as ImageIcon, HelpCircle, Phone, ShoppingCart } from 'lucide-react';
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
        tiktok_url: siteSettings.tiktok_url || '',
        whatsapp_number: siteSettings.whatsapp_number || '',
        Maps_url: siteSettings.Maps_url || '',
        footer_description: siteSettings.footer_description || '',
        footer_copyright: siteSettings.footer_copyright || '',
        // Adaptación del botón de PedidosYa a WhatsApp
        product_btn_text: siteSettings.product_btn_text || 'Más info',
        product_btn_bg_color: siteSettings.product_btn_bg_color || '#22c55e',
        product_btn_text_color: siteSettings.product_btn_text_color || '#FFFFFF',
        product_btn_icon: siteSettings.product_btn_icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-whatsapp"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sitio</h1>
        <p className="mt-2 text-gray-600">
          Administra la información general, logo, contacto y textos del pie de página.
        </p>
      </div>

      {saved && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center gap-3 rounded-md" role="alert">
          <CheckCircle size={20}/>
          <p className="font-bold">Configuración guardada exitosamente.</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6 divide-y divide-gray-200">
          
          {/* ... (Las secciones de Logo, Contacto, Ubicación, etc., se mantienen sin cambios) ... */}
          
          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart size={18} /> Botón de Pedido
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Controles */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Texto del Botón</label>
                  <input type="text" name="product_btn_text" value={formData.product_btn_text || ''} onChange={handleInputChange} className="input-styled" placeholder="Ej: Más info" />
                </div>
                <div className="flex items-center gap-4">
                  <input type="color" name="product_btn_bg_color" value={formData.product_btn_bg_color || '#22c55e'} onChange={handleInputChange} className="w-10 h-10 rounded-full border-gray-300" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color de Fondo</label>
                  </div>
                </div>
                  <div className="flex items-center gap-4">
                  <input type="color" name="product_btn_text_color" value={formData.product_btn_text_color || '#FFFFFF'} onChange={handleInputChange} className="w-10 h-10 rounded-full border-gray-300" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color de Texto</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ícono (SVG)</label>
                  <textarea name="product_btn_icon" value={formData.product_btn_icon || ''} onChange={handleInputChange} className="input-styled mt-1 w-full" rows="3" placeholder="Pega el código SVG del ícono aquí"></textarea>
                  <p className="text-xs text-gray-500 mt-1">Busca un ícono en <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">lucide.dev</a>, haz clic en "Copy SVG" y pégalo aquí.</p>
                </div>
              </div>
              {/* Vista Previa */}
              <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center">
                  <p className="text-sm font-semibold text-gray-600 mb-4">Vista Previa</p>
                  <a 
                    style={{ 
                        backgroundColor: formData.product_btn_bg_color, 
                        color: formData.product_btn_text_color 
                    }}
                    className="font-semibold py-2 px-3 rounded-md text-center transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <span 
                      style={{ color: formData.product_btn_text_color }} 
                      dangerouslySetInnerHTML={{ __html: formData.product_btn_icon }} 
                    />
                    <span>{formData.product_btn_text || 'Más info'}</span>
                  </a>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Textos del Pie de Página</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción del Footer</label>
                <textarea name="footer_description" value={formData.footer_description || ''} onChange={handleInputChange} className="input-styled" rows="3"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Texto de Copyright</label>
                <input type="text" name="footer_copyright" value={formData.footer_copyright || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Guardar Configuración</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
          <HelpCircle size={16}/> ¿Cómo obtener la URL de Google Maps?
        </h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Busca tu local en Google Maps.</li>
          <li>Haz clic en <strong>Compartir</strong>, y luego en la pestaña <strong>"Incorporar un mapa"</strong>.</li>
          <li>Copia el código HTML que aparece. Se verá algo así: <code className="text-xs bg-blue-100 p-1 rounded">{'<iframe src="URL_LARGA" ...></iframe>'}</code></li>
          <li>Pega aquí <strong>solamente la URL</strong> que está dentro de las comillas de `src="..."`.</li>
        </ol>
      </div>
    </div>
  );
};

export default AdminSettings;