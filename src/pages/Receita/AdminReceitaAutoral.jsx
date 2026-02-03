import { useEffect, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeTable from "./components/RecipeTable";

const API_URL = "https://congolinaria.com.br/api/receita_autoral.php";
// const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY; // opcional

export default function AdminReceitaAutoral() {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setRecipes(json.dados || []);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao carregar receitas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSave = async (data, isEdit = false) => {
    setSaving(true);
    try {
      const formData = new FormData();

      formData.append("titre", data.titre);
      formData.append("categoria", data.categoria);
      formData.append("categoria_id", data.categoria_id);
      formData.append("metodo_cocao", data.metodo_cocao);
      formData.append("ingredientes", data.ingredientes);
      formData.append("etapes", data.etapes);

      // novos controles
      formData.append("is_active", data.is_active ? 1 : 0);
      formData.append("is_pro", data.is_pro ? 1 : 0);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const url = isEdit ? `${API_URL}?id=${editing.id}` : API_URL;

      const res = await fetch(url, {
        method: "POST",
        // headers: { "X-ADMIN-KEY": ADMIN_KEY },
        body: formData,
      });

      const json = await res.json();
      setMessage(json.mensagem || "Receita salva com sucesso");

      setEditing(null);
      fetchRecipes();
    } catch (err) {
      console.error(err);
      setMessage("Erro ao salvar receita");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
        // headers: { "X-ADMIN-KEY": ADMIN_KEY },
      });
      const json = await res.json();
      setMessage(json.mensagem || "Receita excluída");
      fetchRecipes();
    } catch (err) {
      console.error(err);
      setMessage("Erro ao excluir receita");
    }
  };

  const filtered = recipes
    .filter((r) =>
      r.titre?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.is_active !== b.is_active) {
        return b.is_active - a.is_active; // ativas primeiro
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <div className="min-h-screen bg-[#0f1e17] text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">
            Painel Admin — Receitas Autorais
          </h1>
          <p className="text-gray-300 text-sm">
            Gerencie as receitas exibidas no aplicativo Congolinaria Receitas.
          </p>
        </div>

        <div className="px-4 py-1 bg-green-700 text-xs rounded-full border border-green-500/40">
          acesso interno
        </div>
      </header>

      {message && (
        <div className="mb-4 p-3 rounded bg-emerald-800 text-emerald-200 border border-emerald-600">
          {message}
        </div>
      )}

      <RecipeForm
        initial={editing}
        saving={saving}
        onSave={(data) => handleSave(data, !!editing)}
        onCancel={() => setEditing(null)}
      />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-yellow-400">
            Receitas cadastradas
          </h2>

          <input
            type="text"
            placeholder="Buscar..."
            className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <RecipeTable
            recipes={filtered}
            onEdit={(r) => setEditing(r)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
