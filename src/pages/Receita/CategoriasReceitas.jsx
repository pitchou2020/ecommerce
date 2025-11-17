import React from 'react';

export default function CategoriasReceitas({ categorias, onFiltrar }) {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-yellow-800 text-white p-4 overflow-y-auto max-h-screen hidden md:block">
      <h3 className="text-lg font-bold mb-3">🍲 Categorias</h3>
      <ul className="space-y-2">
        {categorias.map((cat, idx) => (
          <li
            key={idx}
            onClick={() => onFiltrar(cat)}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
