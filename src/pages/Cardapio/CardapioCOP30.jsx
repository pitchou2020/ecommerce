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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carrinho = useSelector((state) => state.cart.cartItems || []);

  useEffect(() => {
    axios
      .get("https://congolinaria.com.br/api/cardapio_cop30.php")
      .then((res) => setPratos(res.data))
      .catch((err) => console.error(err));
  }, []);

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

  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-4">Cardápio RDC – COP30</h1>

      {/* LISTA DE PRATOS */}
      <div className="space-y-4">
        {pratos.map((prato) => (
          <div
            key={prato.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-white"
          >
            <h2 className="text-lg font-semibold">{prato.nome}</h2>
            <p className="text-sm text-gray-600 mb-2">{prato.descricao}</p>

            <div className="flex items-center justify-between mb-3">
              {prato.preco_promocional &&
              prato.preco_promocional < prato.preco ? (
                <div>
                  <span className="text-gray-400 line-through text-sm mr-2">
                    R$ {parseFloat(prato.preco).toFixed(2)}
                  </span>
                  <span className="text-green-700 font-bold text-lg">
                    R$ {parseFloat(prato.preco_promocional).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-gray-800">
                  R$ {parseFloat(prato.preco).toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={() => navigate(`/prato/${prato.id}`)}
              className="mt-2 w-full bg-gray-100 text-green-700 font-medium py-2 rounded-lg hover:bg-gray-200"
            >
              Ver Detalhes
            </button>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="number"
                min="1"
                value={quantidades[prato.id] || 1}
                onChange={(e) =>
                  alterarQuantidade(prato.id, Number(e.target.value))
                }
                className="w-16 border rounded p-1 text-center"
              />
              <button
                onClick={() => handleAdicionar(prato)}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                + Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÃO FLUTUANTE */}
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
                    onClick={() => navigate("/checkout")}
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
