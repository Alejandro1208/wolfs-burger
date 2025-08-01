import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  FolderOpen, 
  Package, 
  Settings,
  Palette 
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
    },
    {
      name: 'Categorías',
      value: categories.length,
      icon: FolderOpen,
      color: 'bg-green-500',
    },
    {
      name: 'Imágenes Portada',
      value: banners.length,
      icon: Image,
      color: 'bg-purple-500',
    }
  ];

  const quickActions = [
    {
      name: 'Gestionar Portada',
      description: 'Edita el texto y las imágenes de la página principal.',
      href: '/admin/banners',
      icon: Image,
    },
    {
      name: 'Gestionar Productos',
      description: 'Administra el catálogo de productos y categorías.',
      href: '/admin/products',
      icon: Package,
    },
    {
      name: 'Personalizar Apariencia',
      description: 'Cambia los colores principales de tu marca.',
      href: '/admin/appearance',
      icon: Palette,
    },
    {
      name: 'Configuración General',
      description: 'Ajusta los datos de contacto, redes y logo.',
      href: '/admin/settings',
      icon: Settings,
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido al panel de administración.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className={`${stat.color} rounded-md p-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones Rápidas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                to={action.href}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 block border hover:border-primary"
              >
                <Icon className={`h-8 w-8 text-primary mb-4`} />
                <h3 className="text-base font-semibold text-gray-900 mb-2">
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
    </div>
  );
};

export default AdminDashboard;