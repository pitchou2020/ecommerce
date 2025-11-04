import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBoxes, FaHistory, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';

export default function SidebarEstoqueResponsive() {
  const [aberto, setAberto] = useState(false);
  const location = useLocation();

  const menu = [
    { path: '/admin/estoque', label: 'Estoque', icon: <FaBoxes /> },
    { path: '/admin/estoque/historico', label: 'Histórico', icon: <FaHistory /> },
    { path: '/admin/estoque/relatorio', label: 'Relatórios', icon: <FaChartBar /> },
  ];

  return (
    <>
      {/* Botão hamburguer visível só no mobile */}
      <button
        className="sm:hidden p-4 text-2xl fixed top-2 left-2 z-50 text-white bg-green-600 rounded-full"
        onClick={() => setAberto(!aberto)}
      >
        {aberto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar responsiva */}
      <aside
        className={`bg-white w-64 h-full fixed top-0 left-0 shadow-lg transform ${
          aberto ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40 sm:translate-x-0 sm:static sm:block`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-700">🍃 Congolinaria</h2>
          <button className="sm:hidden text-xl" onClick={() => setAberto(false)}>
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md font-medium ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setAberto(false)} // fecha no mobile ao clicar
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
