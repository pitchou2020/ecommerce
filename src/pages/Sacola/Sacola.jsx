import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editarQuantidadeRedux,
  deletarItemRedux,
} from "../../redux/cartReducer";

export default function Sacola() {
  const carrinho = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [mensagemFreteGratis, setMensagemFreteGratis] = useState("");

  const VALOR_FRETE_GRATIS = 200;

  // 🧮 Calcula subtotal
  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantity,
    0
  );

  // 🚀 Atualiza mensagem de “quanto falta para frete grátis”
  useEffect(() => {
    if (subtotal === 0) setMensagemFreteGratis("");
    else if (subtotal >= VALOR_FRETE_GRATIS)
      setMensagemFreteGratis("🎉 Parabéns! Você ganhou FRETE GRÁTIS!");
    else {
      const faltante = (VALOR_FRETE_GRATIS - subtotal).toFixed(2);
      setMensagemFreteGratis(
        `🚀 Falta apenas R$ ${faltante} para ganhar FRETE GRÁTIS!`
      );
    }
  }, [subtotal]);

  const total = subtotal + (frete?.valor || 0);

  // 🚚 Calcular frete pelo CEP
  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido.");
      return;
    }

    setCalculando(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        setCalculando(false);
        return;
      }

      let valor = 0;
      if (subtotal >= VALOR_FRETE_GRATIS) valor = 0; // frete grátis
      else if (data.localidade === "São Paulo") valor = 8.9;
      else if (data.uf === "SP") valor = 14.9;
      else valor = 24.9;

      setFrete({
        cidade: data.localidade,
        uf: data.uf,
        valor,
      });
    } catch (err) {
      alert("Erro ao calcular frete.");
      console.error(err);
    } finally {
      setCalculando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 grid md:grid-cols-3 gap-8">
      {/* 🎉 Mensagem de frete grátis */}
      {mensagemFreteGratis && (
        <div
          className={`md:col-span-3 text-center p-3 rounded-lg mb-4 font-semibold ${
            subtotal >= VALOR_FRETE_GRATIS
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
          }`}
        >
          {mensagemFreteGratis}
        </div>
      )}

      {/* 🛍️ Lista de produtos */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">🛍️ Sua Sacola</h1>

        {carrinho.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Sua sacola está vazia.</p>
            <button
              onClick={() => navigate("/cardapio-congelados")}
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Ver Cardápio
            </button>
          </div>
        ) : (
          <>
            {carrinho.map((item) => (
              <div
                key={item.id_produto}
                className="flex gap-4 border-b py-3 items-center"
              >
                <img
                  src={`https://congolinaria.com.br/${item.imagem}`}
                  alt={item.nome}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.nome}</h3>
                  <p className="text-sm text-gray-500">
                    R$ {item.preco.toFixed(2)} cada
                  </p>

                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          editarQuantidadeRedux({
                            id_produto: item.id_produto,
                            value: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        dispatch(
                          editarQuantidadeRedux({
                            id_produto: item.id_produto,
                            value: Number(e.target.value),
                          })
                        )
                      }
                      className="w-12 text-center border rounded"
                    />
                    <button
                      onClick={() =>
                        dispatch(
                          editarQuantidadeRedux({
                            id_produto: item.id_produto,
                            value: item.quantity + 1,
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dispatch(deletarItemRedux(item.id_produto))
                      }
                      className="ml-4 text-red-500 hover:text-red-700 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                <p className="font-bold text-green-700 w-24 text-right">
                  R$ {(item.preco * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* 📦 Resumo + Frete */}
      {carrinho.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-5 h-fit sticky top-8">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Resumo da Compra
          </h2>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>

          {/* Calcular frete */}
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">
              Calcular frete
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength="9"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => {
                  let valor = e.target.value.replace(/\D/g, "");
                  if (valor.length > 5)
                    valor = valor.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
                  setCep(valor);
                }}
                className="border p-2 rounded w-full text-center tracking-widest focus:border-green-600 outline-none"
              />
              <button
                onClick={calcularFrete}
                disabled={calculando}
                className="bg-green-600 text-white px-3 rounded hover:bg-green-700 disabled:opacity-60"
              >
                {calculando ? "..." : "OK"}
              </button>
            </div>

            {frete && (
              <p className="text-sm text-gray-700 mt-2">
                {frete.valor === 0 ? (
                  <span className="text-green-700 font-semibold">
                    Frete grátis 🎉
                  </span>
                ) : (
                  <>
                    Frete para {frete.cidade}/{frete.uf}:{" "}
                    <span className="font-semibold text-green-700">
                      R$ {frete.valor.toFixed(2)}
                    </span>
                  </>
                )}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-4 text-gray-700">
            <span>Frete</span>
            <span>
              {frete
                ? frete.valor === 0
                  ? "Grátis"
                  : `R$ ${frete.valor.toFixed(2)}`
                : "—"}
            </span>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between text-lg font-bold text-green-700">
            <span>Total</span>
            <span>
              R$ {frete ? total.toFixed(2) : subtotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-green-700 text-white mt-5 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Finalizar Compra
          </button>

          <button
            onClick={() => navigate("/cardapio-congelados")}
            className="w-full mt-3 text-green-700 hover:underline"
          >
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
}
