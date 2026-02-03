import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "../../composant/Sidebar/Sidebar";

export default function PainelAdminHortifruti() {
  const [produtos, setprodutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FILTRO POR CATEGORIA (LISTAGEM)
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  // 🔥 Controle do modal de variações
  const [showVariacoesModal, setShowVariacoesModal] = useState(false);
  const [variacoes, setVariacoes] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [formVar, setFormVar] = useState({
    id: null,
    id_produto: null,
    variacao: "",
    preco_adicional: 0,
  });

  // 🔥 Form principal
  const [form, setForm] = useState({
    id: null,
    nome: "",
    descricao: "",
    categoria_id: "",
    ingredientes: "",
    modo_preparo: "",
    montagem_produto: "",
    modo_servir: "",
    preco: "",
    imagem: null,
    idioma: "pt",

    peso: "",
    validade: "",
    conservacao: "",
    embalagem: "",
    rendimento: "",
    tipo_produto: "",

    calorias: "",
    proteina: "",
    carboidrato: "",
    gordura: "",
    fibra: "",
    sodio: "",

    contem: "",
    pode_conter: "",

    // ✅ NOVO (status/estoque)
    ativo: 1,
  });

  /* ==========================
     CARREGAR DADOS DO BACKEND
  ========================== */
  const carregarprodutos = () => {
    axios
      .get("https://congolinaria.com.br/api/hortifruti.php")
      .then((res) => setprodutos(res.data))
      .catch((err) => console.error(err));
  };

  const carregarCategorias = () => {
    axios
      .get("https://congolinaria.com.br/api/categorias_hortifruti.php")
      .then((res) => {
        const dados = res.data?.categorias || res.data || [];
        setCategorias(Array.isArray(dados) ? dados : []);
      })
      .catch((err) => {
        console.error(err);
        setCategorias([]);
      });
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
    carregarprodutos();
    carregarCategorias();
  }, []);

  // ✅ LISTA FILTRADA POR CATEGORIA
  const produtosFiltrados = useMemo(() => {
    const lista = Array.isArray(produtos) ? [...produtos] : [];
    if (categoriaFiltro === "todas") return lista;

    const idFiltro = Number(categoriaFiltro);
    return lista.filter((p) => Number(p.categoria_id) === idFiltro);
  }, [produtos, categoriaFiltro]);

  /* ==========================
     ✅ ATIVAR/DESATIVAR (NO CARD)
  ========================== */
  const toggleAtivo = async (produto) => {
    const novoAtivo = Number(produto.ativo) === 1 ? 0 : 1;

    try {
      const fd = new FormData();
      fd.append("id", produto.id);
      fd.append("ativo", novoAtivo);
      fd.append("acao", "toggle_ativo");
      fd.append("_method", "PUT");

      await axios.post("https://congolinaria.com.br/api/hortifruti.php", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Atualiza a lista na hora (sem recarregar tudo)
      setprodutos((prev) =>
        prev.map((p) => (p.id === produto.id ? { ...p, ativo: novoAtivo } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao alterar status do produto.");
    }
  };

  /* ==========================
     SALVAR PRODUTO
  ========================== */
  const handleSubmit = async () => {
    if (!form.nome.trim()) return alert("O nome do produto é obrigatório.");
    if (!form.categoria_id) return alert("Selecione uma categoria.");
    if (!String(form.preco).trim()) return alert("O preço é obrigatório.");

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

      const url = "https://congolinaria.com.br/api/hortifruti.php";

      if (form.id) {
        formData.append("_method", "PUT");
      }

      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Produto salvo com sucesso!");
      carregarprodutos();
      setPreviewImagem(null);

      setForm({
        id: null,
        nome: "",
        descricao: "",
        categoria_id: "",
        ingredientes: "",
        modo_preparo: "",
        montagem_produto: "",
        modo_servir: "",
        preco: "",
        imagem: null,
        idioma: "pt",
        peso: "",
        validade: "",
        conservacao: "",
        embalagem: "",
        rendimento: "",
        tipo_produto: "",
        calorias: "",
        proteina: "",
        carboidrato: "",
        gordura: "",
        fibra: "",
        sodio: "",
        contem: "",
        pode_conter: "",

        // ✅ reset padrão
        ativo: 1,
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto.");
    }

    setLoading(false);
  };

  /* ==========================
     EDITAR PRODUTO
  ========================== */
  const handleEdit = (produto) => {
    setForm({
      id: produto.id,
      nome: produto.nome || "",
      descricao: produto.descricao || "",
      categoria_id: produto.categoria_id || "",
      ingredientes: produto.ingredientes || "",
      modo_preparo: produto.modo_preparo || "",
      montagem_produto: produto.montagem_produto || "",
      modo_servir: produto.modo_servir || "",
      preco: produto.preco || "",
      imagem: null,
      idioma: "pt",

      peso: produto.peso || "",
      validade: produto.validade || "",
      conservacao: produto.conservacao || "",
      embalagem: produto.embalagem || "",
      rendimento: produto.rendimento || "",
      tipo_produto: produto.tipo_produto || "",

      calorias: produto.calorias || "",
      proteina: produto.proteina || "",
      carboidrato: produto.carboidrato || "",
      gordura: produto.gordura || "",
      fibra: produto.fibra || "",
      sodio: produto.sodio || "",

      contem: produto.contem || "",
      pode_conter: produto.pode_conter || "",

      // ✅ NOVO
      ativo: Number(produto.ativo ?? 1),
    });

    setPreviewImagem(
      produto.imagem ? `https://congolinaria.com.br/${produto.imagem}` : null
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ==========================
     EXCLUIR PRODUTO
  ========================== */
  const handleDelete = (id) => {
    if (!window.confirm("Excluir produto?")) return;

    axios
      .delete("https://congolinaria.com.br/api/hortifruti.php", { data: { id } })
      .then(() => {
        carregarprodutos();
        alert("Produto excluído!");
      })
      .catch((err) => console.error(err));
  };

  /* ==========================
     VARIAÇÕES
  ========================== */
  const abrirVariacoes = async (produto) => {
    setProdutoSelecionado(produto);
    await carregarVariacoes(produto.id);
    setFormVar({
      id: null,
      id_produto: produto.id,
      variacao: "",
      preco_adicional: 0,
    });
    setShowVariacoesModal(true);
  };

  const salvarVariacao = async () => {
    if (!formVar.variacao.trim()) return alert("Nome da variação obrigatório");

    const fd = new FormData();
    Object.entries(formVar).forEach(([k, v]) => fd.append(k, v));

    await axios.post("https://congolinaria.com.br/api/variacoes_cop30.php", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await carregarVariacoes(formVar.id_produto);
    setFormVar({
      id: null,
      id_produto: produtoSelecionado.id,
      variacao: "",
      preco_adicional: 0,
    });
  };

  const excluirVariacao = async (id) => {
    if (!window.confirm("Excluir variação?")) return;

    await axios.delete("https://congolinaria.com.br/api/variacoes_cop30.php", {
      data: { id },
    });

    await carregarVariacoes(produtoSelecionado.id);
  };

  /* ==========================
     RENDER
  ========================== */
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">
          Administração Hortifruti Congolinaria
        </h1>

        {/* FORM PRINCIPAL */}
        <input
          type="text"
          placeholder="Nome do Produto"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        />

        <textarea
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          className="w-full border p-2 mb-2 rounded"
        />

        <select
          value={form.categoria_id}
          onChange={(e) =>
            setForm({ ...form, categoria_id: Number(e.target.value) })
          }
          className="w-full border p-2 mb-2 rounded"
        >
          <option value="">Selecione a categoria</option>
          {Array.isArray(categorias) &&
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome_pt ?? cat.nome ?? `Categoria ${cat.id}`}
              </option>
            ))}
        </select>

        {/* ✅ NOVO: Status no formulário (opcional, mantém consistência ao cadastrar/editar) */}
        <div className="flex items-center gap-3 mb-2">
          <label className="font-semibold">Status:</label>
          <select
            value={form.ativo}
            onChange={(e) => setForm({ ...form, ativo: Number(e.target.value) })}
            className="border p-2 rounded"
          >
            <option value={1}>🟢 Em estoque (Ativo)</option>
            <option value={0}>🔴 Sem estoque (Inativo)</option>
          </select>
        </div>

        {/* CAMPOS TÉCNICOS */}
        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Ingredientes"
          value={form.ingredientes}
          onChange={(e) => setForm({ ...form, ingredientes: e.target.value })}
        />

        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Modo de preparo"
          value={form.modo_preparo}
          onChange={(e) => setForm({ ...form, modo_preparo: e.target.value })}
        />

        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Montagem"
          value={form.montagem_produto}
          onChange={(e) =>
            setForm({ ...form, montagem_produto: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Modo de servir"
          value={form.modo_servir}
          onChange={(e) => setForm({ ...form, modo_servir: e.target.value })}
        />

        {/* CAMPOS SECUNDÁRIOS */}
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Peso"
          value={form.peso}
          onChange={(e) => setForm({ ...form, peso: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Validade"
          value={form.validade}
          onChange={(e) => setForm({ ...form, validade: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Conservação"
          value={form.conservacao}
          onChange={(e) => setForm({ ...form, conservacao: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Embalagem"
          value={form.embalagem}
          onChange={(e) => setForm({ ...form, embalagem: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Rendimento"
          value={form.rendimento}
          onChange={(e) => setForm({ ...form, rendimento: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Tipo do produto"
          value={form.tipo_produto}
          onChange={(e) => setForm({ ...form, tipo_produto: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-3 mb-2">
          <input
            className="border p-2 rounded"
            placeholder="Calorias"
            value={form.calorias}
            onChange={(e) => setForm({ ...form, calorias: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Proteína"
            value={form.proteina}
            onChange={(e) => setForm({ ...form, proteina: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Carboidrato"
            value={form.carboidrato}
            onChange={(e) =>
              setForm({ ...form, carboidrato: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Gordura"
            value={form.gordura}
            onChange={(e) => setForm({ ...form, gordura: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Fibra"
            value={form.fibra}
            onChange={(e) => setForm({ ...form, fibra: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Sódio"
            value={form.sodio}
            onChange={(e) => setForm({ ...form, sodio: e.target.value })}
          />
        </div>

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Contém"
          value={form.contem}
          onChange={(e) => setForm({ ...form, contem: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Pode conter"
          value={form.pode_conter}
          onChange={(e) => setForm({ ...form, pode_conter: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Preço"
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setForm({ ...form, imagem: file || null });

            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setPreviewImagem(reader.result);
              reader.readAsDataURL(file);
            } else {
              setPreviewImagem(null);
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
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-blue-700"
          }`}
        >
          {form.id ? "Atualizar produto" : "Cadastrar produto"}
        </button>

        {/* LISTAGEM + FILTRO */}
        <div className="flex items-center justify-between mt-6 mb-2 gap-3 flex-wrap">
          <h2 className="text-xl font-bold">Produtos cadastrados</h2>

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="border p-2 rounded min-w-[220px]"
          >
            <option value="todas">Todas as categorias</option>
            {Array.isArray(categorias) &&
              categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome_pt ?? cat.nome ?? `Categoria ${cat.id}`}
                </option>
              ))}
          </select>
        </div>

        <div className="grid gap-4">
          {Array.isArray(produtosFiltrados) &&
            produtosFiltrados.map((produto) => (
              <div key={produto.id} className="border p-4 rounded shadow">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg">{produto.nome}</h3>
                    <p className="text-sm">
                      <b>Status:</b>{" "}
                      {Number(produto.ativo) === 1 ? (
                        <span className="text-green-700 font-semibold">
                          🟢 Em estoque
                        </span>
                      ) : (
                        <span className="text-red-700 font-semibold">
                          🔴 Sem estoque
                        </span>
                      )}
                    </p>
                  </div>

                  {/* ✅ BOTÃO RÁPIDO NO CARD */}
                  <button
                    onClick={() => toggleAtivo(produto)}
                    className={`px-3 py-1 rounded text-white whitespace-nowrap ${
                      Number(produto.ativo) === 1 ? "bg-gray-800" : "bg-blue-700"
                    }`}
                    title="Ativar/Desativar sem editar o produto"
                  >
                    {Number(produto.ativo) === 1
                      ? "Desativar"
                      : "Ativar"}
                  </button>
                </div>

                <p className="mt-2">{produto.descricao}</p>

                {produto.imagem && (
                  <img
                    src={`https://congolinaria.com.br/${produto.imagem}`}
                    className="w-full max-h-60 object-cover my-2 rounded"
                    alt={produto.nome}
                  />
                )}

                <p>
                  <b>Preço:</b> R$ {parseFloat(produto.preco).toFixed(2)}
                </p>
                <p>
                  <b>Categoria:</b> {produto.nome_categoria}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEdit(produto)}
                  >
                    Editar
                  </button>

                  <button
                    className="px-3 py-1 bg-red-700 text-white rounded"
                    onClick={() => handleDelete(produto.id)}
                  >
                    Excluir
                  </button>

                  <button
                    className="px-3 py-1 bg-green-700 text-white rounded"
                    onClick={() => abrirVariacoes(produto)}
                  >
                    Variações
                  </button>

                  {/* ✅ alternativa: texto mais explícito */}
                  <button
                    className={`px-3 py-1 rounded text-white ${
                      Number(produto.ativo) === 1 ? "bg-gray-800" : "bg-blue-700"
                    }`}
                    onClick={() => toggleAtivo(produto)}
                  >
                    {Number(produto.ativo) === 1
                      ? "Sem estoque (desativar)"
                      : "Em estoque (ativar)"}
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

                {Array.isArray(variacoes) &&
                  variacoes.map((v) => (
                    <div
                      key={v.id}
                      className="flex justify-between border p-2 rounded mb-2"
                    >
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
