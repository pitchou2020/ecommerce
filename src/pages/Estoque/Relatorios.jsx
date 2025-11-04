import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Relatorios() {
  const BASE_URL = 'https://congolinaria.com.br/api/';
  const [dados, setDados] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());

  useEffect(() => {
    buscarResumo();
  }, [mes, ano]);

  const buscarResumo = () => {
    axios.get(`${BASE_URL}relatorio_resumo.php?mes=${mes}&ano=${ano}`)
      .then(res => setDados(res.data));
  };

  const exportarCSV = () => {
    let csv = 'Produto,Tipo,Quantidade,Destino,Data\n';
    dados.forEach(item => {
      csv += `${item.produto},${item.tipo},${item.quantidade},${item.destino || '-'},${item.data_movimentacao}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `relatorio_${mes}_${ano}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">📊 Relatório de Movimentação</h2>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <select value={mes} onChange={e => setMes(e.target.value)} className="p-2 border rounded-lg">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i+1} value={i+1}>{new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}</option>
          ))}
        </select>

        <select value={ano} onChange={e => setAno(e.target.value)} className="p-2 border rounded-lg">
          {[2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <button onClick={buscarResumo} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Buscar
        </button>

        <button onClick={exportarCSV} className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Exportar CSV
        </button>
      </div>

      <div className="bg-white shadow-md p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Resumo de {mes}/{ano}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2">Produto</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Quantidade</th>
                <th className="p-2">Destino</th>
                <th className="p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.produto}</td>
                  <td className={`p-2 font-semibold ${item.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.tipo.toUpperCase()}
                  </td>
                  <td className="p-2">{item.quantidade}</td>
                  <td className="p-2">{item.destino || '-'}</td>
                  <td className="p-2">{new Date(item.data_movimentacao).toLocaleString()}</td>
                </tr>
              ))}
              {dados.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">Nenhuma movimentação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
