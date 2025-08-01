import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const UserForm = ({ user, onClose }) => {
    const { addUser, updateUser } = useData();
    const [formData, setFormData] = useState({
        email: user?.email || '',
        role: user?.role || 'admin',
        password: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        if (user) {
            await updateUser({ id: user.id, ...formData });
        } else {
            await addUser(formData);
        }
        setIsProcessing(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" style={{ marginTop: 0 }}>
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </div>
                <form id="user-form" onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-styled w-full"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={user ? "Dejar en blanco para no cambiar" : "Requerida"} required={!user} className="input-styled w-full"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Rol *</label>
                        <select name="role" value={formData.role} onChange={handleChange} required className="input-styled w-full">
                            <option value="admin">Admin (Gestiona todo menos otros usuarios)</option>
                            <option value="superadmin">Super Admin (Control total)</option>
                        </select>
                    </div>
                </form>
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm">Cancelar</button>
                    <button type="submit" form="user-form" disabled={isProcessing} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        {isProcessing ? 'Guardando...' : 'Guardar Usuario'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;