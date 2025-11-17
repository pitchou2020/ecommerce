import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaylistReceitas.css';

export default function PlaylistReceitas({
  modoCompacto = false,
  idAtual = null,
  receitas = [],
  onSelecionar = null
}) {
  const [favoritas, setFavoritas] = useState(() => JSON.parse(localStorage.getItem('favoritas')) || []);
  const [busca, setBusca] = useState('');
  const [velocidadeMarquee, setVelocidadeMarquee] = useState(() => {
    return parseInt(localStorage.getItem('velocidadeMarquee')) || 6;
  });

  const toggleFavorita = (id) => {
    const atualizadas = favoritas.includes(id)
      ? favoritas.filter(favId => favId !== id)
      : [...favoritas, id];
    setFavoritas(atualizadas);
    localStorage.setItem('favoritas', JSON.stringify(atualizadas));
  };

  const receitasFiltradas = receitas.filter(r =>
    r.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={`${modoCompacto ? 'max-h-[240px] overflow-y-auto p-2' : 'p-6'} bg-yellow-100`}>
      {!modoCompacto && (
        <>
          <h1 className="text-2xl font-bold text-yellow-800 mb-3">🎵 Playlist de Receitas</h1>
          <input
            type="text"
            placeholder="🔍 Buscar receita..."
            className="mb-3 px-3 py-2 border rounded w-full text-black"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </>
      )}

      <div className="grid gap-2">
        {receitasFiltradas.map(r => {
          const tempoTotal = r.etapas?.reduce((acc, e) => acc + parseInt(e.tempo || 0), 0);
          const isFavorita = favoritas.includes(r.id);

          return (
            <div
              key={r.id}
              className={`px-3 py-2 rounded-lg shadow border flex items-center justify-between ${
                r.id === idAtual
                  ? 'bg-yellow-300 border-yellow-600'
                  : 'bg-yellow-100 border-yellow-300'
              }`}
            >
              <div className="w-full">
                {r.id === idAtual ? (
                  <div className="marquee-container" style={{ '--velocidade': `${velocidadeMarquee}s` }}>
                    <span className="marquee-text">▶️ {r.titulo}</span>
                  </div>
                ) : (
                  <p className="font-medium text-yellow-800 truncate max-w-[200px]">▶️ {r.titulo}</p>
                )}

                {!modoCompacto && (
                  <p className="text-xs text-yellow-700">⏱ {tempoTotal || 0}s | 📂 {r.categoria}</p>
                )}
              </div>

              <div className="flex gap-2 items-center ml-2">
                <button
                  onClick={() => toggleFavorita(r.id)}
                  className={`text-xl ${isFavorita ? 'text-yellow-600' : 'text-gray-400'}`}
                  title="Favoritar"
                >
                  ★
                </button>
                <button
                  onClick={() => {
                    if (typeof onSelecionar === 'function') {
                      onSelecionar(r.id);
                    }
                  }}
                  className={`text-lg ${r.id === idAtual ? 'text-green-700 font-bold' : ''}`}
                  title="Abrir Receita"
                >
                  ▶
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!modoCompacto && (
        <div className="mt-4">
          <label className="text-sm text-yellow-700 font-medium mr-2">Velocidade do título:</label>
          <input
            type="range"
            min="3"
            max="20"
            step="1"
            value={velocidadeMarquee}
            onChange={e => {
              const nova = Number(e.target.value);
              setVelocidadeMarquee(nova);
              localStorage.setItem('velocidadeMarquee', nova);
            }}
            className="align-middle"
          />
          <span className="ml-2 text-yellow-700 text-sm">{velocidadeMarquee}s</span>
        </div>
      )}
    </div>
  );
}
