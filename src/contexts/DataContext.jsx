import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
const BASE_API_URL = 'https://alejandrosabater.com.ar/api';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [heroContent, setHeroContent] = useState({});
  const [siteSettings, setSiteSettings] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bannersRes, heroRes, categoriesRes, settingsRes, productsRes, usersRes] = await Promise.all([
        fetch(`${BASE_API_URL}/banners.php`),
        fetch(`${BASE_API_URL}/hero.php`),
        fetch(`${BASE_API_URL}/getCategorias.php`),
        fetch(`${BASE_API_URL}/settings.php`),
        fetch(`${BASE_API_URL}/products.php`),
        fetch(`${BASE_API_URL}/users.php`),
      ]);

      const bannersData = await bannersRes.json();
      const heroData = await heroRes.json();
      const categoriesData = await categoriesRes.json();
      const settingsData = await settingsRes.json();
      const productsData = await productsRes.json();
      const usersData = await usersRes.json();
      
      setBanners(bannersData || []);
      setHeroContent(heroData || {});
      setCategories(categoriesData || []);
      setSiteSettings(settingsData || {});
      setProducts(productsData || []);
      setUsers(usersData || []);

    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- OTRAS FUNCIONES ---
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
  
  const updateSiteSettings = async (formData) => {
    const response = await fetch(`${BASE_API_URL}/settings.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };

  const addProduct = async (formData) => {
    const response = await fetch(`${BASE_API_URL}/products.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok && result.success) fetchData();
    return { success: response.ok, ...result };
  };

  const updateProduct = async (formData) => {
    formData.append('_method', 'PUT');
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

  // --- FUNCIONES CRUD PARA CATEGORÍAS (CORREGIDAS) ---
  const addCategory = async (formData) => {
    const response = await fetch(`${BASE_API_URL}/getCategorias.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok) fetchData();
    return { success: response.ok, ...result };
  };

  const updateCategory = async (formData) => {
    formData.append('_method', 'PUT');
    const response = await fetch(`${BASE_API_URL}/getCategorias.php`, { method: 'POST', body: formData });
    const result = await response.json();
    if (response.ok) fetchData();
    return { success: response.ok, ...result };
  };

  const deleteCategory = async (id) => {
    const response = await fetch(`${BASE_API_URL}/getCategorias.php`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const result = await response.json();
    if (response.ok) fetchData();
    return { success: response.ok, ...result };
  };
  
  const addUser = async (userData) => {
    const response = await fetch(`${BASE_API_URL}/users.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) });
    const result = await response.json();
    if (response.ok) fetchData();
    return { success: response.ok, ...result };
  };

  const updateUser = async (userData) => {
    const response = await fetch(`${BASE_API_URL}/users.php`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) });
    const result = await response.json();
    if (response.ok) fetchData();
    return { success: response.ok, ...result };
  };

  const deleteUser = async (id) => {
    const response = await fetch(`${BASE_API_URL}/users.php`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const result = await response.json();
    if (response.ok) fetchData();
    return { success: response.ok, ...result };
  };

  const value = {
    categories, products, banners, heroContent, siteSettings, users, loading,
    fetchData, addBanner, deleteBanner, updateHeroContent, updateSiteSettings,
    addProduct, updateProduct, deleteProduct,
    addCategory, updateCategory, deleteCategory,
    addUser, updateUser, deleteUser,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};