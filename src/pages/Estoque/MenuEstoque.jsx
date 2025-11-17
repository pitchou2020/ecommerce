import React from 'react';
import { Link } from 'react-router-dom'; // ✅ ESSA LINHA FALTAVA

export default function MenuEstoque() {
  return (
    <nav className="bg-white shadow-md p-4 flex gap-4">
      <Link to="/admin/estoque" className="text-blue-600 hover:underline">Estoque</Link>
      <Link to="/admin/estoque/historico" className="text-blue-600 hover:underline">Histórico</Link>
      <Link to="/admin/estoque/relatorio" className="text-blue-600 hover:underline">Relatório</Link>
    </nav>
  );
}
