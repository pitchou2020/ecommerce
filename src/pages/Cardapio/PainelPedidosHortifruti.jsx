import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function PainelPedidosHortifruti() {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [notificacao, setNotificacao] = useState(null);

  // 🔊 áudio (ref evita recriar)
  const audioRef = useRef(null);
  const ultimoPedidoSinalRef = useRef(0);

  // endpoints (centraliza)
  const API_LISTAR = "https://congolinaria.com.br/api/listar_pedidos_hortifruti.php";
  const API_SINAL = "https://congolinaria.com.br/api/sinal_novo_pedido_hortifruti.json";
  const API_LIMPAR_SINAL = "https://congolinaria.com.br/api/limpar_sinal_hortifruti.php";
  const API_IMPRESSO = "https://congolinaria.com.br/api/marcar_impresso_hortifruti.php";
  const API_PRONTO = "https://congolinaria.com.br/api/fechar_pedido_kds_hortifruti.php";

  // ✅ init audio 1x
  useEffect(() => {
    audioRef.current = new Audio("/alerta.mp3");
  }, []);

  const tocarAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  // ✅ filtros
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((p) =>
      filtro === "todos"
        ? true
        : filtro === "nao-impresso"
        ? Number(p.impresso) === 0
        : filtro === "impresso"
        ? Number(p.impresso) === 1
        : true
    );
  }, [pedidos, filtro]);

  // ===================================================
  // 🔄 Busca pedidos HORTIFRUTI (somente atualizar lista)
  // ===================================================
  useEffect(() => {
    let mounted = true;

    const buscarPedidos = () => {
      axios
        .get(API_LISTAR)
        .then((res) => {
          if (!mounted) return;
          const lista = Array.isArray(res.data) ? res.data : [];
          setPedidos(lista);
        })
        .catch((err) => console.error(err));
    };

    buscarPedidos();
    const intervalo = setInterval(buscarPedidos, 5000);
    return () => {
      mounted = false;
      clearInterval(intervalo);
    };
  }, []);

  // ===================================================
  // 🔔 Sinal de novo pedido (HORTIFRUTI) -> toca + imprime
  // ===================================================
  useEffect(() => {
    const verificarSinal = setInterval(() => {
      fetch(`${API_SINAL}?_=${Date.now()}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data?.nova_notificacao) return;

          const pedidoId = Number(data?.pedido_id || 0);
          if (pedidoId && pedidoId === ultimoPedidoSinalRef.current) {
            // evita duplicar caso o sinal seja lido mais de uma vez
            return;
          }
          if (pedidoId) ultimoPedidoSinalRef.current = pedidoId;

          tocarAudio();

          setNotificacao({
            cliente: data.cliente || "-",
            status: data.status || "-",
            hora: new Date().toLocaleTimeString("pt-BR"),
          });

          axios.get(API_LISTAR).then((res) => {
            const lista = Array.isArray(res.data) ? res.data : [];
            setPedidos(lista);

            // tenta achar o pedido específico e imprimir
            const pedido = pedidoId
              ? lista.find((p) => Number(p.id) === pedidoId)
              : null;

            if (pedido) imprimirPedido(pedido);
          });

          fetch(API_LIMPAR_SINAL).catch(() => {});
          setTimeout(() => setNotificacao(null), 6000);
        })
        .catch(() => {});
    }, 6000);

    return () => clearInterval(verificarSinal);
  }, []);

  // ===================================================
  // helpers impressão (escape)
  // ===================================================
  const esc = (v) =>
    String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  // ===================================================
  // 🖨️ Impressão térmica (58mm)
  // ===================================================
  const imprimirPedido = (pedido) => {
    const janela = window.open("", "", "width=320,height=720");
    if (!janela) return;

    const dataStr = pedido.data_hora
      ? new Date(pedido.data_hora).toLocaleString("pt-BR")
      : new Date().toLocaleString("pt-BR");

    const itens = Array.isArray(pedido.itens) ? pedido.itens : [];

    const html = `
      <html>
        <head>
          <title>Pedido ${esc(pedido.id)}</title>
          <style>
            body { font-family: monospace; font-size: 12px; width: 58mm; padding: 10px; }
            h2 { font-size: 14px; text-align: center; margin: 0 0 6px; }
            .linha { border-top: 1px dashed #000; margin: 8px 0; }
            .mini { font-size: 11px; margin: 2px 0; }
            .center { text-align:center; }
          </style>
        </head>
        <body>
          <h2>Pedido HORTIFRUTI</h2>

          <p><strong>ID:</strong> ${esc(pedido.id)}</p>
          <p><strong>Cliente:</strong> ${esc(pedido.nome_cliente || "-")}</p>
          <p><strong>Telefone:</strong> ${esc(pedido.telefone || "-")}</p>
          <p><strong>Data:</strong> ${esc(dataStr)}</p>

          <div class="linha"></div>

          <p><strong>Entrega (sem frete)</strong></p>
          <p class="mini"><strong>Condomínio:</strong> ${esc(pedido.condominio || "-")}</p>
          <p class="mini"><strong>Bloco/Torre:</strong> ${esc(pedido.bloco_torre || pedido.blocoTorre || "-")}</p>
          <p class="mini"><strong>Apto:</strong> ${esc(pedido.apartamento || "-")}</p>
          ${
            pedido.complemento
              ? `<p class="mini"><strong>Compl:</strong> ${esc(pedido.complemento)}</p>`
              : ""
          }
          <p class="mini"><strong>Endereço:</strong> ${esc(pedido.endereco || "-")}, ${esc(pedido.numero || "-")}</p>
          <p class="mini"><strong>Bairro:</strong> ${esc(pedido.bairro || "-")} — ${esc(pedido.cidade || "-")} / ${esc(pedido.uf || "-")}</p>
          <p class="mini"><strong>CEP:</strong> ${esc(pedido.cep || "-")}</p>

          <div class="linha"></div>

          ${itens
            .map((item, i) => {
              const nome = item.nome_produto ?? item.nome_prato ?? item.nome ?? "-";
              const qtd = item.quantidade ?? item.qtd ?? item.quantity ?? 1;
              return `<p>${i + 1}. ${esc(qtd)}x ${esc(nome)}</p>`;
            })
            .join("")}

          <div class="linha"></div>

          ${
            pedido.observacoes
              ? `<p><strong>Obs:</strong> ${esc(pedido.observacoes)}</p>`
              : ""
          }

          <p><strong>Pagamento:</strong> ${esc(pedido.forma_pagamento || "-")}</p>
          <p><strong>Total:</strong> R$ ${
            pedido.total !== undefined && pedido.total !== null
              ? Number(pedido.total).toFixed(2)
              : "-"
          }</p>

          <p class="center">— Congolinaria —</p>
        </body>
      </html>
    `;

    janela.document.write(html);
    janela.document.close();
    janela.focus();
    janela.print();
    janela.close();

    // ✅ marca impresso
    axios
      .post(API_IMPRESSO, { id: pedido.id })
      .catch((err) => console.error("Erro ao marcar como impresso", err));
  };

  // ===================================================
  // ✅ Pedido pronto (KDS)
  // ===================================================
  const marcarPedidoPronto = (pedidoId) => {
    axios
      .post(API_PRONTO, { id: pedidoId })
      .then(() => {
        setPedidos((prev) =>
          prev.map((p) =>
            Number(p.id) === Number(pedidoId) ? { ...p, status_cozinha: 2 } : p
          )
        );
      })
      .catch((err) =>
        alert("Erro ao marcar pedido como pronto: " + err.message)
      );
  };

  // ===================================================
  // UI
  // ===================================================
  return (
    <div className="relative p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        🧾 Pedidos HORTIFRUTI – Congolinaria
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

      {/* Notificação animada */}
      <AnimatePresence>
        {notificacao && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 right-6 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg z-50"
          >
            <p className="font-bold text-lg">🛒 Novo Pedido Hortifruti!</p>
            <p className="text-sm">
              Cliente:{" "}
              <span className="font-medium">{notificacao.cliente}</span>
            </p>
            <p className="text-sm">
              Status:{" "}
              <span className="font-medium">{notificacao.status}</span>
            </p>
            <p className="text-xs text-green-200 mt-1">{notificacao.hora}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pedidosFiltrados.map((pedido) => (
          <div
            key={pedido.id}
            className={`border rounded-xl p-4 shadow transition ${
              Number(pedido.status_cozinha) === 2
                ? "bg-green-200 border-green-500"
                : "bg-white"
            }`}
          >
            <h2 className="font-bold text-lg text-gray-800">
              Pedido #{pedido.id}
            </h2>

            <p className="text-gray-600 text-sm">
              Cliente: {pedido.nome_cliente ?? "-"} •{" "}
              {Number(pedido.status_cozinha) === 2
                ? "Pronto ✔"
                : "Em preparo… ⏳"}
            </p>

            <div className="mt-2 text-sm text-gray-700">
              <p className="font-semibold">Entrega (sem frete)</p>
              <p>Condomínio: {pedido.condominio ?? "-"}</p>
              <p>Bloco/Torre: {pedido.bloco_torre ?? pedido.blocoTorre ?? "-"}</p>
              <p>Apto: {pedido.apartamento ?? "-"}</p>
            </div>

            <ul className="mt-3 list-disc list-inside text-gray-700">
              {(Array.isArray(pedido.itens) ? pedido.itens : []).map((item, idx) => (
                <li key={item.id ?? `${pedido.id}-${idx}`}>
                  {(item.quantidade ?? item.qtd ?? item.quantity ?? 1)}x{" "}
                  {item.nome_produto ?? item.nome_prato ?? item.nome ?? "-"}
                </li>
              ))}
            </ul>

            {pedido.observacoes && (
              <p className="mt-2 text-sm italic text-red-600">
                Obs: {pedido.observacoes}
              </p>
            )}

            {/* Pedido pronto */}
            {Number(pedido.status_cozinha) !== 2 && (
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
                Number(pedido.impresso) === 1
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {Number(pedido.impresso) === 1 ? "Reimprimir" : "Imprimir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
