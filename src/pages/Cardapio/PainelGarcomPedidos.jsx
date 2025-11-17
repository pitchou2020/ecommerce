import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PainelGarcomPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('abertos');

  const pedidosFiltrados = pedidos.filter(p =>
    filtro === 'todos' ? true :
    filtro === 'abertos' ? p.status === 'aberto' :
    filtro === 'fechados' ? p.status === 'fechado' : true
  );

  useEffect(() => {
    const buscarPedidos = () => {
      axios.get('https://congolinaria.com.br/api/listar_pedidos_cop30.php')
        .then(res => setPedidos(res.data))
        .catch(err => console.error(err));
    };

    buscarPedidos();
    const intervalo = setInterval(buscarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const fecharPedido = (id) => {
    axios.post('https://congolinaria.com.br/api/fechar_pedido.php', { id })
      .then(() => {
        setPedidos(pedidos.map(p => p.id === id ? { ...p, status: 'fechado' } : p));
        alert('Pedido fechado para cobrança.');
      })
      .catch(err => alert('Erro ao fechar pedido.'));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pedidos – Garçom</h1>

      <div className="flex gap-2 mb-4">
        {['todos', 'abertos', 'fechados'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1 rounded ${filtro === f ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            {f === 'todos' ? 'Todos' : f === 'abertos' ? 'Em Aberto' : 'Fechados'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pedidosFiltrados.map(pedido => (
          <div key={pedido.id} className="border rounded-xl p-4 shadow bg-white">
            <h2 className="font-bold text-lg">Mesa: {pedido.mesa}</h2>
            <p className="text-sm text-gray-600">Pessoas: {pedido.pessoas}</p>
            <p className="text-sm text-gray-600">{new Date(pedido.data_hora).toLocaleString()}</p>
            <ul className="mt-2 list-disc list-inside">
              {pedido.itens.map(item => (
                <li key={item.id}>{item.quantidade}x {item.nome_prato}</li>
              ))}
            </ul>
            {pedido.observacoes && (
              <p className="mt-2 text-sm italic text-red-600">Obs: {pedido.observacoes}</p>
            )}
            {pedido.status === 'aberto' && (
              <button
                onClick={() => fecharPedido(pedido.id)}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
              >
                Fechar Pedido
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
