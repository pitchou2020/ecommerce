import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, atualizarQuantidadeItem } from './../../redux/cartReducer';

export default function Carrinho() {
  const carrinho = useSelector(state => state.cartReducer.items);
  const dispatch = useDispatch();

  const removerItem = (id) => {
    dispatch(deleteFromCart(id));
  };

  const atualizarQuantidade = (index, delta) => {
    dispatch(atualizarQuantidadeItem({ index, delta }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Meu Carrinho</h1>

      {carrinho.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        carrinho.map((item, index) => (
          <div key={item.id_produto || index} className="border-b py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{item.nome}</p>
              <p className="text-sm text-gray-600">
                {item.quantidade} x R$ {(item.preco || 0).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => atualizarQuantidade(index, -1)} className="px-2 py-1 bg-red-500 text-white rounded">−</button>
              <button onClick={() => atualizarQuantidade(index, +1)} className="px-2 py-1 bg-green-500 text-white rounded">+</button>
              <button onClick={() => removerItem(item.id_produto)} className="px-2 py-1 bg-gray-600 text-white rounded">Remover</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
