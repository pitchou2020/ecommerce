import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Dashbord from './dashbord';
import NavMenuAdmin from '../../composant/navMenu/NavMenuAdmin';
import Sidebar from '../../composant/Sidebar/Sidebar';
import { ThemeContext } from './../../Context/ThemeContext';

function Admin() {
  const [dataRestaurantes, setDataRestaurantes] = useState([]);
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const UrlBase = 'http://localhost/RestoAfrica/src/views/';
  const { isLoggedIn } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn !== 'administrador') {
      navigate('/login');
      return;
    }

    getRestaurantes();
    getUsuarios();
  }, [isLoggedIn]);

  const getRestaurantes = async () => {
    try {
      const response = await fetch(UrlBase + 'recettes.php');
      const data = await response.json();
      setDataRestaurantes(data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  const getUsuarios = async () => {
    try {
      const response = await fetch(UrlBase + 'usuarios.php');
      const data = await response.json();
      setDataUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Top menu */}
        <header className="bg-white shadow p-4">
          <NavMenuAdmin />
        </header>

        {/* Dashboard */}
        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel Administrativo</h1>
          <Dashbord
            numRecettes={dataRestaurantes.length}
            usuarios={dataUsuarios}
            func={getUsuarios}
          />
        </main>
      </div>
    </div>
  );
}

export default Admin;
