import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../composant/Sidebar/Sidebar";

export default function PainelPopupAdmin() {
  const [popup, setPopup] = useState({
    ativo: 1,
    titulo: "",
    subtitulo: "",
    preco: "",
    sabores: "",
    tempo: 5,
    imagem1: "",
    imagem2: "",
    bg_color: "#F2C94C",
    title_color: "#000000",
    subtitle_color: "#000000",
    price_color: "#C0392B",
    flavors_color: "#000000",
    border_color: "#000000",
    button_bg: "#000000",
    button_text: "#FFFFFF",
    shadow_color: "#000000",
  });

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const API_BASE = "https://congolinaria.com.br/api/";

  useEffect(() => {
    axios
      .get(API_BASE + "popup.php")
      .then((res) => {
        setPopup((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const salvar = () => {
    axios
      .put(API_BASE + "popup.php", popup)
      .then(() => {
        setToast("Popup atualizado com sucesso!");
        setTimeout(() => setToast(""), 3000);
      })
      .catch((err) => {
        console.error(err);
        setToast("Erro ao salvar popup");
        setTimeout(() => setToast(""), 3000);
      });
  };

  const enviarImagem = (campo, arquivo) => {
    const formData = new FormData();
    formData.append("imagem", arquivo);
    formData.append("campo", campo);

    axios
      .post(API_BASE + "upload_popup.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data && res.data.arquivo) {
          setPopup((prev) => ({
            ...prev,
            [campo]: res.data.arquivo,
          }));
          setToast("Imagem atualizada!");
          setTimeout(() => setToast(""), 3000);
        }
      })
      .catch((err) => {
        console.error(err);
        setToast("Erro ao enviar imagem");
        setTimeout(() => setToast(""), 3000);
      });
  };

  const aplicarPreset = (tipo) => {
    if (tipo === "congolinaria") {
      setPopup((prev) => ({
        ...prev,
        bg_color: "#F2C94C",
        title_color: "#000000",
        subtitle_color: "#000000",
        price_color: "#C0392B",
        flavors_color: "#000000",
        border_color: "#000000",
        button_bg: "#000000",
        button_text: "#F2C94C",
        shadow_color: "#000000",
      }));
    }

    if (tipo === "blackfriday") {
      setPopup((prev) => ({
        ...prev,
        bg_color: "#000000",
        title_color: "#F1C40F",
        subtitle_color: "#FFFFFF",
        price_color: "#FF0000",
        flavors_color: "#FFFFFF",
        border_color: "#F1C40F",
        button_bg: "#F1C40F",
        button_text: "#000000",
        shadow_color: "#000000",
      }));
    }

    if (tipo === "natal") {
      setPopup((prev) => ({
        ...prev,
        bg_color: "#0B6B30",
        title_color: "#FFFFFF",
        subtitle_color: "#FFFFFF",
        price_color: "#FFE066",
        flavors_color: "#FFFFFF",
        border_color: "#145A32",
        button_bg: "#FFE066",
        button_text: "#0B6B30",
        shadow_color: "#000000",
      }));
    }

    if (tipo === "minimal") {
      setPopup((prev) => ({
        ...prev,
        bg_color: "#FFFFFF",
        title_color: "#000000",
        subtitle_color: "#444444",
        price_color: "#C0392B",
        flavors_color: "#666666",
        border_color: "#DDDDDD",
        button_bg: "#000000",
        button_text: "#FFFFFF",
        shadow_color: "#000000",
      }));
    }
  };

  if (loading) {
    return <div className="p-6">Carregando configurações do popup...</div>;
  }

  return (
     <div className="flex min-h-screen">
          <Sidebar />
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      {toast && (
        <div className="p-3 bg-green-600 text-white rounded text-center">
          {toast}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">Gerenciar Popup de Promoção</h1>

      {/* ATIVO / TEMPO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Ativar Popup:</label>
          <select
            className="w-full border p-2 rounded"
            value={popup.ativo}
            onChange={(e) =>
              setPopup({ ...popup, ativo: Number(e.target.value) })
            }
          >
            <option value={1}>Ativado</option>
            <option value={0}>Desativado</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Tempo de exibição (segundos):
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={popup.tempo}
            onChange={(e) =>
              setPopup({ ...popup, tempo: Number(e.target.value) })
            }
            min={1}
          />
        </div>
      </div>

      {/* TEXTOS */}
      <div className="space-y-3">
        <div>
          <label className="font-semibold">Título:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={popup.titulo || ""}
            onChange={(e) =>
              setPopup({ ...popup, titulo: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Subtítulo:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={popup.subtitulo || ""}
            onChange={(e) =>
              setPopup({ ...popup, subtitulo: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Preço:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={popup.preco || ""}
            onChange={(e) =>
              setPopup({ ...popup, preco: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Sabores:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={popup.sabores || ""}
            onChange={(e) =>
              setPopup({ ...popup, sabores: e.target.value })
            }
          />
        </div>
      </div>

      {/* IMAGENS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="font-semibold">Imagem 1 (Simba):</p>
          {popup.imagem1 && (
  <img
    src={`https://congolinaria.com.br/promo/${popup.imagem1}`}
    alt="Simba"
    className="w-full h-auto object-cover rounded-md border"
  />
)}
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              e.target.files[0] && enviarImagem("imagem1", e.target.files[0])
            }
          />
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Imagem 2 (Ngombe):</p>
          {popup.imagem2 && (
  <img
    src={`https://congolinaria.com.br/promo/${popup.imagem2}`}
    alt="Ngombe"
    className="w-full h-auto object-cover rounded-md border"
  />
)}
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              e.target.files[0] && enviarImagem("imagem2", e.target.files[0])
            }
          />
        </div>
      </div>

      {/* CORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="font-semibold">Cor do Fundo:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.bg_color || "#F2C94C"}
            onChange={(e) =>
              setPopup({ ...popup, bg_color: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor do Título:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.title_color || "#000000"}
            onChange={(e) =>
              setPopup({ ...popup, title_color: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor do Subtítulo:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.subtitle_color || "#000000"}
            onChange={(e) =>
              setPopup({ ...popup, subtitle_color: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor do Preço:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.price_color || "#C0392B"}
            onChange={(e) =>
              setPopup({ ...popup, price_color: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor dos Sabores:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.flavors_color || "#000000"}
            onChange={(e) =>
              setPopup({ ...popup, flavors_color: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor da Borda:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.border_color || "#000000"}
            onChange={(e) =>
              setPopup({ ...popup, border_color: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor do Botão:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.button_bg || "#000000"}
            onChange={(e) =>
              setPopup({ ...popup, button_bg: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor do Texto do Botão:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.button_text || "#FFFFFF"}
            onChange={(e) =>
              setPopup({ ...popup, button_text: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Cor da Sombra:</label>
          <input
            type="color"
            className="w-full h-10 cursor-pointer"
            value={popup.shadow_color || "#000000"}
            onChange={(e) =>
              setPopup({ ...popup, shadow_color: e.target.value })
            }
          />
        </div>
      </div>

      {/* PRESETS */}
      <div className="flex flex-wrap gap-3 mt-4">
        <button
          className="px-3 py-2 bg-yellow-500 text-black rounded text-sm"
          onClick={() => aplicarPreset("congolinaria")}
        >
          Preset Congolinaria
        </button>
        <button
          className="px-3 py-2 bg-black text-yellow-400 rounded text-sm"
          onClick={() => aplicarPreset("blackfriday")}
        >
          Preset Black Friday
        </button>
        <button
          className="px-3 py-2 bg-green-700 text-white rounded text-sm"
          onClick={() => aplicarPreset("natal")}
        >
          Preset Natal
        </button>
        <button
          className="px-3 py-2 bg-gray-200 text-black rounded text-sm"
          onClick={() => aplicarPreset("minimal")}
        >
          Preset Minimalista Premium
        </button>
      </div>

      {/* PREVIEW AO VIVO */}
      <div
        className="mt-8 p-6 rounded-xl shadow-xl max-w-md mx-auto text-center"
        style={{
          backgroundColor: popup.bg_color,
          border: `3px solid ${popup.border_color}`,
          boxShadow: `0 6px 25px ${popup.shadow_color}`,
        }}
      >
        <h2
          className="text-2xl font-bold"
          style={{ color: popup.title_color }}
        >
          {popup.titulo}
        </h2>

        <p className="text-lg" style={{ color: popup.subtitle_color }}>
          {popup.subtitulo}
        </p>

        <p
          className="text-xl font-bold mt-2"
          style={{ color: popup.price_color }}
        >
          {popup.preco}
        </p>

        <p className="mt-1" style={{ color: popup.flavors_color }}>
          {popup.sabores}
        </p>

        <button
          className="px-4 py-2 rounded mt-4 text-sm font-semibold"
          style={{
            backgroundColor: popup.button_bg,
            color: popup.button_text,
          }}
        >
          Aproveitar Agora
        </button>
      </div>

      {/* BOTÃO SALVAR */}
      <div className="pt-4">
        <button
          onClick={salvar}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
    </div>
  );
}
