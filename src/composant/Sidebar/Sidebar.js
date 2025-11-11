import React from 'react';
import { MenuData } from './MenuData';
import { useNavigate, useLocation } from 'react-router-dom';
import favicon from './../../assets/images/logo_rouge.png';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => navigate("/");

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-red-800 to-red-700 text-white flex flex-col justify-between shadow-xl border-r border-red-900">
      
      {/* Topo / Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-red-600">
        <img src={favicon} alt="Logo" className="h-11 w-11 object-contain" />
        <span className="text-xl font-bold tracking-wide">Admin</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-5">
        <ul className="space-y-1">
          {MenuData.map((item, index) => {
            const ativo = location.pathname === item.url;
            
            return (
              <li key={index}>
                <button
                  onClick={() => navigate(item.url)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                    transition-all duration-300 group
                    ${ativo 
                      ? "bg-red-600 border-l-4 border-white shadow-md" 
                      : "hover:bg-red-600/70 hover:shadow-lg"
                    }
                  `}
                >
                  <i
                    className={`${item.icone} text-lg 
                      ${ativo ? "text-white" : "group-hover:text-white/90"}
                    `}
                  ></i>

                  <span className="text-sm font-medium tracking-wide">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Rodapé */}
      <footer className="p-5 border-t border-red-600">
        <button
          onClick={goHome}
          className="
            w-full bg-white text-red-700 font-semibold px-4 py-2 
            rounded-lg shadow hover:bg-gray-100 transition-all
          "
        >
          Voltar
        </button>
      </footer>
    </div>
  );
}

export default Sidebar;
