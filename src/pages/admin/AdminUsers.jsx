import React, { useState } from 'react';
import { UserPlus, Edit, Trash2, ShieldCheck, User } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import UserForm from '../../components/admin/UserForm';

const AdminUsers = () => {
  const { users, deleteUser, loading } = useData();
  const { user: currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpenForm = (user = null) => {
    setEditingUser(user);
    setShowForm(true);
  };
  
  const handleCloseForm = () => setShowForm(false);

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
        alert("No puedes eliminar tu propio usuario.");
        return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      await deleteUser(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestionar Usuarios</h1>
          <p className="mt-2 text-gray-600">Añade, edita o elimina usuarios administradores.</p>
        </div>
        <button onClick={() => handleOpenForm()} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-2">
          <UserPlus size={16}/> Nuevo Usuario
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className={`p-2 rounded-full ${user.role === 'superadmin' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                {user.role === 'superadmin' ? <ShieldCheck size={20}/> : <User size={20}/>}
              </div>
              <div className="flex-grow">
                  <p className="font-semibold text-gray-900">{user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="flex items-center gap-2">
                {user.id !== 1 && (
                    <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-md" title="Eliminar"><Trash2 size={16}/></button>
                )}
                <button onClick={() => handleOpenForm(user)} className="p-2 text-gray-500 hover:text-indigo-600 rounded-md" title="Editar"><Edit size={16}/></button>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center py-4">Cargando...</p>}
         {!loading && users.length === 0 && (
            <div className="text-center py-12"><p className="text-gray-500">No hay usuarios creados.</p></div>
        )}
      </div>
      
      {showForm && <UserForm user={editingUser} onClose={handleCloseForm} />}
    </div>
  );
};

export default AdminUsers;