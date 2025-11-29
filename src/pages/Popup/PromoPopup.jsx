import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PromoPopup() {
  const [popup, setPopup] = useState(null);
  const [visible, setVisible] = useState(false);

  const API_BASE = "https://congolinaria.com.br/api/";

  useEffect(() => {
    axios
      .get(API_BASE + "popup.php")
      .then((res) => {
        if (!res.data) return;
        setPopup(res.data);

        if (res.data.ativo == 1) {
          setVisible(true);
          const tempo = Number(res.data.tempo || 5) * 1000;

          const timer = setTimeout(() => {
            setVisible(false);
          }, tempo);

          return () => clearTimeout(timer);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar popup:", err);
      });
  }, []);

  if (!popup || !visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-[9999]">
      <div
        className="relative w-full max-w-lg rounded-xl overflow-hidden"
        style={{
          backgroundColor: popup.bg_color || "#F2C94C",
          border: `3px solid ${popup.border_color || "#000000"}`,
          boxShadow: `0 6px 25px ${popup.shadow_color || "#000000"}`,
        }}
      >
        {/* Botão fechar */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-4 text-3xl font-bold"
          style={{ color: popup.title_color || "#000000" }}
        >
          ×
        </button>

        {/* IMAGENS (se existirem) */}
        <div className="w-full">
          {popup.imagem1 && (
            <img
              src={`/promo/${popup.imagem1}`}
              alt="Imagem 1"
              className="w-full max-h-52 object-cover"
            />
          )}
          {popup.imagem2 && (
            <img
              src={`/promo/${popup.imagem2}`}
              alt="Imagem 2"
              className="w-full max-h-52 object-cover border-t border-black/10"
            />
          )}
        </div>

        {/* TEXTOS */}
        <div className="p-6 text-center">
          <h1
            className="text-2xl font-bold"
            style={{ color: popup.title_color || "#000000" }}
          >
            {popup.titulo}
          </h1>

          {popup.subtitulo && (
            <p
              className="text-lg mt-1"
              style={{ color: popup.subtitle_color || "#000000" }}
            >
              {popup.subtitulo}
            </p>
          )}

          {popup.preco && (
            <p
              className="text-xl font-bold mt-2"
              style={{ color: popup.price_color || "#C0392B" }}
            >
              {popup.preco}
            </p>
          )}

          {popup.sabores && (
            <p
              className="mt-1 text-sm"
              style={{ color: popup.flavors_color || "#000000" }}
            >
              {popup.sabores}
            </p>
          )}

          <button
            className="px-5 py-2 rounded mt-4 text-sm font-semibold"
            style={{
              backgroundColor: popup.button_bg || "#000000",
              color: popup.button_text || "#FFFFFF",
            }}
          >
            Aproveitar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
