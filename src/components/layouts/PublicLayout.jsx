import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../public/PublicHeader';
import PublicFooter from '../public/PublicFooter';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;