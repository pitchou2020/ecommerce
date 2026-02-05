import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adicionarAoCarrinhoRedux, selectCarrinhoPorCanal } from "../../redux/cartReducer";

export default function Hortifruti() {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [busca, setBusca] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("nome");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ carrinho do canal hortifruti
  const carrinho = useSelector((state) => selectCarrinhoPorCanal(state, "hortifruti"));

  // ✅ Lê categoria pela URL: /hortifruti?cat=3
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("cat");
  const categoriaUrlId = catParam ? Number(catParam) : null;

  /* =========================
     HELPERS
     ========================= */
  const normalizarChave = (str) => {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  };

  const mesclarProdutoDuplicado = (antigo, novo) => {
    const antigoTemPromo =
      antigo.preco_promocional !== null && antigo.preco_promocional < antigo.preco;
    const novoTemPromo =
      novo.preco_promocional !== null && novo.preco_promocional < novo.preco;

    const escolhidoBase = novoTemPromo && !antigoTemPromo ? novo : antigo;

    return {
      ...escolhidoBase,
      imagem:
        escolhidoBase.imagem ||
        (escolhidoBase === antigo ? novo.imagem : antigo.imagem) ||
        "",
      descricao:
        (escolhidoBase.descricao || "").length >=
        ((escolhidoBase === antigo ? novo.descricao : antigo.descricao) || "")
          .length
          ? escolhidoBase.descricao
          : (escolhidoBase === antigo ? novo.descricao : antigo.descricao) || "",
      preco_promocional:
        escolhidoBase.preco_promocional !== null &&
        escolhidoBase.preco_promocional !== undefined
          ? escolhidoBase.preco_promocional
          : escolhidoBase === antigo
          ? novo.preco_promocional
          : antigo.preco_promocional,
      destaque:
        escolhidoBase.destaque === "sim" ||
        (escolhidoBase === antigo ? novo.destaque : antigo.destaque) === "sim"
          ? "sim"
          : escolhidoBase.destaque || "",
      popular:
        escolhidoBase.popular === "1" ||
        (escolhidoBase === antigo ? novo.popular : antigo.popular) === "1"
          ? "1"
          : escolhidoBase.popular || "",
      ativo: Number(escolhidoBase.ativo ?? 1),
    };
  };

  // ✅ Ajusta URL de imagem caso venha relativa (img_upload/...)
  const imgUrl = (path) => {
    if (!path) return "";
    const s = String(path).trim();
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    return `https://congolinaria.com.br/${s.replace(/^\/+/, "")}`;
  };

  /* =========================
     CARREGAMENTO (✅ SOMENTE ATIVOS)
     ========================= */
  useEffect(() => {
    axios
      .get("https://congolinaria.com.br/api/hortifruti.php?somente_ativos=1")
      .then((res) => {
        const normalizados = Array.isArray(res.data)
          ? res.data.map((p) => ({
              ...p,
              // ✅ ID: tenta os dois padrões
              id_produto: p?.id_produto ?? p?.id ?? null,

              nome: p?.nome ?? "",
              descricao: p?.descricao ?? "",
              preco: Number(p?.preco) || 0,
              preco_promocional:
                p?.preco_promocional !== null &&
                p?.preco_promocional !== undefined
                  ? Number(p.preco_promocional)
                  : null,
              imagem: p?.imagem ?? "",
              categoria_id: p?.categoria_id ?? p?.categoriaId ?? p?.categoria ?? null,
              ativo: Number(p?.ativo ?? 1),
              destaque: p?.destaque ?? "",
              popular: p?.popular ?? "",
            }))
          : [];

        const apenasAtivos = normalizados.filter((p) => Number(p.ativo) === 1);

        const mapa = new Map();
        for (const p of apenasAtivos) {
          const chave = normalizarChave(p.nome);
          if (!chave) continue;

          if (!mapa.has(chave)) mapa.set(chave, p);
          else mapa.set(chave, mesclarProdutoDuplicado(mapa.get(chave), p));
        }

        setProdutos(Array.from(mapa.values()));
      })
      .catch(console.error);
  }, []);

  /* =========================
     CONTROLE DE QUANTIDADE
     ========================= */
  const alterarQuantidade = (id_produto, valor) => {
    const quantidade = Math.max(1, Number(valor) || 1);
    setQuantidades((prev) => ({ ...prev, [id_produto]: quantidade }));
  };

  const handleAdicionar = (produto) => {
    const idProduto = produto.id_produto ?? produto.id;
    if (!idProduto) return;

    const precoFinal =
      produto.preco_promocional !== null && produto.preco_promocional < produto.preco
        ? Number(produto.preco_promocional)
        : Number(produto.preco);

    dispatch(
      adicionarAoCarrinhoRedux(
        {
          id_produto: Number(idProduto),
          nome: produto.nome,
          preco: Number(precoFinal) || 0,
          imagem: produto.imagem,
          quantity: quantidades[idProduto] || 1,
        },
        "hortifruti"
      )
    );
  };

  /* =========================
     FILTROS + ORDENAÇÃO
     ========================= */
  const produtosFiltrados = useMemo(() => {
    let filtrados = [...produtos];

    filtrados = filtrados.filter((p) => Number(p.ativo ?? 1) === 1);

    if (categoriaUrlId && !Number.isNaN(categoriaUrlId)) {
      filtrados = filtrados.filter(
        (p) => Number(p.categoria_id) === Number(categoriaUrlId)
      );
    }

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      filtrados = filtrados.filter(
        (p) =>
          (p.nome || "").toLowerCase().includes(termo) ||
          (p.descricao || "").toLowerCase().includes(termo)
      );
    }

    if (categoriaSelecionada === "promo") {
      filtrados = filtrados.filter(
        (p) => p.preco_promocional !== null && p.preco_promocional < p.preco
      );
    }

    if (categoriaSelecionada === "populares") {
      filtrados = filtrados.filter((p) => p.destaque === "sim" || p.popular === "1");
    }

    if (categoriaSelecionada === "novos") {
      filtrados = filtrados.slice(-6);
    }

    if (ordenarPor === "precoAsc") filtrados.sort((a, b) => a.preco - b.preco);
    if (ordenarPor === "precoDesc") filtrados.sort((a, b) => b.preco - a.preco);
    if (ordenarPor === "nome")
      filtrados.sort((a, b) => (a.nome || "").localeCompare(b.nome || "", "pt-BR"));

    return filtrados;
  }, [produtos, busca, categoriaSelecionada, ordenarPor, categoriaUrlId]);

  /* =========================
     ETIQUETAS
     ========================= */
  const getBadge = (p) => {
    if (p.preco_promocional !== null && p.preco_promocional < p.preco) {
      return { texto: "Promoção", cor: "bg-red-100 text-red-700" };
    }
    if (p.destaque === "sim" || p.popular === "1") {
      return { texto: "Mais pedido", cor: "bg-yellow-100 text-yellow-700" };
    }
    return { texto: "Plant-Based", cor: "bg-green-100 text-green-700" };
  };

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + (Number(item.preco) || 0) * (Number(item.quantity) || 1),
    0
  );

  return (
    <div className="p-4 max-w-7xl mx-auto pb-24">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-3xl font-bold text-green-800">🥬 Hortifruti – Congolinaria</h1>

        <button
          onClick={() => navigate("/sacola-hortifruti")}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          title="Ir para a sacola"
        >
          🛍️ Sacola ({carrinho.length}) • R$ {totalCarrinho.toFixed(2)}
        </button>
      </div>

      {/* BUSCA + ORDENAÇÃO */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar item..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
        <select
          value={ordenarPor}
          onChange={(e) => setOrdenarPor(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="nome">Ordenar por Nome</option>
          <option value="precoAsc">Preço: Menor → Maior</option>
          <option value="precoDesc">Preço: Maior → Menor</option>
        </select>
      </div>

      {/* ABAS */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {[
          { id: "todos", label: "🧺 Todos" },
          { id: "populares", label: "🔥 Mais Pedidos" },
          { id: "promo", label: "💸 Promoções" },
          { id: "novos", label: "🆕 Novos" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoriaSelecionada(tab.id)}
            className={`px-4 py-2 rounded-full ${
              categoriaSelecionada === tab.id ? "bg-green-700 text-white" : "bg-white border"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {categoriaUrlId && (
          <button
            onClick={() => setSearchParams({})}
            className="px-4 py-2 rounded-full bg-white border hover:bg-gray-50"
            title="Voltar para todas as categorias"
          >
            ✖ Limpar categoria
          </button>
        )}
      </div>

      {/* GRADE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {produtosFiltrados.map((produto) => {
          const badge = getBadge(produto);
          const precoFinal =
            produto.preco_promocional !== null && produto.preco_promocional < produto.preco
              ? produto.preco_promocional
              : produto.preco;

          const idProduto = produto.id_produto ?? produto.id;

          return (
            <div
              key={idProduto}
              className="bg-white rounded-xl border shadow-sm p-3 flex flex-col"
            >
              <img
                src={imgUrl(produto.imagem)}
                alt={produto.nome}
                className="h-36 w-full object-cover rounded-lg mb-2 cursor-pointer"
                onClick={() => navigate(`/hortifruti/produto/${idProduto}`)}
              />

              <span
                className={`self-start px-2.5 py-1 text-[11px] rounded-full mb-2 ${badge.cor}`}
              >
                {badge.texto}
              </span>

              <h2 className="font-semibold text-sm leading-snug">{produto.nome}</h2>

              <p className="text-xs text-gray-500 flex-1 line-clamp-2">{produto.descricao}</p>

              <p className="text-green-700 font-bold text-base mt-2">
                R$ {Number(precoFinal || 0).toFixed(2)}
              </p>

              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  min="1"
                  value={quantidades[idProduto] || 1}
                  onChange={(e) => alterarQuantidade(idProduto, e.target.value)}
                  className="w-14 border rounded p-1 text-center text-sm"
                />
                <button
                  onClick={() => handleAdicionar(produto)}
                  className="flex-1 bg-green-600 text-white rounded text-sm py-1.5"
                >
                  + Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
