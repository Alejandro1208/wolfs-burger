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

  // Datos de demostración actualizados
  const mockData = {
    categories: [
      { id: 1, name: "Hamburguesas" },
      { id: 2, name: "Bebidas" },
      { id: 3, name: "Papas" },
      { id: 4, name: "Combos" }
    ],
    products: [
      // --- HAMBURGUESAS ---
      {
        id: 101,
        name: "Doble Cheddar Clásica",
        description: "Doble medallón de carne, doble queso cheddar, cebolla y pepinillos.",
        price: 5500.00,
        images: [
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
          "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg",
        ],
        pedidosya_link: "#",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      {
        id: 102,
        name: "BBQ Bacon Deluxe",
        description: "Medallón de carne, bacon crocante, queso cheddar, salsa BBQ y aros de cebolla.",
        price: 6200.00,
        images: [
          "https://images.pexels.com/photos/12420469/pexels-photo-12420469.jpeg",
          "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg"
        ],
        pedidosya_link: "#",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      {
        id: 103,
        name: "Pollo Crispy",
        description: "Pechuga de pollo rebozada, lechuga, tomate y mayonesa especial.",
        price: 5800.00,
        images: [
          "https://images.pexels.com/photos/12420469/pexels-photo-12420469.jpeg",
          "https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg",
        ],
        pedidosya_link: "#",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      {
        id: 104,
        name: "Veggie Supreme",
        description: "Medallón de quinoa y vegetales, queso vegano, lechuga, tomate y palta.",
        price: 4800.00,
        images: ["https://images.pexels.com/photos/11401287/pexels-photo-11401287.jpeg"],
        pedidosya_link: "#",
        category_id: 1,
        category_name: "Hamburguesas"
      },
      // --- BEBIDAS ---
      {
        id: 201,
        name: "Gaseosa 600ml",
        description: "Línea Coca-Cola, de lima, naranja y pomelo.",
        price: 1500.00,
        images: ["data:image/jpeg;base64,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"],
        pedidosya_link: "#",
        category_id: 2,
        category_name: "Bebidas"
      },
       {
        id: 202,
        name: "Gaseosa 1L",
        description: "Línea Coca-Cola, de lima, naranja y pomelo.",
        price: 2200.00,
        images: ["https://humalogistica.com.ar/wp-content/uploads/2019/01/Coca-Cola-Clasica-Retornable-1-lt__1.jpg"],
        pedidosya_link: "#",
        category_id: 2,
        category_name: "Bebidas"
      },
       {
        id: 203,
        name: "Gaseosa 2L",
        description: "Línea Coca-Cola, de lima, naranja y pomelo.",
        price: 3000.00,
        images: ["https://http2.mlstatic.com/D_724682-MLA78626812075_082024-C.jpg"],
        pedidosya_link: "#",
        category_id: 2,
        category_name: "Bebidas"
      },
      // --- PAPAS ---
      {
        id: 301,
        name: "Papas Fritas Grandes",
        description: "Papas fritas doradas y crocantes, porción grande.",
        price: 2500.00,
        images: ["https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"],
        pedidosya_link: "#",
        category_id: 3,
        category_name: "Papas"
      },
      {
        id: 302,
        name: "Papas con Cheddar",
        description: "Nuestras papas crocantes bañadas en una abundante salsa de queso cheddar.",
        price: 3200.00,
        images: ["https://static.wixstatic.com/media/a57c36_cd399e32dc8a4ddd8e3d000801c31f22~mv2.jpg/v1/fill/w_512,h_476,al_c,lg_1,q_80,enc_avif,quality_auto/a57c36_cd399e32dc8a4ddd8e3d000801c31f22~mv2.jpg"],
        pedidosya_link: "#",
        category_id: 3,
        category_name: "Papas"
      },
       {
        id: 303,
        name: "Papas con Cheddar y Bacon",
        description: "Una combinación irresistible de papas fritas, salsa cheddar y bacon crujiente.",
        price: 3800.00,
        images: ["https://cdn.pedix.app/f7I4XPw3D6tzRO98Wiiy/products/1742414148451-25269.png?size=800x800"],
        pedidosya_link: "#",
        category_id: 3,
        category_name: "Papas"
      },
      // --- COMBOS ---
      {
        id: 401,
        name: "Combo Clásico",
        description: "Hamburguesa Doble Cheddar Clásica + Papas Fritas + Coca-Cola 600ml.",
        price: 8500.00,
        images: [
          "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
        ],
        pedidosya_link: "#",
        category_id: 4,
        category_name: "Combos"
      },
       {
        id: 402,
        name: "Combo BBQ",
        description: "Hamburguesa BBQ Bacon Deluxe + Papas Fritas + Coca-Cola 600ml.",
        price: 9200.00,
        images: [
          "https://images.pexels.com/photos/12420469/pexels-photo-12420469.jpeg",
          "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg"
        ],
        pedidosya_link: "#",
        category_id: 4,
        category_name: "Combos"
      },
       {
        id: 403,
        name: "Combo Pollo",
        description: "Hamburguesa Pollo Crispy + Papas Fritas + Coca-Cola 600ml.",
        price: 8800.00,
        images: [
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
          "https://images.pexels.com/photos/12420469/pexels-photo-12420469.jpeg"
        ],
        pedidosya_link: "#",
        category_id: 4,
        category_name: "Combos"
      },
       {
        id: 404,
        name: "Combo Veggie",
        description: "Hamburguesa Veggie Supreme + Papas Fritas + Coca-Cola 600ml.",
        price: 7800.00,
        images: [
          "https://images.pexels.com/photos/11401287/pexels-photo-11401287.jpeg",
          "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
        ],
        pedidosya_link: "#",
        category_id: 4,
        category_name: "Combos"
      }
    ],
    banners: [
      { id: 1, image_url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" },
      { id: 2, image_url: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg" },
      { id: 3, image_url: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg" }
    ],
    siteSettings: {
      contact_phone: "11-2233-4455",
      contact_email: "info@wolfsburger.com",
      address: "Av. Corrientes 1234, CABA",
      hours: "Mar-Dom: 18:00 - 23:30",
      facebook: "https://facebook.com/wolfsburger",
      instagram: "https://instagram.com/wolfsburger"
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCategories(mockData.categories);
      setProducts(mockData.products);
      setBanners(mockData.banners);
      setSiteSettings(mockData.siteSettings);
      setLoading(false);
    }, 500); // Reducido el tiempo de carga para pruebas más rápidas
  }, []);

  // ... (el resto de las funciones de mock no necesitan cambios)
  const addCategory = async (categoryData) => { const newCategory = { ...categoryData, id: Date.now() }; setCategories(prev => [...prev, newCategory]); return { success: true }; };
  const updateCategory = async (id, categoryData) => { setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...categoryData } : cat)); return { success: true }; };
  const deleteCategory = async (id) => { setCategories(prev => prev.filter(cat => cat.id !== id)); return { success: true }; };
  const addProduct = async (productData) => { const newProduct = { ...productData, id: Date.now() }; setProducts(prev => [...prev, newProduct]); return { success: true }; };
  const updateProduct = async (id, productData) => { setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, ...productData } : prod)); return { success: true }; };
  const deleteProduct = async (id) => { setProducts(prev => prev.filter(prod => prod.id !== id)); return { success: true }; };

  const value = {
    categories,
    products,
    banners,
    siteSettings,
    loading,
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