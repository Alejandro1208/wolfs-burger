import React from 'react';
import { UserPlus } from 'lucide-react';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestionar Usuarios</h1>
          <p className="mt-2 text-gray-600">Añade, edita o elimina usuarios administradores.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus size={16}/> Nuevo Usuario
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-500">Próximamente: Aquí se mostrará la lista de usuarios para gestionarlos.</p>
      </div>
    </div>
  );
};

export default AdminUsers;