// src/pages/Instituto/PainelVoluntarios.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://congolinaria.com.br/api/instituto/";

export default function PainelVoluntarios() {
  const [lista, setLista] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  const carregar = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE + "listar_voluntarios.php", {
        params: { q: busca || "" },
        withCredentials: true,
      });
      setLista(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportarCSV = () => {
    if (!lista.length) return;
    const header = [
      "id",
      "nome",
      "telefone",
      "email",
      "cidade",
      "instituicao",
      "cnpj",
      "area_atuacao",
      "tipo_voluntariado",
      "disponibilidade",
      "presencial_online",
      "observacoes",
      "created_at",
    ];
    const linhas = lista.map((row) =>
      header
        .map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`)
        .join(";")
    );
    const csv = [header.join(";"), ...linhas].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "voluntarios_instituto_congolinaria.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#144D3A]">
              Painel de Voluntários
            </h1>
            <p className="text-gray-600 text-sm">
              Visualize os voluntários cadastrados e organize a rede de apoio.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por nome, cidade ou área..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
            <button
              onClick={carregar}
              className="px-4 py-2 bg-[#144D3A] text-white text-sm rounded-lg"
            >
              Buscar
            </button>
            <button
              onClick={exportarCSV}
              className="px-4 py-2 bg-[#C9A23F] text-[#144D3A] text-sm rounded-lg"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Nome</th>
                  <th className="border px-2 py-1">Área</th>
                  <th className="border px-2 py-1">Cidade</th>
                  <th className="border px-2 py-1">Contato</th>
                  <th className="border px-2 py-1">Instituição</th>
                  <th className="border px-2 py-1">Disponibilidade</th>
                  <th className="border px-2 py-1">Forma</th>
                  <th className="border px-2 py-1">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{item.nome}</td>
                    <td className="border px-2 py-1">
                      {item.area_atuacao || "-"}
                    </td>
                    <td className="border px-2 py-1">{item.cidade || "-"}</td>
                    <td className="border px-2 py-1">
                      {item.email || item.telefone || "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {item.instituicao || "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {item.disponibilidade || "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {item.presencial_online || "-"}
                    </td>
                    <td className="border px-2 py-1 text-xs">
                      {item.created_at}
                    </td>
                  </tr>
                ))}
                {!lista.length && (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      Nenhum cadastro encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
