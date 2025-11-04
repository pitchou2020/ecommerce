import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReceitaPreview() {
  const [receita, setReceita] = useState(null);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://congolinaria.com.br/api/receitas_autoriais.php")
      .then((res) => {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          setErro("Nenhuma receita encontrada.");
          return;
        }

        // 🔹 Escolhe uma receita aleatória
        const aleatoria = res.data[Math.floor(Math.random() * res.data.length)];

        // 🔹 Corrige URL da imagem (adiciona domínio se faltar)
        if (aleatoria.imagem && !aleatoria.imagem.startsWith("http")) {
          aleatoria.imagem = `https://congolinaria.com.br/${aleatoria.imagem}`;
        }

        setReceita(aleatoria);
      })
      .catch((err) => {
        console.error("❌ Erro ao carregar receitas:", err);
        setErro("Erro ao carregar receitas.");
      });
  }, []);

  if (erro)
    return (
      <div className="bg-red-600 text-white text-center p-4 rounded-xl mt-6">
        {erro}
      </div>
    );

  if (!receita)
    return (
      <div className="max-w-xl mx-auto mt-6 bg-yellow-800 text-white p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg">Carregando receita...</p>
      </div>
    );

  const {
    id,
    titulo = "Receita sem título",
    sinopse = "Sem descrição disponível",
    imagem,
  } = receita;

  return (
    <div className="max-w-xl mx-auto mt-6 bg-yellow-800 text-white p-6 rounded-xl shadow-lg text-center">
      {imagem ? (
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-60 object-cover rounded-lg mb-4"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div className="w-full h-60 bg-yellow-900 flex items-center justify-center rounded-lg mb-4 text-yellow-400">
          🍽 Sem imagem disponível
        </div>
      )}

      <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
      <p className="mb-4 text-yellow-200">{sinopse}</p>

      <button
        onClick={() => navigate(`/assistente-completo?id=${id}`)}
        className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold shadow"
      >
        ▶️ Iniciar com Assistente Completo
      </button>
    </div>
  );
}
