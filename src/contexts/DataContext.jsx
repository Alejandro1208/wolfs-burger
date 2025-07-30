import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
const BASE_API_URL = 'https://alejandrosabater.com.ar/api'; // La URL de nuestra API

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
  const [siteSettings, setSiteSettings] = useState({});
  const [loading, setLoading] = useState(true);

  // Función para cargar todos los datos iniciales desde el backend
  const fetchData = async () => {
    setLoading(true);
    try {
      // Usamos Promise.all para hacer todas las peticiones en paralelo
      const [categoriesRes, productsRes, bannersRes, settingsRes] = await Promise.all([
        fetch(`${BASE_API_URL}/getCategorias.php`),
        // Aún no hemos creado los otros endpoints, los añadiremos aquí a medida que los hagamos
        // fetch(`${BASE_API_URL}/getProducts.php`),
        // fetch(`${BASE_API_URL}/getBanners.php`),
        // fetch(`${BASE_API_URL}/getSiteSettings.php`),
      ]);

      const categoriesData = await categoriesRes.json();
      // const productsData = await productsRes.json();
      // const bannersData = await bannersRes.json();
      // const settingsData = await settingsRes.json();
      
      setCategories(categoriesData || []);
      // setProducts(productsData || []);
      // setBanners(bannersData || []);
      // setSiteSettings(settingsData || {});
      
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar los datos cuando el componente se monta por primera vez
  useEffect(() => {
    fetchData();
  }, []);

  // --- FUNCIONES DE ESCRITURA CONECTADAS ---

  const addCategory = async (categoryData) => {
    const response = await fetch(`${BASE_API_URL}/createCategory.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });
    const result = await response.json();
    if (result.success) {
      fetchData(); // Recargar todos los datos para ver el cambio
    }
    return result;
  };

  const deleteCategory = async (id) => {
    const response = await fetch(`${BASE_API_URL}/deleteCategory.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const result = await response.json();
    if (result.success) {
      fetchData(); // Recargar todos los datos para ver el cambio
    }
    return result;
  };

  // Las otras funciones aún están simuladas, las conectaremos después
  const updateCategory = async (id, categoryData) => { alert('Función "Actualizar Categoría" pendiente.'); return { success: false }; };
  const addProduct = async (productData) => { alert('Función "Añadir Producto" pendiente.'); return { success: false }; };
  const updateProduct = async (id, productData) => { alert('Función "Actualizar Producto" pendiente.'); return { success: false }; };
  const deleteProduct = async (id) => { alert('Función "Eliminar Producto" pendiente.'); return { success: false }; };

  const value = {
    categories,
    products,
    banners,
    siteSettings,
    loading,
    fetchData,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};