import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// 1. Unificamos la importación aquí. Ahora importamos todo lo necesario de DataContext en una sola línea.
import { DataProvider, useData } from './contexts/DataContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBanners from './pages/admin/AdminBanners';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSettings from './pages/admin/AdminSettings';

// Layout Components
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import AdminAppearance from './pages/admin/AdminAppearance'; 
import ThemeManager from './components/common/ThemeManager';

// Componente interno para manejar el Favicon
const FaviconManager = () => {
  const { siteSettings } = useData();

  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon && siteSettings.site_logo_url) {
      favicon.href = siteSettings.site_logo_url;
    }
  }, [siteSettings.site_logo_url]);

  return null; // Este componente no renderiza nada visible
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeManager /> 
        <Router>
          <FaviconManager />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="appearance" element={<AdminAppearance />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;