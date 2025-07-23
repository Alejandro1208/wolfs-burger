import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  FolderOpen, 
  Package, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'; // Importamos el logo

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Banners', href: '/admin/banners', icon: Image },
    { name: 'Categorías', href: '/admin/categories', icon: FolderOpen },
    { name: 'Productos', href: '/admin/products', icon: Package },
    { name: 'Configuración', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    // CAMBIO: Fondo rojo (bg-primary) y texto claro
    <div className="bg-primary text-white w-64 min-h-screen flex flex-col">
      {/* CAMBIO: Logo en la parte superior */}
      <div className="p-6 border-b border-white/20 flex justify-center">
        <Link to="/admin">
          <img src={logo} alt="Wolf's Burger Logo" className="h-20 w-auto" />
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-white/90 text-primary' // Estilo para el enlace activo
                  : 'text-white hover:bg-white/20' // Estilo para enlaces inactivos
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;