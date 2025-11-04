import React, { useEffect, useState } from 'react';
import  api  from '../../config/configApi';
import AdminDashboard from './AdminDashboard';

function Dashbord({ numRecettes, usuarios, func }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    api.get('orders', { per_page: 20 })
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar pedidos:', error);
      });
  };

  return (
    <section className="p-6 bg-white rounded shadow">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <nav className="text-sm text-gray-500 mt-2">
          <span className="mr-2"><a href="/admin" className="text-blue-600 hover:underline">Dashboard</a></span>
          &gt;
          <span className="ml-2">Home</span>
        </nav>
      </header>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded flex items-center gap-4 shadow">
          <div className="text-blue-600 text-3xl">📅</div>
          <div>
            <h3 className="text-xl font-bold">{numRecettes}</h3>
            <p className="text-gray-600 text-sm">Receitas</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded flex items-center gap-4 shadow">
          <div className="text-green-600 text-3xl">👥</div>
          <div>
            <h3 className="text-xl font-bold">{usuarios.length}</h3>
            <p className="text-gray-600 text-sm">Usuários</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded flex items-center gap-4 shadow">
          <div className="text-yellow-600 text-3xl">💰</div>
          <div>
            <h3 className="text-xl font-bold">R$ 2.543</h3>
            <p className="text-gray-600 text-sm">Vendas Totais</p>
          </div>
        </div>
      </div>

      {/* Tabela de pedidos */}
      <div className="overflow-x-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">Últimos Pedidos</h2>
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Data</th>
              <th className="p-3">Total</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Email</th>
              <th className="p-3">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.date_created?.split('T')[0]}</td>
                <td className="p-3">R$ {order.total}</td>
                <td className="p-3">{order.billing?.first_name}</td>
                <td className="p-3">{order.billing?.email}</td>
                <td className="p-3">{order.billing?.address_1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Painel de tarefas (simples) */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Tarefas (To-do)</h3>
        <ul className="space-y-2">
          {['Organizar estoque', 'Atualizar cardápio', 'Confirmar reservas'].map((tarefa, idx) => (
            <li key={idx} className="bg-white p-2 border rounded flex justify-between items-center">
              <p className="text-sm text-gray-700">{tarefa}</p>
              <span className="text-gray-400 text-xs">⋮</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <AdminDashboard />
      </div>
    </section>
  );
}

export default Dashbord;
