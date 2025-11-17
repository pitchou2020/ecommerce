import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function PainelPedidosCOP30() {
  const [pedidos, setPedidos] = useState([]);
  const [audio] = useState(new Audio("/alerta.mp3"));
  const [ultimoId, setUltimoId] = useState(0);
  const [filtro, setFiltro] = useState("todos");
  const [notificacao, setNotificacao] = useState(null);

  const pedidosFiltrados = pedidos.filter((p) =>
    filtro === "todos"
      ? true
      : filtro === "nao-impresso"
      ? p.impresso === 0
      : filtro === "impresso"
      ? p.impresso === 1
      : true
  );

  // ===================================================
  // 🔄 Busca pedidos
  // ===================================================
  useEffect(() => {
    const buscarPedidos = () => {
      axios
        .get("https://congolinaria.com.br/api/listar_pedidos_cop30.php")
        .then((res) => {
          const novosPedidos = res.data.filter((p) => p.id > ultimoId);
          if (novosPedidos.length > 0) {
            audio.play().catch(() => {});
            novosPedidos.forEach((pedido) => imprimirPedido(pedido));
            setUltimoId(Math.max(...res.data.map((p) => p.id)));
          }
          setPedidos(res.data);
        })
        .catch((err) => console.error(err));
    };

    buscarPedidos();
    const intervalo = setInterval(buscarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, [ultimoId, audio]);

  // ===================================================
  // 🔔 Verifica PagSeguro
  // ===================================================
  useEffect(() => {
    const verificarSinal = setInterval(() => {
      fetch(
        "https://congolinaria.com.br/api/sinal_novo_pedido.json?_=" +
          Date.now()
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.nova_notificacao) {
            audio.play().catch(() => {});
            setNotificacao({
              cliente: data.cliente,
              status: data.status,
              hora: new Date().toLocaleTimeString("pt-BR"),
            });

            axios
              .get("https://congolinaria.com.br/api/listar_pedidos_cop30.php")
              .then((res) => setPedidos(res.data));

            fetch("https://congolinaria.com.br/api/limpar_sinal.php");
            setTimeout(() => setNotificacao(null), 6000);
          }
        })
        .catch(() => {});
    }, 8000);
    return () => clearInterval(verificarSinal);
  }, [audio]);

  // ===================================================
  // 🖨️ Impressão térmica automática (58mm)
  // ===================================================
  const imprimirPedido = (pedido) => {
    const janela = window.open("", "", "width=300,height=600");
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
          ${pedido.itens
            .map(
              (item, i) =>
                `<p>${i + 1}. ${item.quantidade}x ${item.nome_prato}</p>`
            )
            .join("")}
          <div class="linha"></div>
          ${
            pedido.observacoes
              ? `<p><strong>Obs:</strong> ${pedido.observacoes}</p>`
              : ""
          }
          <p style="text-align:center">— Congolinaria —</p>
        </body>
      </html>
    `;

    janela.document.write(html);
    janela.document.close();
    janela.focus();
    janela.print();
    janela.close();

    axios
      .post("https://congolinaria.com.br/api/marcar_impresso.php", {
        id: pedido.id,
      })
      .catch((err) => console.error("Erro ao marcar como impresso", err));
  };

  // ===================================================
  // 🍽️ Função NOVA — Pedido Pronto (KDS)
  // ===================================================
  const marcarPedidoPronto = (pedidoId) => {
    axios
      .post("https://congolinaria.com.br/api/fechar_pedido_kds.php", {
        id: pedidoId,
      })
      .then(() => {
        setPedidos((prev) =>
          prev.map((p) =>
            p.id === pedidoId ? { ...p, status_cozinha: 2 } : p
          )
        );
      })
      .catch((err) =>
        alert("Erro ao marcar pedido como pronto: " + err.message)
      );
  };

  // ===================================================
  // UI DO PAINEL
  // ===================================================
  return (
    <div className="relative p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        🧾 Pedidos COP30 – Cozinha Congolinaria
      </h1>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {["todos", "nao-impresso", "impresso"].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1 rounded font-medium ${
              filtro === f
                ? "bg-green-700 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {f === "todos"
              ? "Todos"
              : f === "nao-impresso"
              ? "Aguardando Impressão"
              : "Impresso"}
          </button>
        ))}
      </div>

      {/* Notificação visual animada */}
      <AnimatePresence>
        {notificacao && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 right-6 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg z-50"
          >
            <p className="font-bold text-lg">🍽️ Novo Pedido Confirmado!</p>
            <p className="text-sm">
              Cliente:{" "}
              <span className="font-medium">{notificacao.cliente}</span>
            </p>
            <p className="text-sm">
              Status:{" "}
              <span className="font-medium">{notificacao.status}</span>
            </p>
            <p className="text-xs text-green-200 mt-1">
              {notificacao.hora}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de pedidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pedidosFiltrados.map((pedido) => (
          <div
            key={pedido.id}
            className={`border rounded-xl p-4 shadow transition 
              ${
                pedido.status_cozinha === 2
                  ? "bg-green-200 border-green-500"
                  : "bg-white"
              }
            `}
          >
            <h2 className="font-bold text-lg text-gray-800">
              Mesa: {pedido.mesa} ({pedido.pessoas} pessoas)
            </h2>

            <p className="text-gray-600 text-sm">
              ID: {pedido.id} • Cozinha:{" "}
              {pedido.status_cozinha === 2
                ? "Pronto ✔"
                : "Em preparo… ⏳"}
            </p>

            <ul className="mt-2 list-disc list-inside text-gray-700">
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.quantidade}x {item.nome_prato}
                </li>
              ))}
            </ul>

            {pedido.observacoes && (
              <p className="mt-2 text-sm italic text-red-600">
                Obs: {pedido.observacoes}
              </p>
            )}

            {/* Botão Pedido Pronto */}
            {pedido.status_cozinha !== 2 && (
              <button
                onClick={() => marcarPedidoPronto(pedido.id)}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
              >
                Pedido Pronto ✔
              </button>
            )}

            {/* Imprimir */}
            <button
              onClick={() => imprimirPedido(pedido)}
              className={`mt-2 w-full py-2 rounded font-semibold ${
                pedido.impresso
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {pedido.impresso ? "Reimprimir" : "Imprimir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
