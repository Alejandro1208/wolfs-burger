import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();
const BASE_API_URL = "https://alejandrosabater.com.ar/api";

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within a DataProvider");
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
            const [
                bannersRes,
                heroRes,
                categoriesRes,
                settingsRes,
                productsRes,
                usersRes,
            ] = await Promise.all([
                fetch(`${BASE_API_URL}/banners.php`),
                fetch(`${BASE_API_URL}/hero.php`),
                fetch(`${BASE_API_URL}/categories.php`),
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
            console.error("Error fetching initial data from API:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApiResponse = async (response) => {
        try {
            const result = await response.json();
            if (
                response.ok &&
                (result.success === true || result.success === undefined)
            ) {
                await fetchData(); // Recargamos todos los datos para mantener la consistencia
                return { success: true, ...result };
            }
            console.error("API Error Response:", result);
            return {
                success: false,
                error: result.error || "Error desconocido desde la API.",
            };
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
            return {
                success: false,
                error: "La respuesta del servidor no es un JSON válido.",
            };
        }
    };

    const addBanner = (formData) =>
        fetch(`${BASE_API_URL}/banners.php`, {
            method: "POST",
            body: formData,
        }).then(handleApiResponse);
    const deleteBanner = (id) =>
        fetch(`${BASE_API_URL}/banners.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        }).then(handleApiResponse);
    const updateHeroContent = (heroData) =>
        fetch(`${BASE_API_URL}/hero.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(heroData),
        }).then(handleApiResponse);
    const updateSiteSettings = (formData) =>
        fetch(`${BASE_API_URL}/settings.php`, {
            method: "POST",
            body: formData,
        }).then(handleApiResponse);
    const addProduct = (formData) =>
        fetch(`${BASE_API_URL}/products.php`, {
            method: "POST",
            body: formData,
        }).then(handleApiResponse);
    const deleteProduct = (id) =>
        fetch(`${BASE_API_URL}/products.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        }).then(handleApiResponse);

    const updateProduct = async (formData) => {
        formData.append("_method", "PUT");
        const response = await fetch(`${BASE_API_URL}/products.php`, {
            method: "POST",
            body: formData,
        });
        return handleApiResponse(response);
    };

    const addCategory = (formData) =>
        fetch(`${BASE_API_URL}/categories.php`, {
            method: "POST",
            body: formData,
        }).then(handleApiResponse);

    const updateCategory = async (formData) => {
        formData.append("_method", "PUT");
        const response = await fetch(`${BASE_API_URL}/categories.php`, {
            method: "POST",
            body: formData,
        });
        return handleApiResponse(response);
    };

    const deleteCategory = (id) =>
        fetch(`${BASE_API_URL}/categories.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        }).then(handleApiResponse);

    const addUser = (userData) =>
        fetch(`${BASE_API_URL}/users.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        }).then(handleApiResponse);

    const updateUser = (userData) =>
        fetch(`${BASE_API_URL}/users.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        }).then(handleApiResponse);

    const deleteUser = (id) =>
        fetch(`${BASE_API_URL}/users.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        }).then(handleApiResponse);

    const value = {
        categories,
        products,
        banners,
        heroContent,
        siteSettings,
        users,
        loading,
        fetchData,
        addBanner,
        deleteBanner,
        updateHeroContent,
        updateSiteSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addUser,
        updateUser,
        deleteUser,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
