import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  FolderOpen, 
  Package, 
  Settings,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminDashboard = () => {
  const { products, categories, banners } = useData();

  const stats = [
    {
      name: 'Total Productos',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Categorías',
      value: categories.length,
      icon: FolderOpen,
      color: 'bg-green-500',
      change: '+2%',
      changeType: 'increase'
    },
    {
      name: 'Banners Activos',
      value: banners.length,
      icon: Image,
      color: 'bg-purple-500',
      change: '0%',
      changeType: 'neutral'
    },
    {
      name: 'Ventas del Mes',
      value: '1,234',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      change: '+23%',
      changeType: 'increase'
    }
  ];

  const quickActions = [
    {
      name: 'Gestionar Banners',
      description: 'Administra las imágenes del carrusel principal',
      href: '/admin/banners',
      icon: Image,
      color: 'bg-purple-500'
    },
    {
      name: 'Gestionar Categorías',
      description: 'Crea y edita categorías de productos',
      href: '/admin/categories',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      name: 'Gestionar Productos',
      description: 'Administra el catálogo de productos',
      href: '/admin/products',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Configuración',
      description: 'Ajusta la configuración del sitio',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido al panel de administración de Burger House
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 
                      stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                to={action.href}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 block"
              >
                <div className={`${action.color} rounded-md p-3 w-fit mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {action.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Actividad Reciente</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <Package className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Nuevo producto agregado: "Triple Bacon Deluxe"
                </p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Image className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Banner actualizado en página principal
                </p>
                <p className="text-xs text-gray-500">Hace 5 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Settings className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Configuración de contacto actualizada
                </p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;