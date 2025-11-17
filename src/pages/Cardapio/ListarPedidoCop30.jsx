import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListarPedidoCop30() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get('https://congolinaria.com.br/api/pedidos_cop30.php')
      .then(res => {
        setPedidos(res.data);
        setCarregando(false);
      })
      .catch(err => {
        console.error('Erro ao carregar pedidos:', err);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p className="p-4">Carregando pedidos...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lista de Pedidos COP30</h2>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-bold text-lg">Pedido #{pedido.id}</h3>
              <p><strong>Cliente:</strong> {pedido.nome_cliente}</p>
              <p><strong>Contato:</strong> {pedido.telefone} | {pedido.email}</p>
              <p><strong>Data:</strong> {pedido.data}</p>
              <p><strong>Itens:</strong></p>
              <ul className="list-disc ml-6">
                {pedido.itens && pedido.itens.map((item, idx) => (
                  <li key={idx}>{item.quantidade}x {item.nome_prato}</li>
                ))}
              </ul>
              <p><strong>Total:</strong> R$ {Number(pedido.valor_total).toFixed(2)}</p>
              <p><strong>Status:</strong> {pedido.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
