import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, CreditCard, DollarSign, Printer } from "lucide-react";

export default function PainelCaixaCOP30() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [notificacao, setNotificacao] = useState(null);
  const [audio] = useState(new Audio("/alerta.mp3"));
  const [filtro, setFiltro] = useState("aguardando"); // aguardando, pagos, todos

  // -----------------------------------------
  // 🔁 Carregar pedidos
  // -----------------------------------------
  const carregarPedidos = () => {
    axios
      .get("https://congolinaria.com.br/api/listar_pedidos_cop30.php")
      .then((res) => {
        setPedidos(res.data || []);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  };

  useEffect(() => {
    carregarPedidos();
    const intv = setInterval(carregarPedidos, 8000);
    return () => clearInterval(intv);
  }, []);

  // -----------------------------------------
  // 🔔 Sinal de "Conta enviada"
  // -----------------------------------------
  useEffect(() => {
    const t = setInterval(() => {
      fetch(
        "https://congolinaria.com.br/api/sinal_fechar_conta.json?_=" +
          Date.now()
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.novo) {
            audio.play().catch(() => {});
            setNotificacao({
              pedido_id: data.pedido_id,
              valor_total: data.valor_total,
              hora: data.hora,
            });

            carregarPedidos();
            fetch("https://congolinaria.com.br/api/limpar_sinal_fechar_conta.php");

            setTimeout(() => setNotificacao(null), 6000);
          }
        })
        .catch(() => {});
    }, 7000);

    return () => clearInterval(t);
  }, [audio]);

  // -----------------------------------------
  // 🧮 Helpers
  // -----------------------------------------
  const calcularSubtotal = (pedido) =>
    pedido.itens?.reduce(
      (acc, item) =>
        acc +
        (Number(item.preco_unitario) || 0) * Number(item.quantidade || 0),
      0
    ) || 0;

  const calcularTotal = (pedido) => {
    const subtotal = calcularSubtotal(pedido);
    const taxa = Number(pedido.taxa_servico || 0);
    const total = Number(pedido.valor_total || subtotal + taxa);
    return { subtotal, taxa, total };
  };

  // -----------------------------------------
  // 🖨️ Recibo
  // -----------------------------------------
  const imprimirRecibo = (pedido, metodo) => {
    const { subtotal, taxa, total } = calcularTotal(pedido);

    const win = window.open("", "", "width=300,height=600");
    win.document.write(`
      <html>
        <body style="font-family: monospace; padding: 10px;">
          <h2 style="text-align:center;">Recibo - Congolinaria COP30</h2>
          <p>Pedido: ${pedido.id}</p>
          <p>Mesa: ${pedido.mesa}</p>
          <p>Pessoas: ${pedido.pessoas}</p>
          <p>Data: ${new Date(pedido.data_hora).toLocaleString()}</p>
          <hr/>
          ${pedido.itens
            .map(
              (i) =>
                `<p>${i.quantidade}x ${i.nome_prato} - R$ ${Number(
                  i.preco_unitario
                ).toFixed(2)}</p>`
            )
            .join("")}
          <hr/>
          <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
          ${taxa > 0 ? `<p>Taxa: R$ ${taxa.toFixed(2)}</p>` : ""}
          <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
          <p><strong>Pagamento:</strong> ${metodo.toUpperCase()}</p>
          <hr/>
          <p style="text-align:center;">Obrigado pela preferência!</p>
        </body>
      </html>
    `);
    win.print();
    win.close();
  };

  // -----------------------------------------
  // 💳 Registrar pagamento
  // -----------------------------------------
  const registrarPagamento = (pedido, metodo) => {
    if (!window.confirm(`Confirmar pagamento via ${metodo.toUpperCase()}?`))
      return;

    axios
      .post("https://congolinaria.com.br/api/registrar_pagamento.php", {
        id_pedido: pedido.id,
        metodo,
      })
      .then(() => {
        alert(`Pagamento registrado.`);
        imprimirRecibo(pedido, metodo);
        carregarPedidos();
      });
  };

  // -----------------------------------------
  // FILTRO FINAL
  // -----------------------------------------
  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtro === "aguardando") return p.status_pagamento == 1;
    if (filtro === "pagos") return p.status_pagamento == 3;
    return true;
  });

  if (carregando) return <p className="p-4">Carregando pedidos...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        💳 Painel do Caixa – COP30
      </h1>

      {/* NOTIFICAÇÃO */}
      <AnimatePresence>
        {notificacao && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-lg z-50"
          >
            <p className="font-bold">🧾 Conta enviada!</p>
            <p>Pedido: {notificacao.pedido_id}</p>
            <p>Total: R$ {Number(notificacao.valor_total).toFixed(2)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTROS */}
      <div className="flex justify-center gap-2 mb-4">
        {[
          { id: "aguardando", label: "Aguardando" },
          { id: "pagos", label: "Pagos" },
          { id: "todos", label: "Todos" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`px-3 py-1 rounded-full ${
              filtro === f.id ? "bg-indigo-700 text-white" : "bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pedidosFiltrados.map((p) => {
          const { subtotal, taxa, total } = calcularTotal(p);

          return (
            <div
              key={p.id}
              className="border rounded-2xl p-4 shadow bg-white space-y-2"
            >
              <h2 className="font-bold text-lg">Mesa {p.mesa}</h2>
              <p>Pessoas: {p.pessoas}</p>
              <p className="text-xs text-gray-500">Pedido #{p.id}</p>

              {/* Status */}
              <p
                className={`font-bold ${
                  p.status_pagamento == 3
                    ? "text-green-600"
                    : "text-yellow-700"
                }`}
              >
                {p.status_pagamento == 1
                  ? "Aguardando Pagamento"
                  : "Pago ✔"}
              </p>

              {/* Forma de pagamento */}
              {p.status_pagamento == 3 && (
                <p className="text-sm mt-1">
                  💳 Pago via:{" "}
                  <b className="uppercase">{p.metodo_pagamento}</b>
                </p>
              )}

              {/* Itens */}
              <ul className="text-sm">
                {p.itens?.map((i) => (
                  <li key={i.id}>
                    {i.quantidade}x {i.nome_prato} – R${" "}
                    {Number(i.preco_unitario).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="text-sm pt-2 border-t mt-2">
                <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
                {taxa > 0 && <p>Taxa: R$ {taxa.toFixed(2)}</p>}
                <p className="font-bold">Total: R$ {total.toFixed(2)}</p>
              </div>

              {/* Botões pagamento */}
              {p.status_pagamento == 1 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <button
                    onClick={() => registrarPagamento(p, "pix")}
                    className="bg-green-600 text-white py-2 rounded flex items-center justify-center gap-1 text-xs"
                  >
                    <QrCode size={14} /> Pix
                  </button>

                  <button
                    onClick={() => registrarPagamento(p, "cartao")}
                    className="bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-1 text-xs"
                  >
                    <CreditCard size={14} /> Cartão
                  </button>

                  <button
                    onClick={() => registrarPagamento(p, "dinheiro")}
                    className="bg-gray-800 text-white py-2 rounded flex items-center justify-center gap-1 text-xs"
                  >
                    <DollarSign size={14} /> Cash
                  </button>
                </div>
              )}

              {p.status_pagamento == 3 && (
                <button
                  onClick={() => imprimirRecibo(p, p.metodo_pagamento)}
                  className="w-full bg-gray-200 py-2 mt-2 rounded flex gap-1 justify-center text-xs"
                >
                  <Printer size={14} /> Reimprimir
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
