import React, { useEffect, useMemo } from "react";

export default function PedidoConcluido() {
  // Você pode pegar do localStorage ou da URL
  const pedidoId = localStorage.getItem("ultimo_pedido_hortifruti_id") || "";
  const nome = localStorage.getItem("ultimo_pedido_hortifruti_nome") || "";

  const mensagem = useMemo(() => {
    return `Olá! Pedido Hortifruti confirmado ✅%0A` +
      `Pedido: #${pedidoId}%0A` +
      `Cliente: ${nome}%0A` +
      `Obrigado!`;
  }, [pedidoId, nome]);

  const numeroWhats = "5511978680420"; // seu WhatsApp

  const linkWhats = `https://wa.me/${numeroWhats}?text=${mensagem}`;

  // opcional: tenta abrir automático (pode ser bloqueado)
  useEffect(() => {
    if (pedidoId) {
      window.open(linkWhats, "_blank");
    }
  }, [pedidoId, linkWhats]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-green-700">Pedido confirmado ✅</h1>

      <a
        className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        href={linkWhats}
        target="_blank"
        rel="noreferrer"
      >
        Enviar no WhatsApp
      </a>
    </div>
  );
}
