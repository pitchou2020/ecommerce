import React from 'react';
import { useSelector } from 'react-redux';

export default function ResumoPedido() {
  const itensCarrinho = useSelector(state => state.cartReducer.itens);

  if (!itensCarrinho.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-green-600 shadow-xl rounded-lg p-4 w-80 animate-slide-up">
      <h2 className="text-green-700 font-bold text-lg mb-2">Item adicionado ao pedido</h2>
      {itensCarrinho.slice(-1).map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {item.imagem && (
            <img
              src={`https://congolinaria.com.br/img_upload/${item.imagem}`}
              alt={item.nome}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <p className="text-gray-800 font-medium">{item.nome}</p>
            <p className="text-sm text-gray-600">R$ {Number(item.preco).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <p className="text-sm text-gray-500 mt-2">Veja seu pedido no topo da tela.</p>
    </div>
  );
}
