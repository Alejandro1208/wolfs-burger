import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';


import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';


import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBanners from './pages/admin/AdminBanners';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAppearance from './pages/admin/AdminAppearance'; 
import AdminUsers from './pages/admin/AdminUsers';
import AdminServices from './pages/admin/AdminServices';

import ServiciosPage from './pages/public/ServiciosPage';

import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ThemeManager from './components/common/ThemeManager';


const FaviconManager = () => {
  const { siteSettings } = useData();

  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon && siteSettings.site_logo_url) {
      favicon.href = siteSettings.site_logo_url;
    }
  }, [siteSettings.site_logo_url]);

  return null; 
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeManager /> 
        <Router>
          <FaviconManager />
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="servicios" element={<ServiciosPage />} />
              <Route path="menu" element={<MenuPage />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="appearance" element={<AdminAppearance />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="users" element={<AdminUsers />} /> 
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;