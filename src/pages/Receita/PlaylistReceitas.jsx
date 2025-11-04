import React from "react";

const receitasExemplo = [
  {
    id: 1,
    titulo: "Kwanga com Mafé",
    tempo: "45 min",
  },
  {
    id: 2,
    titulo: "Fufu com Molho de Amendoim",
    tempo: "40 min",
  },
  {
    id: 3,
    titulo: "Mikate (Bolinho Africano)",
    tempo: "30 min",
  },
  {
    id: 4,
    titulo: "Moqueca de Banana da Terra",
    tempo: "50 min",
  },
];

export default function PlaylistReceitas({ onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-lg font-semibold mb-4 text-yellow-700">Receitas</h2>
      <ul className="space-y-2">
        {receitasExemplo.map((receita) => (
          <li
            key={receita.id}
            onClick={() => onSelect && onSelect(receita)}
            className="cursor-pointer p-2 border border-yellow-200 rounded hover:bg-yellow-100 transition duration-200"
          >
            <div className="font-medium">{receita.titulo}</div>
            <div className="text-sm text-gray-500">{receita.tempo}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
