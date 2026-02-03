import { useEffect, useState } from "react";
import AdminCategoriasDashboard from "./AdminCategoriasDashboard";


const API = "https://congolinaria.com.br/api/categorias_autoral.php";

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCategorias(data);
    } catch (e) {
      console.error("Erro ao carregar categorias", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setNome("");
    setIsActive(true);
    setEditing(null);
  };

  const save = async () => {
    if (!nome.trim()) return;

    const form = new FormData();
    form.append("nome", nome);
    form.append("is_active", isActive ? 1 : 0);

    const url = editing ? `${API}?id=${editing.id}` : API;

    await fetch(url, {
      method: "POST",
      body: form,
    });

    resetForm();
    load();
  };

const remove = async (id) => {
  if (!window.confirm("Remover categoria?")) return;

  const res = await fetch(`${API}?id=${id}`, {
    method: "DELETE",
  });

  const json = await res.json();

  if (json.erro) {
    alert(json.mensagem);
    return;
  }

  load();
};


  return (
    <div className="bg-[#13261d] p-6 rounded-xl border border-emerald-900">
      <h2 className="text-xl text-yellow-400 mb-4">
        Gerenciar categorias
      </h2>
      
<AdminCategoriasDashboard />

      {/* FORMULÁRIO */}
      <div className="space-y-3 mb-6">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da categoria"
          className="bg-gray-900 border border-gray-700 p-2 rounded w-full text-white"
        />

        <label className="flex items-center gap-2 text-sm text-emerald-200">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Categoria ativa
        </label>

        <div className="flex gap-2">
          <button
            onClick={save}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white"
          >
            {editing ? "Atualizar" : "Adicionar"}
          </button>

          {editing && (
            <button
              onClick={resetForm}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* LISTAGEM */}
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <ul className="space-y-2">
          {categorias.map((c) => (
            <li
  key={c.id}
  className="flex justify-between items-center bg-[#0f1e17] p-3 rounded"
>
  <div className="flex flex-col">
    <span className="font-medium text-emerald-100">
      {c.nome}
    </span>

    <div className="flex items-center gap-3 text-xs">
      <span
        className={`${
          c.is_active ? "text-green-400" : "text-gray-500"
        }`}
      >
        {c.is_active ? "ativa" : "inativa"}
      </span>

      <span className="text-emerald-300">
        {c.total_receitas} receita
        {c.total_receitas === 1 ? "" : "s"}
      </span>
    </div>
  </div>

  <div className="flex gap-3 text-sm">
    <button
      onClick={() => {
        setEditing(c);
        setNome(c.nome);
        setIsActive(!!c.is_active);
      }}
      className="text-blue-400 hover:underline"
    >
      Editar
    </button>

   <button
  disabled={c.total_receitas > 0}
  onClick={() => remove(c.id)}
  className={`hover:underline ${
    c.total_receitas > 0
      ? "text-gray-500 cursor-not-allowed"
      : "text-red-400"
  }`}
>
  Remover
</button>

  </div>
</li>

          ))}

          {categorias.length === 0 && (
            <li className="text-gray-400 text-sm">
              Nenhuma categoria cadastrada
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
