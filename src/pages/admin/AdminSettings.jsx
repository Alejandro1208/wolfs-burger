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
        pedidosya_button_bg: siteSettings.pedidosya_button_bg || '#EA1D2C',
        pedidosya_button_text_color: siteSettings.pedidosya_button_text_color || '#FFFFFF',
        pedidosya_button_icon: siteSettings.pedidosya_button_icon || '',
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

          <div className="pt-0">
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

          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" name="contact_phone" value={formData.contact_phone || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="contact_email" value={formData.contact_email || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ubicación y Horarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Dirección (Texto)</label>
                <input type="text" name="address" value={formData.address || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">URL de Google Maps (para el iframe)</label>
                <input type="url" name="Maps_url" value={formData.Maps_url || ''} onChange={handleInputChange} className="input-styled" placeholder="http://googleusercontent.com/maps.google.com/8?..."/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Horarios de Atención</label>
                <input type="text" name="hours" value={formData.hours || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">URL de Facebook</label>
                <input type="url" name="facebook_url" value={formData.facebook_url || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL de Instagram</label>
                <input type="url" name="instagram_url" value={formData.instagram_url || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL de TikTok</label>
                <input type="url" name="tiktok_url" value={formData.tiktok_url || ''} onChange={handleInputChange} className="input-styled"/>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Phone size={18}/> Contacto Rápido
            </h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Número de WhatsApp</label>
                <input type="text" name="whatsapp_number" value={formData.whatsapp_number || ''} onChange={handleInputChange} className="input-styled" placeholder="54911... (código de país + número)"/>
                <p className="text-xs text-gray-500 mt-1">Incluir código de país y área, sin el símbolo '+' ni espacios. Ejemplo: 5491122334455</p>
            </div>
          </div>

          {/* --- NUEVA SECCIÓN PARA PERSONALIZAR EL BOTÓN --- */}
          <div className="pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart size={18} /> Botón de Pedido
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Controles */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input type="color" name="pedidosya_button_bg" value={formData.pedidosya_button_bg} onChange={handleInputChange} className="w-10 h-10 rounded-full border-gray-300" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color de Fondo</label>
                  </div>
                </div>
                  <div className="flex items-center gap-4">
                  <input type="color" name="pedidosya_button_text_color" value={formData.pedidosya_button_text_color} onChange={handleInputChange} className="w-10 h-10 rounded-full border-gray-300" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color de Texto</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ícono (SVG)</label>
                  <textarea name="pedidosya_button_icon" value={formData.pedidosya_button_icon} onChange={handleInputChange} className="input-styled mt-1 w-full" rows="3" placeholder="Pega el código SVG del ícono aquí"></textarea>
                  <p className="text-xs text-gray-500 mt-1">Busca un ícono en <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">lucide.dev</a>, haz clic en "Copy SVG" y pégalo aquí.</p>
                </div>
              </div>
              {/* Vista Previa */}
              <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center">
                  <p className="text-sm font-semibold text-gray-600 mb-4">Vista Previa</p>
                  <a 
                    style={{ 
                        backgroundColor: formData.pedidosya_button_bg, 
                        color: formData.pedidosya_button_text_color 
                    }}
                    className="font-semibold py-2 px-3 rounded-md text-center transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <span 
                      style={{ color: formData.pedidosya_button_text_color }} 
                      dangerouslySetInnerHTML={{ __html: formData.pedidosya_button_icon }} 
                    />
                    <span>Pedir Ahora</span>
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