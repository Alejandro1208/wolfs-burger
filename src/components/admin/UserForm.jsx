import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Modal from '../common/Modal';

const UserForm = ({ user, onClose }) => {
    const { addUser, updateUser } = useData();
    const [formData, setFormData] = useState({
        email: user?.email || '',
        role: user?.role || 'admin',
        password: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);

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
        <Modal onClose={onClose}>
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
                <button onClick={onClose}><X size={20}/></button>
            </div>
            <form id="user-form" onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-styled"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">Contraseña</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={user ? "Dejar en blanco para no cambiar" : "Requerida"} required={!user} className="input-styled"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">Rol *</label>
                    <select name="role" value={formData.role} onChange={handleChange} required className="input-styled">
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
            </form>
            <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                <button type="submit" form="user-form" disabled={isProcessing} className="btn-primary">
                    {isProcessing ? 'Guardando...' : 'Guardar Usuario'}
                </button>
            </div>
        </Modal>
    );
};

export default UserForm;