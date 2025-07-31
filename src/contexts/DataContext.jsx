import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
const BASE_API_URL = 'https://alejandrosabater.com.ar/api';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [heroContent, setHeroContent] = useState({});
  const [siteSettings, setSiteSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bannersRes, heroRes, categoriesRes, settingsRes, productsRes] = await Promise.all([
        fetch(`${BASE_API_URL}/banners.php`),
        fetch(`${BASE_API_URL}/hero.php`),
        fetch(`${BASE_API_URL}/getCategorias.php`),
        fetch(`${BASE_API_URL}/settings.php`),
        fetch(`${BASE_API_URL}/products.php`), // <-- Se añade la petición de productos
      ]);

      const bannersData = await bannersRes.json();
      const heroData = await heroRes.json();
      const categoriesData = await categoriesRes.json();
      const settingsData = await settingsRes.json();
      const productsData = await productsRes.json(); // <-- Se obtienen los datos de productos
      
      setBanners(bannersData || []);
      setHeroContent(heroData || {});
      setCategories(categoriesData || []);
      setSiteSettings(settingsData || {});
      setProducts(productsData || []); // <-- Se guardan los productos en el estado

    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- FUNCIONES DE PORTADA (Banners & Hero) ---
  const addBanner = async (formData) => {
    const response = await fetch(`${BASE_API_URL}/banners.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };

  const deleteBanner = async (id) => {
    const response = await fetch(`${BASE_API_URL}/banners.php`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };
  
  const updateHeroContent = async (heroData) => {
    const response = await fetch(`${BASE_API_URL}/hero.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(heroData) });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };
  
  // --- FUNCIONES DE CONFIGURACIÓN GENERAL ---
  const updateSiteSettings = async (formData) => { // Ahora recibe FormData
    try {
      const response = await fetch(`${BASE_API_URL}/settings.php`, {
        method: 'POST',
        body: formData, // No se necesita 'headers', el navegador lo pone automáticamente
      });
      const result = await response.json();
      if (response.ok && result.success) {
        fetchData(); // Recargamos los datos para ver el nuevo logo
      }
      return { success: response.ok, ...result };
    } catch (error) {
      return { success: false, error: 'Error de red al guardar la configuración.' };
    }
  };


  // --- FUNCIONES CRUD PARA PRODUCTOS (NUEVAS) ---
  const addProduct = async (formData) => {
    const response = await fetch(`${BASE_API_URL}/products.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };

  const updateProduct = async (formData) => {
    formData.append('_method', 'PUT'); // Simulamos un método PUT para la actualización
    const response = await fetch(`${BASE_API_URL}/products.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`${BASE_API_URL}/products.php`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };

  const value = {
    // Estados
    categories,
    products,
    banners,
    heroContent,
    siteSettings,
    loading,
    // Funciones
    fetchData,
    addBanner,
    deleteBanner,
    updateHeroContent,
    updateSiteSettings,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};