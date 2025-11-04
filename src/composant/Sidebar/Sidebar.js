import React from 'react';
import { MenuData } from './MenuData';
import { useNavigate } from 'react-router-dom';
import favicon from './../../assets/images/logo_rouge.png';

function Sidebar() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  return (
    <div className="w-64 min-h-screen bg-red-700 text-white flex flex-col justify-between shadow-lg">
      {/* Logo / topo */}
      <div className="p-4 flex items-center gap-3 border-b border-red-600">
        <img src={favicon} alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-lg font-bold">Admin</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {MenuData.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 transition-all duration-200"
              >
                <i className={`${item.icone} text-lg`}></i>
                <span className="text-sm font-medium">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Rodapé */}
      <footer className="p-4 border-t border-red-600">
        <button
          onClick={goHome}
          className="w-full bg-white text-red-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}

export default Sidebar;
