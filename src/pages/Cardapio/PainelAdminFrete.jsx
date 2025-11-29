import React, { useEffect, useState } from "react";
import Sidebar from '../../composant/Sidebar/Sidebar';

export default function PainelAdminFrete() {
  const [config, setConfig] = useState({
    frete_base: "",
    preco_por_km: "",
    limite_km: "",
    frete_gratis_min: "",
  });

  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  /* ---------------------------------------------------
     🔎 CARREGAR CONFIGURAÇÕES EXISTENTES
  --------------------------------------------------- */
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("https://congolinaria.com.br/api/frete_config.php");
        const data = await res.json();
        setConfig(data);
        setLoading(false);
      } catch (e) {
        setMensagem("Erro ao carregar configurações.");
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  /* ---------------------------------------------------
     💾 SALVAR CONFIGURAÇÕES
  --------------------------------------------------- */
  const salvarConfig = async () => {
    try {
      const res = await fetch("https://congolinaria.com.br/api/frete_config.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (data.status === "ok") {
        setMensagem("Configurações salvas com sucesso! 🚀");
      } else {
        setMensagem("Erro ao salvar configurações.");
      }
    } catch (e) {
      setMensagem("Erro na comunicação com o servidor.");
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="flex min-h-screen">
          <Sidebar />
    
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">
        ⚙ Painel de Configuração de Frete
      </h1>

      {mensagem && (
        <div className="mb-4 p-2 text-center bg-green-100 text-green-800 rounded">
          {mensagem}
        </div>
      )}

      {/* FRETE BASE */}
      <label className="block mt-3 font-semibold">Frete base (R$)</label>
      <input
        type="number"
        step="0.01"
        value={config.frete_base}
        onChange={(e) => setConfig({ ...config, frete_base: e.target.value })}
        className="w-full border p-2 rounded"
      />

      {/* PREÇO POR KM */}
      <label className="block mt-3 font-semibold">Preço por KM (R$)</label>
      <input
        type="number"
        step="0.01"
        value={config.preco_por_km}
        onChange={(e) => setConfig({ ...config, preco_por_km: e.target.value })}
        className="w-full border p-2 rounded"
      />

      {/* LIMITE DE ENTREGA */}
      <label className="block mt-3 font-semibold">Limite de entrega (KM)</label>
      <input
        type="number"
        value={config.limite_km}
        onChange={(e) => setConfig({ ...config, limite_km: e.target.value })}
        className="w-full border p-2 rounded"
      />

      {/* FRETE GRÁTIS */}
      <label className="block mt-3 font-semibold">Frete grátis acima de (R$)</label>
      <input
        type="number"
        step="0.01"
        value={config.frete_gratis_min}
        onChange={(e) =>
          setConfig({ ...config, frete_gratis_min: e.target.value })
        }
        className="w-full border p-2 rounded"
      />

      {/* BOTÃO */}
      <button
        onClick={salvarConfig}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Salvar Configurações
      </button>
    </div>
    </div>
  );
}
