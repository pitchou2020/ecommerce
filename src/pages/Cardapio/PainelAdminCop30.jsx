import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PainelAdminCop30() {
  const [pratos, setPratos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nome: '',
    descricao: '',
    categoria_id: '',
    ingredientes: '',
    modo_preparo: '',
    montagem_prato: '',
    modo_servir: '',
    preco: '',
    imagem: null,
    idioma: 'pt'
  });

  const carregarPratos = () => {
    axios.get('https://congolinaria.com.br/api/cardapio_cop30.php')
      .then(res => setPratos(res.data))
      .catch(err => console.error(err));
  };

  const carregarCategorias = () => {
    axios.get('https://congolinaria.com.br/api/categorias_cop30.php')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarPratos();
    carregarCategorias();
  }, []);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    // VALIDAÇÕES ESSENCIAIS (evita 400 e 500)
    if (!form.nome.trim()) {
      alert("O nome do prato é obrigatório.");
      setLoading(false);
      return;
    }

    if (!form.categoria_id) {
      alert("Selecione uma categoria.");
      setLoading(false);
      return;
    }

    if (!form.preco.trim()) {
      alert("O preço é obrigatório.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Envia imagem somente se existir
      Object.entries(form).forEach(([key, value]) => {
        if (key === "imagem") {
          if (value) formData.append("imagem", value);
        } else {
          formData.append(key, value);
        }
      });

      const url = "https://congolinaria.com.br/api/cardapio_cop30.php";

      if (form.id) {
        // UPDATE via POST com _method=PUT
        formData.append("_method", "PUT");

        await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        // INSERT normal
        await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      alert("Prato salvo com sucesso!");
      carregarPratos();

      setForm({
        id: null,
        nome: "",
        descricao: "",
        categoria_id: "",
        ingredientes: "",
        modo_preparo: "",
        montagem_prato: "",
        modo_servir: "",
        preco: "",
        imagem: null,
        idioma: "pt"
      });

      setPreviewImagem(null);

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar prato. Verifique os campos obrigatórios.");
    }

    setLoading(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Deseja excluir este prato?")) return;

    axios.delete('https://congolinaria.com.br/api/cardapio_cop30.php', {
      data: { id }
    })
      .then(() => {
        carregarPratos();
        alert("Prato excluído!");
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (prato) => {
    setForm({
      id: prato.id,
      nome: prato.nome ?? '',
      descricao: prato.descricao ?? '',
      categoria_id: Number(prato.categoria_id) || '',
      ingredientes: prato.ingredientes ?? '',
      modo_preparo: prato.modo_preparo ?? '',
      montagem_prato: prato.montagem_prato ?? '',
      modo_servir: prato.modo_servir ?? '',
      preco: prato.preco ?? '',
      imagem: null,
      idioma: 'pt'
    });

    setPreviewImagem(
      prato.imagem
        ? `https://congolinaria.com.br/${prato.imagem}`
        : null
    );
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imagem: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImagem(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administração Cardápio COP30</h1>

      {/* Campos do formulário */}
      <input type="text" placeholder="Nome do prato"
        value={form.nome}
        onChange={e => setForm({ ...form, nome: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <textarea placeholder="Descrição"
        value={form.descricao}
        onChange={e => setForm({ ...form, descricao: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <select value={form.categoria_id}
        onChange={e => setForm({ ...form, categoria_id: Number(e.target.value) })}
        className="w-full border p-2 mb-2 rounded">
        <option value="">Selecione a categoria</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nome_pt}</option>
        ))}
      </select>

      <textarea placeholder="Ingredientes"
        value={form.ingredientes}
        onChange={e => setForm({ ...form, ingredientes: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <textarea placeholder="Modo de preparo"
        value={form.modo_preparo}
        onChange={e => setForm({ ...form, modo_preparo: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <textarea placeholder="Montagem do prato"
        value={form.montagem_prato}
        onChange={e => setForm({ ...form, montagem_prato: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <textarea placeholder="Modo de servir"
        value={form.modo_servir}
        onChange={e => setForm({ ...form, modo_servir: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Preço"
        value={form.preco}
        onChange={e => setForm({ ...form, preco: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="file"
        accept="image/*"
        onChange={handleImagemChange}
        className="w-full border p-2 mb-2 rounded" />

      {previewImagem && (
        <img src={previewImagem}
          className="w-full max-h-60 object-cover rounded mb-3" />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-700'}`}
      >
        {form.id ? "Atualizar Prato" : "Cadastrar Prato"}
      </button>

      <h2 className="text-lg font-bold mt-6 mb-2">Pratos Cadastrados</h2>

      <div className="grid gap-4">
        {pratos.map(prato => (
          <div key={prato.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{prato.nome}</h3>
            <p>{prato.descricao}</p>

            {prato.imagem && (
              <img
                src={`https://congolinaria.com.br/${prato.imagem}`}
                className="w-full max-h-60 object-cover rounded my-2"
              />
            )}

            <p><b>Preço:</b> R$ {parseFloat(prato.preco).toFixed(2)}</p>
            <p><b>Categoria:</b> {prato.nome_categoria}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(prato)} className="px-3 py-1 bg-yellow-500 text-white rounded">Editar</button>
              <button onClick={() => handleDelete(prato.id)} className="px-3 py-1 bg-red-700 text-white rounded">Excluir</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
