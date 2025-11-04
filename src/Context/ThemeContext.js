import { useNavigate } from 'react-router-dom';
import React, { createContext, useState, useEffect } from 'react';
import useDimension from '../useDimention';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const withBrowser = useDimension();

  const [theme, setTheme] = useState('hello Context');
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [statusLogin, setStatusLogin] = useState({ codigo: '', type: '', mensagem: '' });

  const toggleModal = () => setShowModal(!showModal);

  const resize = () => {
    if (withBrowser < 768) {
      const sidebar = document.querySelector("#sidebar");
      if (sidebar) sidebar.classList.add('hide2');
    }
  };

  const LoginRequest = async (e, email, senha) => {
    e.preventDefault();

    const navigate = useNavigate(); // ⬅️ o hook só é chamado aqui, dentro da função
    const payload = { email, senha };

    try {
      const response = await fetch('https://congolinaria.com.br/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Resposta do login:', data);

      if (data.logado) {
        setStatusLogin({ codigo: 200, type: 'success', mensagem: data.mensagem });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('idUser', data.id_usuario || '');
        localStorage.setItem('nivel', data.nivel || '');
        setIsLoggedIn(true);

        if (data.nivel === 'administrador') {
          navigate('/admin/cardapio');
        } else {
          navigate('/recettes');
        }
      } else {
        setStatusLogin({ codigo: 400, type: 'error', mensagem: data.mensagem || 'Erro ao fazer login.' });
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setStatusLogin({ codigo: 500, type: 'error', mensagem: 'Erro de conexão com o servidor.' });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resize,
        showModal,
        toggleModal,
        isLoggedIn,
        setIsLoggedIn,
        LoginRequest,
        statusLogin,
        setStatusLogin,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
