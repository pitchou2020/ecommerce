import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HistoricoMovimentacao() {
  const BASE_URL = 'https://congolinaria.com.br/api/';

  const [historico, setHistorico] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtoFiltro, setProdutoFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [destinoFiltro, setDestinoFiltro] = useState('');

  useEffect(() => {
    carregarProdutos();
    buscarHistorico();
  }, []);

  const carregarProdutos = () => {
    axios.get(`${BASE_URL}produtos.php`).then(res => setProdutos(res.data));
  };

  const buscarHistorico = () => {
    let url = `${BASE_URL}historico_movimentacao.php`;
    const params = [];

    if (produtoFiltro) params.push(`id_produto=${produtoFiltro}`);
    if (tipoFiltro) params.push(`tipo=${tipoFiltro}`);
    if (destinoFiltro) params.push(`destino=${destinoFiltro}`);

    if (params.length > 0) url += '?' + params.join('&');

    axios.get(url).then(res => setHistorico(res.data));
  };

  const formatarQuantidade = (valor) => {
    if (valor == null) return 0;
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Histórico de Movimentação</h2>

      <div className="bg-white shadow-md p-6 rounded-xl mb-10">
        <h3 className="font-semibold text-lg mb-4 text-gray-600">Filtros</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <select value={produtoFiltro} onChange={e => setProdutoFiltro(e.target.value)} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Todos os Produtos</option>
            {produtos.map(prod => (
              <option key={prod.id} value={prod.id}>{prod.nome}</option>
            ))}
          </select>

          <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Entrada e Saída</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <select value={destinoFiltro} onChange={e => setDestinoFiltro(e.target.value)} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Todos os Destinos</option>
            <option value="producao">Produção</option>
            <option value="sumare">Sumaré</option>
            <option value="penha">Penha</option>
          </select>

          <button onClick={buscarHistorico} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
            Buscar
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-xl">
        <h3 className="font-semibold text-lg mb-4 text-gray-600">Movimentações</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3">Data</th>
                <th className="p-3">Produto</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Quantidade</th>
                <th className="p-3">Destino</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{new Date(item.data_movimentacao).toLocaleString()}</td>
                  <td className="p-3">{item.produto}</td>
                  <td className={`p-3 font-semibold ${item.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.tipo.toUpperCase()}
                  </td>
                  <td className="p-3">{formatarQuantidade(item.quantidade)}</td>
                  <td className="p-3">{item.destino ? item.destino.toUpperCase() : '-'}</td>
                </tr>
              ))}
              {historico.length === 0 && (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nenhuma movimentação encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
