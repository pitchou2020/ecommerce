import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../composant/Sidebar/Sidebar';

export default function PainelAdminCop30() {
  const [pratos, setPratos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Controle do modal de variações
  const [showVariacoesModal, setShowVariacoesModal] = useState(false);
  const [variacoes, setVariacoes] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [formVar, setFormVar] = useState({
    id: null,
    id_produto: null,
    variacao: "",
    preco_adicional: 0
  });

  // 🔥 Form principal
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

  /* ==========================
     CARREGAR DADOS DO BACKEND
  ========================== */
  const carregarPratos = () => {
    axios
      .get("https://congolinaria.com.br/api/cardapio_cop30.php")
      .then((res) => setPratos(res.data))
      .catch((err) => console.error(err));
  };

  const carregarCategorias = () => {
    axios
      .get("https://congolinaria.com.br/api/categorias_cop30.php")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error(err));
  };

  const carregarVariacoes = async (id_produto) => {
    try {
      const res = await axios.get(
        `https://congolinaria.com.br/api/variacoes_cop30.php?id_produto=${id_produto}`
      );
      setVariacoes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    carregarPratos();
    carregarCategorias();
  }, []);

  /* ==========================
     SALVAR PRATO
  ========================== */
  const handleSubmit = async () => {
    if (!form.nome.trim()) return alert("O nome do prato é obrigatório.");
    if (!form.categoria_id) return alert("Selecione uma categoria.");
    if (!form.preco.trim()) return alert("O preço é obrigatório.");

    setLoading(true);

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
      }

      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Prato salvo com sucesso!");
      carregarPratos();
      setPreviewImagem(null);

      // Reset
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

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar prato.");
    }

    setLoading(false);
  };

  /* ==========================
     EDITAR PRATO
  ========================== */
  const handleEdit = (prato) => {
    setForm({
      id: prato.id,
      nome: prato.nome,
      descricao: prato.descricao,
      categoria_id: prato.categoria_id,
      ingredientes: prato.ingredientes,
      modo_preparo: prato.modo_preparo,
      montagem_prato: prato.montagem_prato,
      modo_servir: prato.modo_servir,
      preco: prato.preco,
      imagem: null,
      idioma: 'pt',

      peso: prato.peso,
      validade: prato.validade,
      conservacao: prato.conservacao,
      embalagem: prato.embalagem,
      rendimento: prato.rendimento,
      tipo_prato: prato.tipo_prato,

      calorias: prato.calorias,
      proteina: prato.proteina,
      carboidrato: prato.carboidrato,
      gordura: prato.gordura,
      fibra: prato.fibra,
      sodio: prato.sodio,

      contem: prato.contem,
      pode_conter: prato.pode_conter
    });

    setPreviewImagem(
      prato.imagem ? `https://congolinaria.com.br/${prato.imagem}` : null
    );
  };

  /* ==========================
     EXCLUIR PRATO
  ========================== */
  const handleDelete = (id) => {
    if (!window.confirm("Excluir prato?")) return;

    axios
      .delete("https://congolinaria.com.br/api/cardapio_cop30.php", {
        data: { id },
      })
      .then(() => {
        carregarPratos();
        alert("Prato excluído!");
      })
      .catch((err) => console.error(err));
  };

  /* ==========================
     VARIAÇÕES
  ========================== */
  const abrirVariacoes = async (prato) => {
    setProdutoSelecionado(prato);
    await carregarVariacoes(prato.id);
    setFormVar({
      id: null,
      id_produto: prato.id,
      variacao: "",
      preco_adicional: 0
    });
    setShowVariacoesModal(true);
  };

  const salvarVariacao = async () => {
    if (!formVar.variacao.trim()) return alert("Nome da variação obrigatório");

    const fd = new FormData();
    Object.entries(formVar).forEach(([k, v]) => fd.append(k, v));

    await axios.post(
      "https://congolinaria.com.br/api/variacoes_cop30.php",
      fd,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    await carregarVariacoes(formVar.id_produto);
    setFormVar({ id: null, id_produto: produtoSelecionado.id, variacao: "", preco_adicional: 0 });
  };

  const excluirVariacao = async (id) => {
    if (!window.confirm("Excluir variação?")) return;
    await axios.delete("https://congolinaria.com.br/api/variacoes_cop30.php", {
      data: { id }
    });
    await carregarVariacoes(produtoSelecionado.id);
  };

  /* ==========================
     RENDER
  ========================== */
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="p-4 max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-4">Administração Cardápio COP30</h1>

        {/* FORM PRINCIPAL */}
        <input type="text" placeholder="Nome do prato"
               value={form.nome}
               onChange={(e) => setForm({ ...form, nome: e.target.value })}
               className="w-full border p-2 mb-2 rounded" />

        <textarea placeholder="Descrição"
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  className="w-full border p-2 mb-2 rounded" />

        <select
          value={form.categoria_id}
          onChange={(e) => setForm({ ...form, categoria_id: Number(e.target.value) })}
          className="w-full border p-2 mb-2 rounded"
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome_pt}
            </option>
          ))}
        </select>

        {/* CAMPOS TÉCNICOS */}
        <textarea className="w-full border p-2 mb-2 rounded" placeholder="Ingredientes"
                  value={form.ingredientes}
                  onChange={(e) => setForm({ ...form, ingredientes: e.target.value })} />

        <textarea className="w-full border p-2 mb-2 rounded" placeholder="Modo de preparo"
                  value={form.modo_preparo}
                  onChange={(e) => setForm({ ...form, modo_preparo: e.target.value })} />

        <textarea className="w-full border p-2 mb-2 rounded" placeholder="Montagem"
                  value={form.montagem_prato}
                  onChange={(e) => setForm({ ...form, montagem_prato: e.target.value })} />

        <textarea className="w-full border p-2 mb-2 rounded" placeholder="Modo de servir"
                  value={form.modo_servir}
                  onChange={(e) => setForm({ ...form, modo_servir: e.target.value })} />

        {/* CAMPOS SECUNDÁRIOS */}
        <input className="w-full border p-2 mb-2 rounded" placeholder="Peso"
               value={form.peso}
               onChange={(e) => setForm({ ...form, peso: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Validade"
               value={form.validade}
               onChange={(e) => setForm({ ...form, validade: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Conservação"
               value={form.conservacao}
               onChange={(e) => setForm({ ...form, conservacao: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Embalagem"
               value={form.embalagem}
               onChange={(e) => setForm({ ...form, embalagem: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Rendimento"
               value={form.rendimento}
               onChange={(e) => setForm({ ...form, rendimento: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Tipo do prato"
               value={form.tipo_prato}
               onChange={(e) => setForm({ ...form, tipo_prato: e.target.value })} />

        <div className="grid grid-cols-2 gap-3 mb-2">
          <input className="border p-2 rounded" placeholder="Calorias" value={form.calorias}
                 onChange={(e) => setForm({ ...form, calorias: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Proteína" value={form.proteina}
                 onChange={(e) => setForm({ ...form, proteina: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Carboidrato" value={form.carboidrato}
                 onChange={(e) => setForm({ ...form, carboidrato: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Gordura" value={form.gordura}
                 onChange={(e) => setForm({ ...form, gordura: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Fibra" value={form.fibra}
                 onChange={(e) => setForm({ ...form, fibra: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Sódio" value={form.sodio}
                 onChange={(e) => setForm({ ...form, sodio: e.target.value })} />
        </div>

        <input className="w-full border p-2 mb-2 rounded" placeholder="Contém"
               value={form.contem}
               onChange={(e) => setForm({ ...form, contem: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Pode conter"
               value={form.pode_conter}
               onChange={(e) => setForm({ ...form, pode_conter: e.target.value })} />

        <input className="w-full border p-2 mb-2 rounded" placeholder="Preço"
               value={form.preco}
               onChange={(e) => setForm({ ...form, preco: e.target.value })} />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setForm({ ...form, imagem: file });
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setPreviewImagem(reader.result);
              reader.readAsDataURL(file);
            }
          }}
          className="w-full border p-2 mb-2 rounded"
        />

        {previewImagem && (
          <img
            src={previewImagem}
            className="w-full max-h-60 object-cover rounded mb-3"
            alt="Preview"
          />
        )}

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-700"}`}
        >
          {form.id ? "Atualizar Prato" : "Cadastrar Prato"}
        </button>

        {/* LISTAGEM */}
        <h2 className="text-xl font-bold mt-6 mb-2">Pratos cadastrados</h2>

        <div className="grid gap-4">
          {pratos.map((prato) => (
            <div key={prato.id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{prato.nome}</h3>
              <p>{prato.descricao}</p>

              {prato.imagem && (
                <img
                  src={`https://congolinaria.com.br/${prato.imagem}`}
                  className="w-full max-h-60 object-cover my-2 rounded"
                />
              )}

              <p><b>Preço:</b> R$ {parseFloat(prato.preco).toFixed(2)}</p>
              <p><b>Categoria:</b> {prato.nome_categoria}</p>

              <div className="flex gap-2 mt-3">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleEdit(prato)}
                >
                  Editar
                </button>

                <button
                  className="px-3 py-1 bg-red-700 text-white rounded"
                  onClick={() => handleDelete(prato.id)}
                >
                  Excluir
                </button>

                <button
                  className="px-3 py-1 bg-green-700 text-white rounded"
                  onClick={() => abrirVariacoes(prato)}
                >
                  Variações
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL VARIAÇÕES */}
        {showVariacoesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">

              <h2 className="text-xl font-bold mb-3">
                Variações — {produtoSelecionado?.nome}
              </h2>

              <div className="mb-4">
                {variacoes.length === 0 && (
                  <p className="text-gray-500">Nenhuma variação cadastrada</p>
                )}

                {variacoes.map((v) => (
                  <div key={v.id} className="flex justify-between border p-2 rounded mb-2">
                    <div>
                      <b>{v.variacao}</b>
                      <p className="text-sm text-gray-600">
                        Adicional: R$ {Number(v.preco_adicional).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => excluirVariacao(v.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="text"
                placeholder="Nome da variação"
                className="w-full border p-2 mb-2 rounded"
                value={formVar.variacao}
                onChange={(e) =>
                  setFormVar({
                    ...formVar,
                    variacao: e.target.value,
                    id_produto: produtoSelecionado.id,
                  })
                }
              />

              <input
                type="number"
                step="0.01"
                placeholder="Preço adicional"
                className="w-full border p-2 mb-3 rounded"
                value={formVar.preco_adicional}
                onChange={(e) =>
                  setFormVar({
                    ...formVar,
                    preco_adicional: e.target.value,
                  })
                }
              />

              <button
                onClick={salvarVariacao}
                className="w-full bg-blue-600 text-white py-2 rounded mb-3"
              >
                Salvar Variação
              </button>

              <button
                onClick={() => setShowVariacoesModal(false)}
                className="w-full bg-gray-500 text-white py-2 rounded"
              >
                Fechar
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
