import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AssistenteReceita from './AssistenteReceita';
import PlaylistReceitas from './PlaylistReceitas';

export default function AssistenteCompleto() {
  const [receitas, setReceitas] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [idReceitaAtual, setIdReceitaAtual] = useState(null);
  const [mostrarPlaylist, setMostrarPlaylist] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const location = useLocation();

  // 🔹 Captura o parâmetro da URL (se houver)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    if (idParam) setIdReceitaAtual(idParam);
  }, [location.search]);

  // 🔹 Carrega todas as receitas
  useEffect(() => {
    axios
      .get('https://congolinaria.com.br/api/receitas_autoriais.php')
      .then(res => {
        const lista = Array.isArray(res.data) ? res.data : [];
        setReceitas(lista);

        // 🔹 Extrai categorias únicas
        const categoriasUnicas = [
          ...new Set(lista.map(r => r.categoria).filter(Boolean)),
        ];
        setCategorias(categoriasUnicas);

        // 🔹 Se não houver receita na URL, mostra uma aleatória
        if (!idReceitaAtual && lista.length > 0) {
          const randomIndex = Math.floor(Math.random() * lista.length);
          const aleatoria = lista[randomIndex];
          setIdReceitaAtual(aleatoria.id);
        }
      })
      .catch(err => console.error('Erro ao carregar receitas:', err))
      .finally(() => setCarregando(false));
  }, []);

  const receitasFiltradas = categoriaSelecionada
    ? receitas.filter(r => r.categoria === categoriaSelecionada)
    : receitas;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-neutral-900 text-white">
      {/* CATEGORIAS */}
      <div className="w-full lg:w-1/5 p-4 border-b lg:border-b-0 lg:border-r border-yellow-400 bg-neutral-900 order-1">
        <h2 className="text-lg font-bold mb-4 text-yellow-400">🍽 Categorias</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setCategoriaSelecionada('')}
            className={`cursor-pointer p-2 rounded hover:bg-yellow-500 hover:text-black ${
              categoriaSelecionada === ''
                ? 'bg-yellow-400 text-black font-bold'
                : ''
            }`}
          >
            Todas
          </li>
          {categorias.map((cat, idx) => (
            <li
              key={idx}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`cursor-pointer p-2 rounded hover:bg-yellow-500 hover:text-black ${
                categoriaSelecionada === cat
                  ? 'bg-yellow-400 text-black font-bold'
                  : ''
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* ASSISTENTE CENTRAL */}
      <div className="w-full lg:flex-1 p-4 flex justify-center items-start bg-gray-100 order-2">
        {carregando ? (
          <div className="text-center text-yellow-700 mt-10 bg-yellow-200 p-6 rounded-lg shadow-md">
            Carregando receita aleatória...
          </div>
        ) : idReceitaAtual ? (
          <AssistenteReceita id={idReceitaAtual} />
        ) : (
          <div className="text-center text-yellow-700 mt-10">
            <h2 className="text-2xl font-bold">
              👩🏽‍🍳 Nenhuma receita disponível no momento
            </h2>
          </div>
        )}
      </div>

      {/* BOTÃO MOBILE */}
      <div className="lg:hidden order-3 w-full px-4 mb-2">
        <button
          onClick={() => setMostrarPlaylist(!mostrarPlaylist)}
          className="bg-yellow-500 text-white px-4 py-2 rounded shadow w-full font-semibold"
        >
          {mostrarPlaylist ? '✖️ Fechar Receitas' : '📋 Ver Receitas'}
        </button>
      </div>

      {/* PLAYLIST */}
      <div
        className={`w-full lg:w-1/4 p-4 border-t lg:border-t-0 lg:border-l border-yellow-300 bg-yellow-100 text-black order-4 ${
          mostrarPlaylist ? 'block' : 'hidden'
        } lg:block`}
      >
        <h2 className="text-lg font-bold text-yellow-700 mb-4">📋 Receitas</h2>
        <PlaylistReceitas
          receitas={receitasFiltradas}
          idAtual={idReceitaAtual}
          onSelecionar={id => {
            setIdReceitaAtual(id);
            setMostrarPlaylist(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
}
