import React from 'react';
import SidebarEstoque from './SidebarEstoqueResponsive';
import { Outlet } from 'react-router-dom';

export default function AppEstoque() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <SidebarEstoque />
      <main className="flex-1 p-4 sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
