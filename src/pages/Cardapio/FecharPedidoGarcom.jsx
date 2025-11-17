import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FecharPedidoGarcom() {
  const [mesa, setMesa] = useState('');
  const [pessoas, setPessoas] = useState(1);
  const [itens, setItens] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [pedidoExistenteId, setPedidoExistenteId] = useState(null);
  const [pedidoPago, setPedidoPago] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [taxaServico, setTaxaServico] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);

  const [cardapio, setCardapio] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState('');
  const [loading, setLoading] = useState(false);

  const [mesasAtivas, setMesasAtivas] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [filtroMesas, setFiltroMesas] = useState([]);

  // Mensagem automática
  useEffect(() => {
    if (mensagem) {
      const t = setTimeout(() => setMensagem(''), 4000);
      return () => clearTimeout(t);
    }
  }, [mensagem]);

  // Carregar mesas e cardápio
  useEffect(() => {
    axios.get("https://congolinaria.com.br/api/listar_mesas_ativas.php")
      .then(res => setMesasAtivas(res.data.mesas_ativas || []));

    axios.get("https://congolinaria.com.br/api/cardapio.php")
      .then(res => {
        const r = res.data;
        if (r?.dados) setCardapio(r.dados);
      });
  }, []);

  const filtrarMesas = (valor) => {
    setMesa(valor);
    if (!valor) {
      setFiltroMesas([]);
      setMostrarSugestoes(false);
      return;
    }
    const filtradas = mesasAtivas.filter(m =>
      m.toLowerCase().includes(valor.toLowerCase())
    );
    setFiltroMesas(filtradas);
    setMostrarSugestoes(true);
  };

  // Buscar pedido aberto
  const selecionarMesa = (mesaSel) => {
    setMesa(mesaSel);
    setMostrarSugestoes(false);

    axios.get(`https://congolinaria.com.br/api/buscar_pedido_mesa.php?mesa=${mesaSel}`)
      .then(res => {
        if (!res.data.existe) {
          setPedidoExistenteId(null);
          setItens([]);
          setObservacoes('');
          setSubtotal(0);
          setTotalFinal(0);
          setPedidoPago(false);
          return;
        }

        const p = res.data;
        setPedidoExistenteId(p.pedido_id);
        setPessoas(p.pessoas);
        setObservacoes(p.observacoes || '');
        setPedidoPago(p.status_pagamento === 3);

        setSubtotal(Number(p.subtotal));
        setTaxaServico(Number(p.taxa_servico));
        setTotalFinal(Number(p.valor_total));

        setItens(
          p.itens.map(i => ({
            id: i.prato_id,
            nome_prato: i.nome_prato,
            quantidade: Number(i.quantidade),
            preco_unitario: Number(i.preco_unitario),
            total_item: Number(i.quantidade) * Number(i.preco_unitario)
          }))
        );
      });
  };

  // Adicionar item
  const adicionarItemDoCardapio = () => {
    if (!itemSelecionado) return;

    const prato = cardapio.find(p => p.id == itemSelecionado);
    const preco = Number(prato.preco);

    const novo = {
      id: prato.id,
      nome_prato: prato.titulo,
      quantidade: 1,
      preco_unitario: preco,
      total_item: preco
    };

    const lista = [...itens, novo];
    setItens(lista);

    const st = lista.reduce((a, i) => a + i.total_item, 0);
    setSubtotal(st);
    setTotalFinal(st + taxaServico);

    setItemSelecionado('');
  };

  const atualizarItem = (i, campo, valor) => {
    const lista = [...itens];
    lista[i][campo] = valor;

    const qtd = Number(lista[i].quantidade);
    const preco = Number(lista[i].preco_unitario);

    lista[i].total_item = qtd * preco;

    setItens(lista);

    const st = lista.reduce((a, i) => a + i.total_item, 0);
    setSubtotal(st);
    setTotalFinal(st + taxaServico);
  };

  const removerItem = (i) => {
    const lista = itens.filter((_, id) => id !== i);
    setItens(lista);

    const st = lista.reduce((a, i) => a + i.total_item, 0);
    setSubtotal(st);
    setTotalFinal(st + taxaServico);
  };

  // Enviar pedido
  
 const enviarPedido = () => {
  if (!mesa) return setMensagem("Informe a mesa.");
  if (itens.length === 0) return setMensagem("Adicione itens.");

  const dados = {
    mesa,
    pessoas,
    observacoes,
    pedido: itens.map(item => ({
      id: item.id,
      nome: item.nome_prato,
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario     // <-- AQUI ESTÁ A CORREÇÃO
    })),
    pedido_id: pedidoExistenteId
  };

  setLoading(true);

  axios.post("https://congolinaria.com.br/api/fazer_pedido_cop30.php", dados)
    .then(() => {
      setMensagem("Pedido enviado!");
      setMesa('');
      setPessoas(1);
      setItens([]);
      setObservacoes('');
      setSubtotal(0);
      setTaxaServico(0);
      setTotalFinal(0);
      setPedidoExistenteId(null);
    })
    .finally(() => setLoading(false));
};


  // 🔥 IMPRIMIR COMANDA DA MESA
  const imprimirPedido = () => {
    if (!pedidoExistenteId) return alert("Nenhum pedido aberto.");

    const janela = window.open("", "", "width=300,height=600");
    const html = `
      <html>
        <head>
          <style>
            body { font-family: monospace; padding: 10px; }
            h2 { text-align:center; }
            .item { margin-bottom: 6px; }
            hr { border-top: 1px dashed #000; margin: 8px 0; }
          </style>
        </head>
        <body>
          <h2>Comanda - Mesa ${mesa}</h2>
          <p><strong>Pedido:</strong> ${pedidoExistenteId}</p>
          <p><strong>Pessoas:</strong> ${pessoas}</p>
          <hr/>
          ${itens.map(i => `
            <p class="item">${i.quantidade}x ${i.nome_prato}</p>
          `).join("")}
          <hr/>
          <p><strong>Obs:</strong> ${observacoes || "—"}</p>
          <p style="text-align:center;margin-top:20px;">Congolinaria COP30</p>
        </body>
      </html>
    `;
    janela.document.write(html);
    janela.print();
    janela.close();
  };

  // UI
  return (
    <div className="p-4 max-w-xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Garçom – Pedido COP30</h2>

      {/* Autocomplete Mesa */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Mesa"
          value={mesa}
          onChange={(e) => filtrarMesas(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {mostrarSugestoes && filtroMesas.length > 0 && (
          <div className="absolute bg-white border w-full rounded shadow max-h-40 overflow-y-auto z-20">
            {filtroMesas.map((m, i) => (
              <div
                key={i}
                onClick={() => selecionarMesa(m)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                Mesa {m}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="number"
        value={pessoas}
        onChange={(e) => setPessoas(Number(e.target.value))}
        className="border p-2 rounded w-full mb-4"
        placeholder="Pessoas"
      />

      {/* Adicionar item do cardápio */}
      <div className="flex gap-2 mb-4">
        <select
          value={itemSelecionado}
          onChange={(e) => setItemSelecionado(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option>Selecione</option>
          {cardapio.map(p => (
            <option key={p.id} value={p.id}>
              {p.titulo} – R$ {Number(p.preco).toFixed(2)}
            </option>
          ))}
        </select>

        <button
          onClick={adicionarItemDoCardapio}
          className="bg-blue-600 text-white px-4 rounded"
        >
          + Add
        </button>
      </div>

      {/* Itens */}
      {itens.map((item, index) => (
        <div key={index} className="border p-3 rounded mb-3">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={item.nome_prato}
              onChange={(e) => atualizarItem(index, "nome_prato", e.target.value)}
              className="border p-2 rounded flex-1"
            />

            <input
              type="number"
              min="1"
              value={item.quantidade}
              onChange={(e) => atualizarItem(index, "quantidade", e.target.value)}
              className="border p-2 rounded w-20"
            />
          </div>

          <p className="text-sm text-gray-600">
            Preço: R$ {item.preco_unitario.toFixed(2)}
          </p>

          <p className="text-lg font-bold">
            Total: R$ {item.total_item.toFixed(2)}
          </p>

          <button
            onClick={() => removerItem(index)}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
          >
            Remover
          </button>
        </div>
      ))}

      {/* Resumo */}
      <div className="p-4 bg-gray-100 rounded mb-4">
        <p>Subtotal: <b>R$ {subtotal.toFixed(2)}</b></p>
      </div>

      {/* Observações */}
      <textarea
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Observações"
      />

      {/* Botões */}
      <button
        onClick={enviarPedido}
        className="w-full bg-green-600 text-white py-3 rounded font-bold"
      >
        {pedidoExistenteId ? "Atualizar Pedido" : "Enviar Pedido"}
      </button>

      {pedidoExistenteId && (
        <button
          onClick={imprimirPedido}
          className="w-full bg-gray-800 text-white py-3 rounded mt-3 font-bold"
        >
          🖨 Imprimir Pedido
        </button>
      )}

      {mensagem && (
        <p className="mt-4 text-center text-green-700 font-bold">{mensagem}</p>
      )}
    </div>
  );
}
