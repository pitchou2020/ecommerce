import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarAoCarrinhoRedux,
  editarQuantidadeRedux,
  deletarItemRedux,
} from "../../redux/cartReducer";

export default function CardapioCOP30() {
  const [pratos, setPratos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [busca, setBusca] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("nome");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carrinho = useSelector((state) => state.cart.cartItems || []);

  // Carrega o cardápio
  useEffect(() => {
    axios
      .get("https://congolinaria.com.br/api/cardapio_cop30.php")
      .then((res) => setPratos(res.data))
      .catch(console.error);
  }, []);

  // Controle de quantidade
  const alterarQuantidade = (id, valor) => {
    if (valor < 1) valor = 1;
    setQuantidades((prev) => ({ ...prev, [id]: valor }));
  };

  const handleAdicionar = (prato) => {
    dispatch(
      adicionarAoCarrinhoRedux({
        id_produto: prato.id,
        nome: prato.nome,
        preco: parseFloat(prato.preco_promocional || prato.preco),
        imagem: prato.imagem,
        quantity: Number(quantidades[prato.id] || 1),
      })
    );
  };

  const handleAlterarQuantidade = (id_produto, value) => {
    dispatch(editarQuantidadeRedux({ id_produto, value }));
  };

  const handleRemover = (id_produto) => {
    dispatch(deletarItemRedux(id_produto));
  };

  const calcularTotal = () =>
    carrinho.reduce((acc, item) => acc + item.preco * item.quantity, 0);

  // Busca e filtros
  const filtrarPratos = () => {
    let filtrados = [...pratos];

    // Busca textual
    if (busca.trim() !== "") {
      const termo = busca.toLowerCase();
      filtrados = filtrados.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          (p.descricao && p.descricao.toLowerCase().includes(termo))
      );
    }

    // Filtro por aba
    if (categoriaSelecionada === "promo") {
      filtrados = filtrados.filter(
        (p) => p.preco_promocional && p.preco_promocional < p.preco
      );
    } else if (categoriaSelecionada === "populares") {
      filtrados = filtrados.filter((p) => p.destaque === "sim" || p.popular === "1");
    } else if (categoriaSelecionada === "novos") {
      filtrados = filtrados.slice(-6); // últimos 6 adicionados
    }

    // Ordenação
    if (ordenarPor === "precoAsc") {
      filtrados.sort((a, b) => a.preco - b.preco);
    } else if (ordenarPor === "precoDesc") {
      filtrados.sort((a, b) => b.preco - a.preco);
    } else if (ordenarPor === "nome") {
      filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return filtrados;
  };

  const pratosFiltrados = filtrarPratos();

  // Etiquetas
  const getBadge = (p) => {
    if (p.preco_promocional && p.preco_promocional < p.preco)
      return { texto: "Promoção", cor: "bg-red-100 text-red-700" };
    if (p.destaque === "sim" || p.popular === "1")
      return { texto: "Mais pedido", cor: "bg-yellow-100 text-yellow-700" };
    return { texto: "Plant-Based", cor: "bg-green-100 text-green-700" };
  };

  return (
    <div className="p-4 max-w-7xl mx-auto pb-24">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        🌿 Cardápio Congelados – Congolinaria
      </h1>

      {/* BUSCA + ORDENAÇÃO */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <input
          type="text"
          placeholder="🔍 Buscar prato ou ingrediente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full sm:w-1/2 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
        />
        <select
          value={ordenarPor}
          onChange={(e) => setOrdenarPor(e.target.value)}
          className="border p-2 rounded-lg text-sm"
        >
          <option value="nome">Ordenar por Nome</option>
          <option value="precoAsc">Preço: Menor → Maior</option>
          <option value="precoDesc">Preço: Maior → Menor</option>
        </select>
      </div>

      {/* ABAS DE FILTRO */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {[
          { id: "todos", label: "🍲 Todos" },
          { id: "populares", label: "🔥 Mais Pedidos" },
          { id: "promo", label: "💸 Promoções" },
          { id: "novos", label: "🆕 Novos" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoriaSelecionada(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              categoriaSelecionada === tab.id
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* GRADE DE PRATOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pratosFiltrados.map((prato) => {
          const badge = getBadge(prato);
          return (
            <div
              key={prato.id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-4 flex flex-col justify-between"
            >
              <div className="relative">
                <div
                  className="w-full h-48 rounded-lg overflow-hidden mb-3 cursor-pointer"
                  onClick={() => navigate(`/prato/${prato.id}`)}
                >
                  <img
                    src={prato.imagem}
                    alt={prato.nome}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span
                  className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${badge.cor}`}
                >
                  {badge.texto}
                </span>
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {prato.nome}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {prato.descricao ||
                    "Receita artesanal da culinária congolesa AfroVeg."}
                </p>
              </div>

              <div className="mt-3 mb-2">
                {prato.preco_promocional &&
                prato.preco_promocional < prato.preco ? (
                  <>
                    <span className="text-gray-400 line-through text-sm mr-2">
                      R$ {parseFloat(prato.preco).toFixed(2)}
                    </span>
                    <span className="text-green-700 font-bold text-lg">
                      R$ {parseFloat(prato.preco_promocional).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-green-700">
                    R$ {parseFloat(prato.preco).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  min="1"
                  value={quantidades[prato.id] || 1}
                  onChange={(e) =>
                    alterarQuantidade(prato.id, Number(e.target.value))
                  }
                  className="w-16 border rounded p-1 text-center text-sm"
                />
                <button
                  onClick={() => handleAdicionar(prato)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  + Adicionar
                </button>
              </div>

              <button
                onClick={() => navigate(`/prato/${prato.id}`)}
                className="mt-3 w-full bg-gray-100 text-green-700 font-medium py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Ver Detalhes
              </button>
            </div>
          );
        })}
      </div>

      {/* BOTÃO FLUTUANTE DO CARRINHO */}
      {carrinho.length > 0 && (
        <div
          className="fixed bottom-4 right-4 bg-green-700 text-white rounded-full shadow-lg px-5 py-3 flex items-center gap-3 cursor-pointer hover:bg-green-800 transition"
          onClick={() => setMostrarModal(true)}
        >
          🛒 {carrinho.reduce((acc, item) => acc + item.quantity, 0)} itens
          <span className="font-semibold ml-2">
            R$ {calcularTotal().toFixed(2)}
          </span>
        </div>
      )}

      {/* MODAL DO CARRINHO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-2xl relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">
              🛍️ Seu Carrinho
            </h2>

            {carrinho.length === 0 ? (
              <p className="text-center text-gray-500">Carrinho vazio.</p>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto mb-4 border-t border-b divide-y">
                  {carrinho.map((item) => {
                    const subtotal = item.preco * item.quantity;
                    return (
                      <div
                        key={item.id_produto}
                        className="py-2 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <p className="font-medium text-gray-800">
                            {item.nome}
                          </p>
                          <p className="text-sm text-gray-500">
                            R$ {item.preco.toFixed(2)} cada
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleAlterarQuantidade(
                                item.id_produto,
                                item.quantity - 1
                              )
                            }
                            className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleAlterarQuantidade(
                                item.id_produto,
                                Number(e.target.value)
                              )
                            }
                            className="w-12 border rounded text-center"
                          />
                          <button
                            onClick={() =>
                              handleAlterarQuantidade(
                                item.id_produto,
                                item.quantity + 1
                              )
                            }
                            className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>

                          <p className="font-semibold text-green-700 w-20 text-right">
                            R$ {subtotal.toFixed(2)}
                          </p>

                          <button
                            onClick={() => handleRemover(item.id_produto)}
                            className="text-red-500 hover:text-red-700 text-lg font-bold"
                            title="Remover item"
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-right mb-4">
                  <p className="text-gray-700">
                    Total:{" "}
                    <span className="font-bold text-green-700">
                      R$ {calcularTotal().toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="flex-1 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Continuar comprando
                  </button>
                  <button
                    onClick={() => navigate("/sacola")}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Finalizar compra
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
