import { useEffect, useState } from "react";

import { mockCardapio } from "./mockCardapio";
import QRCode from "react-qr-code";



const isProducao = window.location.hostname !== "localhost";

export default function Etiquetas() {
  const [itens, setItens] = useState([]);
  const [quantidades, setQuantidades] = useState({});

  // ===============================
  // BUSCAR API COM FALLBACK
  // ===============================
  useEffect(() => {
    fetch("https://congolinaria.com.br/api/cardapio_cop30.php")
      .then(res => res.json())
      .then(data => {
        setItens(data || []);
        inicializarQuantidades(data || []);
      })
      .catch(() => {
        setItens(mockCardapio);
        inicializarQuantidades(mockCardapio);
      });
  }, []);

  // ===============================
  // INICIALIZAR QUANTIDADES
  // ===============================
  function inicializarQuantidades(lista) {
    const q = {};
    lista.forEach(item => {
      if (item?.id) q[item.id] = 1;
    });
    setQuantidades(q);
  }

  // ===============================
  // ALTERAR QUANTIDADE INDIVIDUAL
  // ===============================
  function alterarQuantidade(id, valor) {
    setQuantidades(prev => ({
      ...prev,
      [id]: Math.max(1, Number(valor) || 1)
    }));
  }

  // ===============================
  // IMPRIMIR (ZEBRA)
  // ===============================
  const { gerarZPL } = require("./zplEtiqueta");

function imprimir(item) {
  const qtd = quantidades[item.id] || 1;
  let zpl = "";

  for (let i = 0; i < qtd; i++) {
    zpl += gerarZPL(item);
  }

  fetch("http://localhost:9100/print", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: zpl
  }).catch(() =>
    alert("Serviço de impressão não está rodando")
  );
}


  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Etiquetas – Congolinária
      </h1>

      {itens.map(item => (
        <div
          key={item.id}
          className="border p-3 mb-6 rounded shadow-sm max-w-[420px]"
        >
          {/* PREVIEW ETIQUETA */}
          <div
            className="relative border border-black p-2 mb-3 bg-white"
            style={{ width: "100mm", height: "50mm" }}
          >
            {/* NOME */}
            <div className="text-[11px] font-bold leading-tight mb-1">
              {item.nome || "Produto Congolinária"}
            </div>

            {/* QR CODE */}
            <div className="absolute right-2 top-2 bg-white p-1">
              <QRCode
                value={`https://congolinaria.com.br/produto/${item.id}`}
                size={45}
              />
            </div>

            {/* INGREDIENTES */}
            <div className="text-[9px] leading-tight">
              <strong>Ingredientes:</strong>{" "}
              {item.ingredientes || "—"}
            </div>

            {/* MODO DE PREPARO */}
            <div className="text-[9px] leading-tight mt-1">
              <strong>Modo de preparo:</strong>{" "}
              {item.modo_preparo || "Manter congelado"}
            </div>

            {/* RODAPÉ */}
            <div className="absolute bottom-1 left-2 right-2 text-[8px] flex justify-between">
              <span>Val: {item.validade || "—"}</span>
              <span>Lote: {item.id}</span>
            </div>
          </div>

          {/* CONTROLES */}
          <div className="flex items-center gap-3">
            <label className="text-sm">
              Quantidade:
            </label>

            <input
              type="number"
              min="1"
              className="border w-16 px-2 py-1"
              value={quantidades[item.id] || 1}
              onChange={e =>
                alterarQuantidade(item.id, e.target.value)
              }
            />

            {isProducao && (
              <button
                onClick={() => imprimir(item)}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Imprimir
              </button>
            )}
          </div>

          {!isProducao && (
            <div className="text-xs text-gray-500 mt-2">
              Modo DEV – impressão desativada
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
