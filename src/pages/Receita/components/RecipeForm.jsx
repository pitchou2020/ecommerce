import { useEffect, useState } from "react";

const BASE_IMAGE_URL = "https://congolinaria.com.br/";
const CATEGORIAS_API =
  "https://congolinaria.com.br/api/categorias_autoral.php";

export default function RecipeForm({ initial, onSave, onCancel, saving }) {
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    titre: "",
    categoria_id: "",
    metodo_cocao: "",
    ingredientes: "",
    etapes: "",
    is_active: true,
    is_pro: false,
    image: null,
    remove_image: false,
  });

  const [preview, setPreview] = useState(null);

  // 🔹 carregar categorias
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const res = await fetch(CATEGORIAS_API);
        const data = await res.json();
        setCategorias(data.filter((c) => c.is_active == 1));
      } catch (e) {
        console.error("Erro ao carregar categorias", e);
      }
    };
    loadCategorias();
  }, []);

  // 🔹 preencher formulário na edição
  useEffect(() => {
    if (initial) {
      setForm({
        titre: initial.titre || "",
        categoria_id: initial.categoria_id || "",
        metodo_cocao: initial.metodo_cocao || "",
        ingredientes: initial.ingredientes || "",
        etapes: initial.etapes || "",
        is_active: !!initial.is_active,
        is_pro: !!initial.is_pro,
        image: null,
        remove_image: false,
      });

      if (initial.url_image) {
        setPreview(BASE_IMAGE_URL + initial.url_image);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        image: file,
        remove_image: false,
      }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
      remove_image: true,
    }));
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#13261d] p-6 rounded-xl border border-emerald-900 space-y-4"
    >
      <h2 className="text-lg font-semibold text-yellow-400">
        {initial ? "Editar receita" : "Nova receita"}
      </h2>

      {/* TÍTULO */}
      <input
        name="titre"
        value={form.titre}
        onChange={handleChange}
        placeholder="Título da receita"
        className="w-full bg-gray-900 border border-gray-700 p-2 rounded"
        required
      />

      {/* CATEGORIA */}
      <select
        name="categoria_id"
        value={form.categoria_id}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 p-2 rounded"
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>

      {/* MÉTODO */}
      <textarea
        name="metodo_cocao"
        value={form.metodo_cocao}
        onChange={handleChange}
        placeholder="Método de cocção"
        className="w-full bg-gray-900 border border-gray-700 p-2 rounded"
      />

      {/* INGREDIENTES */}
      <textarea
        name="ingredientes"
        value={form.ingredientes}
        onChange={handleChange}
        placeholder="Ingredientes"
        className="w-full bg-gray-900 border border-gray-700 p-2 rounded h-28"
      />

      {/* ETAPAS */}
      <textarea
        name="etapes"
        value={form.etapes}
        onChange={handleChange}
        placeholder="Etapas de preparo"
        className="w-full bg-gray-900 border border-gray-700 p-2 rounded h-32"
      />

      {/* PREVIEW DA IMAGEM */}
      {preview && (
        <div className="space-y-2">
          <p className="text-sm text-gray-300">Imagem da receita</p>
          <img
            src={preview}
            alt="Preview da receita"
            className="w-48 h-32 object-cover rounded-lg border border-emerald-700"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-red-400 text-sm hover:text-red-300"
          >
            🗑️ Remover imagem
          </button>
        </div>
      )}

      {/* UPLOAD */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="text-sm"
      />

      {/* FLAGS */}
      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Publicar no app
        </label>

        <label className="flex items-center gap-2 text-yellow-400">
          <input
            type="checkbox"
            name="is_pro"
            checked={form.is_pro}
            onChange={handleChange}
          />
          Receita PRO
        </label>
      </div>

      {/* AÇÕES */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>

        {initial && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
