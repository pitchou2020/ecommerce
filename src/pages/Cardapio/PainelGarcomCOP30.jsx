import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Printer, Divide, CreditCard, DollarSign, QrCode } from 'lucide-react';

export default function PainelGarcomCOP30() {
  const [pedidos, setPedidos] = useState([]);

  const buscarPedidos = () => {
    axios.get('https://congolinaria.com.br/api/listar_pedidos_cop30.php')
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    buscarPedidos();
    const intervalo = setInterval(buscarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const fecharPedido = (id) => {
    axios.post('https://congolinaria.com.br/api/fechar_pedido.php', { id })
      .then(() => buscarPedidos())
      .catch(err => alert('Erro ao fechar pedido: ' + err.message));
  };

  const imprimirPedido = (pedido) => {
    const janela = window.open('', '', 'width=300,height=600');
    if (!janela) return;

    const html = `
      <html>
        <head>
          <title>Pedido ${pedido.id}</title>
          <style>
            body { font-family: monospace; font-size: 12px; width: 58mm; padding: 10px; }
            h2 { font-size: 14px; text-align: center; }
            .linha { border-top: 1px dashed #000; margin: 8px 0; }
          </style>
        </head>
        <body>
          <h2>Pedido COP30</h2>
          <p><strong>ID:</strong> ${pedido.id}</p>
          <p><strong>Mesa:</strong> ${pedido.mesa}</p>
          <p><strong>Pessoas:</strong> ${pedido.pessoas}</p>
          <p><strong>Data:</strong> ${new Date(pedido.data_hora).toLocaleString()}</p>
          <div class="linha"></div>
          ${pedido.itens.map((item, i) =>
            `<p>${i + 1}. ${item.quantidade}x ${item.nome_prato} - R$ ${item.preco_unitario.toFixed(2)}</p>`).join('')}
          <div class="linha"></div>
          ${pedido.observacoes ? `<p><strong>Obs:</strong> ${pedido.observacoes}</p>` : ''}
          ${pedido.metodo_pagamento ? `<p><strong>Pagamento:</strong> ${pedido.metodo_pagamento.toUpperCase()}</p>` : ''}
          <div class="linha"></div>
          <p style="margin-top: 40px;">Assinatura do Cliente: ______________________</p>
          <p style="text-align:center; margin-top: 20px;">— Congolinaria —</p>
        </body>
      </html>
    `;

    janela.document.write(html);
    janela.document.close();
    janela.focus();
    janela.print();
    janela.close();
  };

  const dividirConta = (pedido) => {
    const valorTotal = pedido.itens.reduce((acc, item) => acc + (item.preco_unitario * item.quantidade), 0);
    const porPessoa = (valorTotal / pedido.pessoas).toFixed(2);
    alert(`Valor total: R$ ${valorTotal.toFixed(2)}\nCada pessoa paga: R$ ${porPessoa}`);
  };

  const aplicarTaxaServico = (pedido) => {
    const valorTotal = pedido.itens.reduce((acc, item) => acc + (item.preco_unitario * item.quantidade), 0);
    const taxa = valorTotal * 0.1;
    alert(`Taxa de serviço (10%): R$ ${taxa.toFixed(2)}\nNovo total: R$ ${(valorTotal + taxa).toFixed(2)}`);
  };

  const registrarPagamento = (pedido, metodo) => {
    axios.post('https://congolinaria.com.br/api/registrar_pagamento.php', {
      id_pedido: pedido.id,
      metodo: metodo
    })
    .then(() => {
      alert(`Pagamento por ${metodo.toUpperCase()} registrado para o pedido ${pedido.id}`);
      imprimirPedido({ ...pedido, metodo_pagamento: metodo });
    })
    .catch(err => alert('Erro ao registrar pagamento: ' + err.message));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">Painel de Pedidos – Garçom (COP30)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pedidos.map(pedido => (
          <div
            key={pedido.id}
            className={`border-2 rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 text-base ${pedido.status === 'fechado' ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-gray-800">Mesa {pedido.mesa}</h2>
              <span className="text-sm text-gray-500">{new Date(pedido.data_hora).toLocaleString()}</span>
            </div>
            <p className="text-base text-gray-700 mb-1">Pessoas: <strong>{pedido.pessoas}</strong></p>
            <ul className="mt-2 list-disc list-inside text-base text-gray-800 space-y-1">
              {pedido.itens.map(item => (
                <li key={item.id}>{item.quantidade}x {item.nome_prato} - R$ {item.preco_unitario?.toFixed(2)}</li>
              ))}
            </ul>
            {pedido.observacoes && (
              <p className="mt-3 text-base italic text-red-600">Obs: {pedido.observacoes}</p>
            )}

            <div className="mt-5 flex flex-col gap-2">
              {pedido.status !== 'fechado' && (
                <button
                  onClick={() => fecharPedido(pedido.id)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
                >
                  Finalizar Pedido
                </button>
              )}
              <button
                onClick={() => imprimirPedido(pedido)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl shadow"
              >
                <Printer size={18} /> Imprimir Recibo
              </button>
              <button
                onClick={() => dividirConta(pedido)}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl shadow"
              >
                Dividir Conta
              </button>
              <button
                onClick={() => aplicarTaxaServico(pedido)}
                className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow"
              >
                Aplicar Taxa de Serviço (10%)
              </button>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button onClick={() => registrarPagamento(pedido, 'pix')} className="py-2 bg-green-500 text-white rounded-xl shadow"><QrCode size={16} /></button>
                <button onClick={() => registrarPagamento(pedido, 'cartao')} className="py-2 bg-blue-500 text-white rounded-xl shadow"><CreditCard size={16} /></button>
                <button onClick={() => registrarPagamento(pedido, 'dinheiro')} className="py-2 bg-gray-700 text-white rounded-xl shadow"><DollarSign size={16} /></button>
              </div>
            </div>

            {pedido.status === 'fechado' && (
              <p className="mt-3 text-center text-green-700 font-bold">✅ Pedido fechado</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
