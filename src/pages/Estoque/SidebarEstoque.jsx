import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBoxes, FaHistory, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';

export default function SidebarEstoque() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { path: '/admin/estoque', label: 'Estoque', icon: <FaBoxes /> },
    { path: '/admin/estoque/historico', label: 'Histórico', icon: <FaHistory /> },
    { path: '/admin/estoque/relatorio', label: 'Relatórios', icon: <FaChartBar /> },
  ];

  return (
    <>
      {/* Botão hambúrguer visível no mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar fixo em desktop */}
      <aside className="w-64 h-screen bg-white border-r shadow-md fixed left-0 top-0 p-6 hidden sm:block z-40">
        <h2 className="text-xl font-bold mb-6 text-gray-800">📦 Congolinaria</h2>
        <nav className="flex flex-col gap-3">
          {menu.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md font-medium ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar no mobile (slide-in) */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 p-6 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-xl font-bold mb-6 text-gray-800">📦 Congolinaria</h2>
        <nav className="flex flex-col gap-3">
          {menu.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 p-2 rounded-md font-medium ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
