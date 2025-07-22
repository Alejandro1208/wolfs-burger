import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

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

  // Mock data - In real app, this would come from PHP API
  const mockData = {
    categories: [
      { id: 1, name: "Hamburguesas" },
      { id: 2, name: "Bebidas" },
      { id: 3, name: "Papas" },
      { id: 4, name: "Combos" }
    ],
    products: [
      {
        id: 101,
        name: "Doble Cheddar Clásica",
        description: "Doble medallón de carne, doble queso cheddar, cebolla y pepinillos.",
        price: 5500.00,
        images: [
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
          "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg",
          "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg"
        ],
        pedidosya_link: "https://pedidosya.com.ar/restaurantes/burger-house",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      {
        id: 102,
        name: "BBQ Bacon Deluxe",
        description: "Medallón de carne, bacon crocante, queso cheddar, salsa BBQ y cebolla caramelizada.",
        price: 6200.00,
        images: [
          "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg",
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
        ],
        pedidosya_link: "https://pedidosya.com.ar/restaurantes/burger-house",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      {
        id: 103,
        name: "Veggie Supreme",
        description: "Medallón de quinoa y vegetales, queso vegano, lechuga, tomate y palta.",
        price: 4800.00,
        images: [
          "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg"
        ],
        pedidosya_link: "https://pedidosya.com.ar/restaurantes/burger-house",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      {
        id: 201,
        name: "Coca Cola 500ml",
        description: "Bebida gaseosa refrescante.",
        price: 800.00,
        images: [
          "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg"
        ],
        pedidosya_link: "https://pedidosya.com.ar/restaurantes/burger-house",
        category_id: 2,
        category_name: "Bebidas"
      },
      {
        id: 301,
        name: "Papas Fritas Grandes",
        description: "Papas fritas doradas y crocantes, porción grande.",
        price: 1200.00,
        images: [
          "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
        ],
        pedidosya_link: "https://pedidosya.com.ar/restaurantes/burger-house",
        category_id: 3,
        category_name: "Papas"
      },
      {
        id: 401,
        name: "Combo Clásico",
        description: "Hamburguesa clásica + papas medianas + bebida 500ml.",
        price: 7500.00,
        images: [
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
        ],
        pedidosya_link: "https://pedidosya.com.ar/restaurantes/burger-house",
        category_id: 4,
        category_name: "Combos"
      }
    ],
    banners: [
      { id: 1, image_url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" },
      { id: 2, image_url: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg" },
      { id: 3, image_url: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg" }
    ],
    siteSettings: {
      contact_phone: "11-2233-4455",
      contact_email: "info@burgerhouse.com",
      address: "Av. Corrientes 1234, CABA",
      hours: "Lun-Dom: 11:00 - 23:00",
      facebook: "https://facebook.com/burgerhouse",
      instagram: "https://instagram.com/burgerhouse"
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(mockData.categories);
      setProducts(mockData.products);
      setBanners(mockData.banners);
      setSiteSettings(mockData.siteSettings);
      setLoading(false);
    }, 1000);
  }, []);

  // API functions that would connect to PHP backend
  const fetchData = async () => {
    // In real app: await fetch('/api/data')
    setLoading(true);
    setTimeout(() => {
      setCategories(mockData.categories);
      setProducts(mockData.products);
      setBanners(mockData.banners);
      setSiteSettings(mockData.siteSettings);
      setLoading(false);
    }, 1000);
  };

  const addCategory = async (categoryData) => {
    // In real app: await fetch('/api/categories', { method: 'POST', body: JSON.stringify(categoryData) })
    const newCategory = { ...categoryData, id: Date.now() };
    setCategories(prev => [...prev, newCategory]);
    return { success: true };
  };

  const updateCategory = async (id, categoryData) => {
    // In real app: await fetch(`/api/categories/${id}`, { method: 'PUT', body: JSON.stringify(categoryData) })
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...categoryData } : cat));
    return { success: true };
  };

  const deleteCategory = async (id) => {
    // In real app: await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    setCategories(prev => prev.filter(cat => cat.id !== id));
    return { success: true };
  };

  const addProduct = async (productData) => {
    // In real app: await fetch('/api/products', { method: 'POST', body: formData })
    const newProduct = { ...productData, id: Date.now() };
    setProducts(prev => [...prev, newProduct]);
    return { success: true };
  };

  const updateProduct = async (id, productData) => {
    // In real app: await fetch(`/api/products/${id}`, { method: 'PUT', body: formData })
    setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, ...productData } : prod));
    return { success: true };
  };

  const deleteProduct = async (id) => {
    // In real app: await fetch(`/api/products/${id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(prod => prod.id !== id));
    return { success: true };
  };

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