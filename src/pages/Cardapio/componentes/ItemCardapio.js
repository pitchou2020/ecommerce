import React from 'react';
import { ImageOff } from 'lucide-react';

export default function ItemCardapio({ item, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
      <div className="flex items-start gap-4">
        {item.imagem ? (
          <img src={`https://congolinaria.com.br/${item.imagem}`} alt={item.titulo} className="h-16 w-16 rounded object-cover" />
        ) : (
          <div className="h-16 w-16 rounded bg-gray-200 flex items-center justify-center text-gray-400">
            <ImageOff size={20} />
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-neutral-800">{item.titulo}</p>
          <p className="text-sm text-neutral-600">{item.descricao}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-yellow-900">R$ {item.preco}</span>
        <button className="bg-yellow-800 hover:bg-yellow-700 text-white px-4 py-1 rounded transition" onClick={() => onAdd(item)}>Pedir</button>
      </div>
    </div>
  );
}
