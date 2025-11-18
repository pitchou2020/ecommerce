import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../composant/Sidebar/Sidebar';

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
    idioma: 'pt',

    // NOVOS CAMPOS
    peso: '',
    validade: '',
    conservacao: '',
    embalagem: '',
    rendimento: '',
    tipo_prato: '',

    calorias: '',
    proteina: '',
    carboidrato: '',
    gordura: '',
    fibra: '',
    sodio: '',

    contem: '',
    pode_conter: ''
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

      Object.entries(form).forEach(([key, value]) => {
        if (key === "imagem") {
          if (value) formData.append("imagem", value);
        } else {
          formData.append(key, value);
        }
      });

      const url = "https://congolinaria.com.br/api/cardapio_cop30.php";

      if (form.id) {
        formData.append("_method", "PUT");
        await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      alert("Prato salvo com sucesso!");
      carregarPratos();

      setForm({
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
        idioma: 'pt',
        peso: '',
        validade: '',
        conservacao: '',
        embalagem: '',
        rendimento: '',
        tipo_prato: '',
        calorias: '',
        proteina: '',
        carboidrato: '',
        gordura: '',
        fibra: '',
        sodio: '',
        contem: '',
        pode_conter: ''
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
      idioma: 'pt',

      // NOVOS CAMPOS
      peso: prato.peso ?? '',
      validade: prato.validade ?? '',
      conservacao: prato.conservacao ?? '',
      embalagem: prato.embalagem ?? '',
      rendimento: prato.rendimento ?? '',
      tipo_prato: prato.tipo_prato ?? '',

      calorias: prato.calorias ?? '',
      proteina: prato.proteina ?? '',
      carboidrato: prato.carboidrato ?? '',
      gordura: prato.gordura ?? '',
      fibra: prato.fibra ?? '',
      sodio: prato.sodio ?? '',

      contem: prato.contem ?? '',
      pode_conter: prato.pode_conter ?? ''
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

     <div className="flex min-h-screen">
    <Sidebar />
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administração Cardápio COP30</h1>

      {/* CAMPOS BÁSICOS */}
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

      {/* INGREDIENTES / PREPARO */}
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

      {/* CAMPOS TÉCNICOS */}
      <h2 className="text-lg font-semibold mt-4 mb-1">Características Técnicas</h2>

      <input type="text" placeholder="Peso"
        value={form.peso}
        onChange={e => setForm({ ...form, peso: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Validade"
        value={form.validade}
        onChange={e => setForm({ ...form, validade: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Conservação"
        value={form.conservacao}
        onChange={e => setForm({ ...form, conservacao: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Embalagem"
        value={form.embalagem}
        onChange={e => setForm({ ...form, embalagem: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Rendimento"
        value={form.rendimento}
        onChange={e => setForm({ ...form, rendimento: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Tipo do prato (ex.: Principal, Entrada, Acompanhamento)"
        value={form.tipo_prato}
        onChange={e => setForm({ ...form, tipo_prato: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      {/* TABELA NUTRICIONAL */}
      <h2 className="text-lg font-semibold mt-4 mb-1">Tabela Nutricional (por 100g)</h2>

      <div className="grid grid-cols-2 gap-2">
        <input type="text" placeholder="Calorias (kcal)"
          value={form.calorias}
          onChange={e => setForm({ ...form, calorias: e.target.value })}
          className="border p-2 rounded" />

        <input type="text" placeholder="Proteína (g)"
          value={form.proteina}
          onChange={e => setForm({ ...form, proteina: e.target.value })}
          className="border p-2 rounded" />

        <input type="text" placeholder="Carboidrato (g)"
          value={form.carboidrato}
          onChange={e => setForm({ ...form, carboidrato: e.target.value })}
          className="border p-2 rounded" />

        <input type="text" placeholder="Gordura (g)"
          value={form.gordura}
          onChange={e => setForm({ ...form, gordura: e.target.value })}
          className="border p-2 rounded" />

        <input type="text" placeholder="Fibra (g)"
          value={form.fibra}
          onChange={e => setForm({ ...form, fibra: e.target.value })}
          className="border p-2 rounded" />

        <input type="text" placeholder="Sódio (mg)"
          value={form.sodio}
          onChange={e => setForm({ ...form, sodio: e.target.value })}
          className="border p-2 rounded" />
      </div>

      {/* ALERGÊNICOS */}
      <h2 className="text-lg font-semibold mt-4 mb-1">Alergênicos</h2>

      <input type="text" placeholder="Contém"
        value={form.contem}
        onChange={e => setForm({ ...form, contem: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      <input type="text" placeholder="Pode conter"
        value={form.pode_conter}
        onChange={e => setForm({ ...form, pode_conter: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      {/* PREÇO */}
      <input type="text" placeholder="Preço"
        value={form.preco}
        onChange={e => setForm({ ...form, preco: e.target.value })}
        className="w-full border p-2 mb-2 rounded" />

      {/* IMAGEM */}
      <input type="file"
        accept="image/*"
        onChange={handleImagemChange}
        className="w-full border p-2 mb-2 rounded" />

      {previewImagem && (
        <img
          src={previewImagem}
          className="w-full max-h-60 object-cover rounded mb-3"
          alt="Preview"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-700'}`}
      >
        {form.id ? "Atualizar Prato" : "Cadastrar Prato"}
      </button>

      {/* LISTA DE PRATOS */}
      <h2 className="text-lg font-bold mt-6 mb-2">Pratos Cadastrados</h2>

      <div className="grid gap-4">
        {pratos.map(prato => (
          <div key={prato.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{prato.nome}</h3>
            <p className="text-sm">{prato.descricao}</p>

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
    </div>
  );
}
