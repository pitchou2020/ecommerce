import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../composant/Sidebar/Sidebar";
import { motion } from "framer-motion";

export default function PainelHeroAdmin() {
  const URL_HERO = "https://congolinaria.com.br/api/home_hero.php";

  const [titulo, setTitulo] = useState("");
  const [botaoTexto, setBotaoTexto] = useState("");
  const [botaoLink, setBotaoLink] = useState("");

  const [imagemAtual, setImagemAtual] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const [toast, setToast] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // Carregar dados do banco
  useEffect(() => {
    axios
      .get(URL_HERO)
      .then((res) => {
        if (res.data) {
          setTitulo(res.data.titulo || "");
          setBotaoTexto(res.data.botao_texto || "");
          setBotaoLink(res.data.botao_link || "");
          setImagemAtual(res.data.imagem || null);
        }
      })
      .catch(() => setToast("Erro ao carregar dados do Hero."));
  }, []);

  // Preview da imagem nova
  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNovaImagem(file);
    setPreview(URL.createObjectURL(file));
  };

  // Salvar
  const salvarAlteracoes = async () => {
    setSalvando(true);
    setToast(null);

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("botao_texto", botaoTexto);
    formData.append("botao_link", botaoLink);
    formData.append("imagem_antiga", imagemAtual ?? "");

    if (novaImagem) formData.append("imagem", novaImagem);

    try {
      const response = await axios.post(URL_HERO, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (!response.data.erro) {
        setToast("Hero atualizado com sucesso!");
        if (novaImagem) setImagemAtual(response.data.imagem ?? imagemAtual);
        setNovaImagem(null);
        setPreview(null);
      } else {
        setToast("Erro ao salvar: " + response.data.mensagem);
      }
    } catch (err) {
      setToast("Erro ao enviar dados ao servidor.");
    }

    setSalvando(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6 text-gray-800 text-center"
          >
            Editar Banner da Home (Hero)
          </motion.h1>

          {toast && (
            <div className="bg-amber-500 text-white px-4 py-2 rounded mb-4 shadow text-center font-medium">
              {toast}
            </div>
          )}

          {/* Título */}
          <label className="font-semibold text-gray-700 block mb-1">Título</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          {/* Texto do Botão */}
          <label className="font-semibold text-gray-700 block mb-1">Texto do Botão</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={botaoTexto}
            onChange={(e) => setBotaoTexto(e.target.value)}
          />

          {/* Link */}
          <label className="font-semibold text-gray-700 block mb-1">Link do Botão</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={botaoLink}
            onChange={(e) => setBotaoLink(e.target.value)}
          />

          {/* Imagem */}
          <label className="font-semibold text-gray-700 block mb-2">Imagem do Hero</label>
          <input
            type="file"
            accept="image/*"
            className="mb-4 text-gray-600"
            onChange={handleImagem}
          />

          {(preview || imagemAtual) && (
            <img
              src={preview || `https://congolinaria.com.br/${imagemAtual}`}
              alt="preview"
              className="w-full max-w-sm rounded-lg shadow-lg border mx-auto mb-4"
            />
          )}

          {/* Botão */}
          <button
            onClick={salvarAlteracoes}
            disabled={salvando}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition-all"
          >
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
