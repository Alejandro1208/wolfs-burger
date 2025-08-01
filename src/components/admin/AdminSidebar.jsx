import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  FolderOpen, 
  Package, 
  Settings,
  LogOut,
  Palette 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { UserCog } from 'lucide-react';

const AdminSidebar = () => {
  const { user } = useAuth(); 
  const location = useLocation();
  const { logout } = useAuth();
  const { siteSettings } = useData();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Portada', href: '/admin/banners', icon: Image }, 
    { name: 'Categorías', href: '/admin/categories', icon: FolderOpen },
    { name: 'Productos', href: '/admin/products', icon: Package },
    { name: 'Apariencia', href: '/admin/appearance', icon: Palette }, 
    { name: 'Configuración', href: '/admin/settings', icon: Settings },
  ];

  if (user && user.role === 'superadmin') {
    navigation.push({ name: 'Usuarios', href: '/admin/users', icon: UserCog });
  }
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-primary text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/20 flex justify-center">
        <Link to="/admin">
          <img src={siteSettings.site_logo_url || " "} alt="Logo" className="h-20 w-auto" />
        </Link>
      </div>

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
                  ? 'bg-white/90 text-primary'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

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