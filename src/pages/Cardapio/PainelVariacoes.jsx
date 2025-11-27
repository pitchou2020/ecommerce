import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../composant/Sidebar/Sidebar";

export default function PainelVariacoes() {
  const [variacoes, setVariacoes] = useState([]);
  const [pratos, setPratos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    id_produto: "",
    variacao: "",
    preco_adicional: 0,
  });

  const API = "https://congolinaria.com.br/api/variacoes_cop30.php";

  useEffect(() => {
    carregarVariacoes();
    carregarPratos();
  }, []);

  const carregarVariacoes = () => {
    axios.get(API).then((res) => setVariacoes(res.data));
  };

  const carregarPratos = () => {
    axios
      .get("https://congolinaria.com.br/api/cardapio_cop30.php")
      .then((res) => setPratos(res.data));
  };

  const salvar = async () => {
    if (!form.id_produto || !form.variacao.trim()) {
      alert("Selecione um prato e informe a variação.");
      return;
    }

    if (form.id) {
      await axios.put(API, form);
    } else {
      await axios.post(API, form);
    }

    carregarVariacoes();
    setForm({ id: null, id_produto: "", variacao: "", preco_adicional: 0 });
  };

  const editar = (v) => {
    setForm(v);
  };

  const excluir = async (id) => {
    if (!window.confirm("Excluir variação?")) return;

    await axios.delete(API, { data: { id } });
    carregarVariacoes();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="p-6 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Variações de Pratos</h1>

        {/* Formulário */}
        <div className="bg-white border p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">
            {form.id ? "Editar Variação" : "Nova Variação"}
          </h2>

          <select
            className="w-full border p-2 mb-2 rounded"
            value={form.id_produto}
            onChange={(e) =>
              setForm({ ...form, id_produto: Number(e.target.value) })
            }
          >
            <option value="">Selecione o prato</option>
            {pratos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="w-full border p-2 mb-2 rounded"
            placeholder="Ex: Espinafre, Palmito, Jaca temperada"
            value={form.variacao}
            onChange={(e) => setForm({ ...form, variacao: e.target.value })}
          />

          <input
            type="number"
            className="w-full border p-2 mb-2 rounded"
            placeholder="Preço adicional (opcional)"
            value={form.preco_adicional}
            onChange={(e) =>
              setForm({ ...form, preco_adicional: Number(e.target.value) })
            }
          />

          <button
            onClick={salvar}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            {form.id ? "Atualizar" : "Cadastrar"}
          </button>
        </div>

        {/* Lista de variações */}
        <h2 className="text-xl font-bold mb-3">Variações Cadastradas</h2>

        <div className="grid gap-4">
          {variacoes.map((v) => (
            <div key={v.id} className="border p-4 rounded shadow">
              <p className="font-bold">{v.variacao}</p>
              <p className="text-sm text-gray-600">
                Prato: {v.nome_prato ?? "—"}
              </p>
              <p>
                Adicional:{" "}
                <b>R$ {Number(v.preco_adicional).toFixed(2)}</b>
              </p>

              <div className="flex mt-2 gap-2">
                <button
                  onClick={() => editar(v)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(v.id)}
                  className="px-3 py-1 bg-red-700 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
