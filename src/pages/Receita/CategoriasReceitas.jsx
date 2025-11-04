import React from "react";

const categorias = [
  "Todas",
  "Pratos principais",
  "Sobremesas",
  "Bebidas",
  "Entradas",
  "Salgados",
  "Molhos",
];

export default function CategoriasReceitas({ categoriaSelecionada, onSelect }) {
  return (
    <aside className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4 text-yellow-700">Categorias</h2>
      <ul className="space-y-2">
        {categorias.map((categoria) => (
          <li
            key={categoria}
            onClick={() => onSelect && onSelect(categoria)}
            className={`cursor-pointer p-2 border rounded hover:bg-yellow-100 transition duration-200 ${
              categoriaSelecionada === categoria
                ? "bg-yellow-200 font-semibold border-yellow-400"
                : "border-gray-200"
            }`}
          >
            {categoria}
          </li>
        ))}
      </ul>
    </aside>
  );
}
