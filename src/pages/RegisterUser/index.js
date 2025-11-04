import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../config/configApi';
import logo from './../../assets/images/chapado.png';

export default function RegisterUser({ funcRegister }) {
  const [usuario, setUsuario] = useState([]);
  const [stateInputNome, setStateInputNome] = useState('');
  const [stateInputEmail, setStateInputEmail] = useState('');
  const [stateInputSenha, setStateInputSenha] = useState('');
  const [statusEnvio, setEnvioStatus] = useState({ type: '', mensagem: '' });
  const navigate = useNavigate();

  const addTodo = async (e) => {
    e.preventDefault();

    const newUser = {
      nome: stateInputNome,
      email: stateInputEmail,
      senha: stateInputSenha,
    };

    try {
      const response = await api.post('/usuarios.php', newUser);
      if (response.data.erro) {
        setEnvioStatus({ type: 'error', mensagem: response.data.mensagem });
      } else {
        setEnvioStatus({ type: 'success', mensagem: response.data.mensagem });
      }
    } catch {
      setEnvioStatus({ type: 'error', mensagem: 'Usuário não cadastrado, tente mais tarde!' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 relative">
        {/* Botão fechar */}
        <button
          onClick={funcRegister}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
        </div>

        {/* Mensagens */}
        {statusEnvio.type === 'error' && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded px-4 py-2 mb-4">
            {statusEnvio.mensagem}
          </div>
        )}
        {statusEnvio.type === 'success' && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded px-4 py-2 mb-4">
            {statusEnvio.mensagem}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={addTodo} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={stateInputNome}
            onChange={(e) => setStateInputNome(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={stateInputEmail}
            onChange={(e) => setStateInputEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400"
            required
          />

          <input
            type="password"
            placeholder="Criar uma senha"
            name="senha"
            value={stateInputSenha}
            onChange={(e) => setStateInputSenha(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded transition duration-300"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Já tem cadastro?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-600 hover:underline cursor-pointer">
            Entrar
          </span>
        </div>
      </div>
    </div>
  );
}
