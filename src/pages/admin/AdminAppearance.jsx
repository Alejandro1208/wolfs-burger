import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Palette } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminAppearance = () => {
  const { siteSettings, updateSiteSettings } = useData();
  const [colors, setColors] = useState({
    color_primary: '#c0392b',
    color_secondary: '#e74c3c',
    color_accent: '#f39c12',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setColors({
        color_primary: siteSettings.color_primary || '#c0392b',
        color_secondary: siteSettings.color_secondary || '#e74c3c',
        color_accent: siteSettings.color_accent || '#f39c12',
      });
    }
  }, [siteSettings]);

  const handleColorChange = (e) => {
    setColors(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const formData = new FormData();
    Object.keys(colors).forEach(key => {
        formData.append(key, colors[key]);
    });

    const result = await updateSiteSettings(formData);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Apariencia del Sitio</h1>
        <p className="mt-2 text-gray-600">
          Personaliza los colores principales de tu marca.
        </p>
      </div>

      {saved && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center gap-3 rounded-md" role="alert">
          <CheckCircle size={20}/>
          <p className="font-bold">Colores guardados exitosamente.</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <input type="color" name="color_primary" value={colors.color_primary} onChange={handleColorChange} className="w-12 h-12 rounded-full border-gray-300" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Color Primario</label>
                <p className="text-xs text-gray-500">Usado en fondos y botones principales.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="color" name="color_secondary" value={colors.color_secondary} onChange={handleColorChange} className="w-12 h-12 rounded-full border-gray-300" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Color Secundario</label>
                <p className="text-xs text-gray-500">Usado para efectos hover y alertas.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="color" name="color_accent" value={colors.color_accent} onChange={handleColorChange} className="w-12 h-12 rounded-full border-gray-300" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Color de Acento</label>
                <p className="text-xs text-gray-500">Usado en detalles y textos especiales.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t mt-6">
            <button type="submit" disabled={loading} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 disabled:opacity-50">
              <Save size={16} />
              {loading ? 'Guardando...' : 'Guardar Colores'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAppearance;