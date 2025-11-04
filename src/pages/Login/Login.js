import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/loginReducer';
import { ThemeContext } from './../../Context/ThemeContext';
import logo from './../../assets/images/chapado.png';

export default function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { LoginRequest } = useContext(ThemeContext);

  
  const { error, mensagem, loading } = useSelector(state => state.login || {});


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(getUser({ email, senha }));
  };

  useEffect(() => {
    if (!loading && mensagem && !error) {
      onClose?.();
      setEmail('');
      setSenha('');
    }
  }, [mensagem, loading, error, onClose]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ×
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
        </div>

        {/* Alertas */}
        {mensagem && error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {mensagem}
          </div>
        )}
        {mensagem && !error && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {mensagem}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded transition duration-300"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para cadastro */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <span
            onClick={() => navigate("/register/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Registre-se
          </span>
        </div>
      </div>
    </div>
  );
}
