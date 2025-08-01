import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../public/PublicHeader';
import PublicFooter from '../public/PublicFooter';
import { useData } from '../../contexts/DataContext';
import FloatingButtons from '../public/FloatingButtons';

const PublicLayout = () => {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <FloatingButtons /> 
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;