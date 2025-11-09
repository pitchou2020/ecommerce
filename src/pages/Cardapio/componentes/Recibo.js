import React from 'react';
import { Printer } from 'lucide-react';

export default function Recibo({ recibo, onReimprimir }) {
  return (
    <div className="mt-8 bg-white p-4 rounded shadow max-w-md mx-auto text-sm">
      <h3 className="text-xl font-bold text-yellow-900 mb-2">Recibo do Pedido</h3>
      <p className="mb-1">Cliente: {recibo.nome}</p>
      <p className="mb-3">Telefone: {recibo.telefone}</p>
      <ul className="list-disc list-inside mb-4">
        {recibo.itens.map((item, idx) => (
          <li key={idx}>{item.titulo} - R$ {item.preco}</li>
        ))}
      </ul>
      <button onClick={onReimprimir} className="bg-yellow-700 hover:bg-yellow-800 text-white px-4 py-2 rounded flex items-center gap-2">
        <Printer size={18} /> Reimprimir Recibo
      </button>
    </div>
  );
}
