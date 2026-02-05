import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editarQuantidadeRedux,
  deletarItemRedux,
  selectCarrinhoPorCanal,
} from "../../redux/cartReducer";

export default function SacolaHortifruti() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ lê carrinho do canal hortifruti
  const carrinhoRedux = useSelector((state) => selectCarrinhoPorCanal(state, "hortifruti"));

  // ✅ CEP (apenas valida SP capital pra liberar checkout)
  const [cep, setCep] = useState("");
  const [cepConfirmado, setCepConfirmado] = useState(false);
  const [calculando, setCalculando] = useState(false);
  const [mensagemCep, setMensagemCep] = useState("");

  const getImagemUrl = (img) => {
    const s = (img || "").toString().trim();
    if (!s) return "";
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    return `https://congolinaria.com.br/${s.replace(/^\//, "")}`;
  };

  const subtotal = useMemo(() => {
    return carrinhoRedux.reduce(
      (acc, item) => acc + Number(item.preco || 0) * Number(item.quantity || 1),
      0
    );
  }, [carrinhoRedux]);

  const frete = 0;
  const total = subtotal + frete;

  const isCepSaoPaulo = (cepValue) => {
    const c = (cepValue || "").replace(/\D/g, "");
    if (c.length !== 8) return false;
    return (
      c.startsWith("01") ||
      c.startsWith("02") ||
      c.startsWith("03") ||
      c.startsWith("04") ||
      c.startsWith("05") ||
      c.startsWith("06") ||
      c.startsWith("08") ||
      c.startsWith("09")
    );
  };

  const confirmarCep = async () => {
    const cepLimpo = (cep || "").replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      setMensagemCep("Digite um CEP válido.");
      setCepConfirmado(false);
      return;
    }

    if (!isCepSaoPaulo(cepLimpo)) {
      setMensagemCep("⚠ Entregamos somente dentro de São Paulo (Capital).");
      setCepConfirmado(false);
      return;
    }

    setCalculando(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data?.erro) {
        setMensagemCep("CEP não encontrado.");
        setCepConfirmado(false);
        return;
      }

      setMensagemCep("✅ CEP confirmado — entrega no apartamento (sem frete).");
      setCepConfirmado(true);

      localStorage.setItem(
        "checkoutHortifruti_endereco",
        JSON.stringify({
          cep: (cep || "").trim(),
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: (data.uf || "").toUpperCase(),
        })
      );
    } catch (err) {
      console.error(err);
      setMensagemCep("Erro ao validar CEP.");
      setCepConfirmado(false);
    } finally {
      setCalculando(false);
    }
  };

  const irParaCheckout = () => {
    if (!cepConfirmado) {
      alert("Confirme o CEP (São Paulo – Capital) para continuar.");
      return;
    }
    navigate("/checkout-hortifruti");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 grid md:grid-cols-3 gap-8">
      {/* 🛍️ Lista de produtos */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">
          🛍️ Sua Sacola (Hortifruti)
        </h1>

        {carrinhoRedux.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Sua sacola está vazia.</p>
            <button
              onClick={() => navigate("/hortifruti")}
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Ver Hortifruti
            </button>
          </div>
        ) : (
          <>
            {carrinhoRedux.map((item) => (
              <div
                key={item.id_produto}
                className="flex gap-4 border-b py-3 items-center"
              >
                <img
                  src={getImagemUrl(item.imagem)}
                  alt={item.nome}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.nome}</h3>
                  <p className="text-sm text-gray-500">
                    R$ {Number(item.preco || 0).toFixed(2)} cada
                  </p>

                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          editarQuantidadeRedux(
                            {
                              id_produto: item.id_produto,
                              value: Math.max(1, Number(item.quantity || 1) - 1),
                            },
                            "hortifruti"
                          )
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      value={Number(item.quantity || 1)}
                      min="1"
                      onChange={(e) =>
                        dispatch(
                          editarQuantidadeRedux(
                            {
                              id_produto: item.id_produto,
                              value: Math.max(1, Number(e.target.value) || 1),
                            },
                            "hortifruti"
                          )
                        )
                      }
                      className="w-12 text-center border rounded"
                    />

                    <button
                      onClick={() =>
                        dispatch(
                          editarQuantidadeRedux(
                            {
                              id_produto: item.id_produto,
                              value: Number(item.quantity || 1) + 1,
                            },
                            "hortifruti"
                          )
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() =>
                        dispatch(deletarItemRedux(item.id_produto, "hortifruti"))
                      }
                      className="ml-4 text-red-500 hover:text-red-700 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </div>

                <p className="font-bold text-green-700 w-24 text-right">
                  R$ {(Number(item.preco || 0) * Number(item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* 📦 Resumo + CEP */}
      {carrinhoRedux.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-5 h-fit sticky top-8">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Resumo da Compra
          </h2>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Frete</span>
            <span className="font-semibold text-green-700">Grátis ✅</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold text-green-700">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          {/* ✅ Confirmar CEP */}
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">
              Confirmar CEP (São Paulo – Capital)
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength="9"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => {
                  let valor = (e.target.value || "").replace(/\D/g, "");
                  if (valor.length > 8) valor = valor.slice(0, 8);
                  if (valor.length > 5)
                    valor = valor.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
                  setCep(valor);
                  setCepConfirmado(false);
                  setMensagemCep("");
                }}
                className={`border p-2 rounded w-full text-center tracking-widest outline-none ${
                  cepConfirmado ? "border-green-600" : "focus:border-green-600"
                }`}
              />

              <button
                onClick={confirmarCep}
                disabled={calculando}
                className="bg-green-600 text-white px-3 rounded hover:bg-green-700 disabled:opacity-60"
              >
                {calculando ? "..." : "OK"}
              </button>
            </div>

            {mensagemCep && (
              <p
                className={`text-sm mt-2 ${
                  cepConfirmado ? "text-green-700" : "text-gray-700"
                }`}
              >
                {mensagemCep}
              </p>
            )}
          </div>

          <button
            onClick={irParaCheckout}
            className="w-full bg-green-700 text-white mt-5 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Finalizar Compra
          </button>

          <button
            onClick={() => navigate("/hortifruti")}
            className="w-full mt-3 text-green-700 hover:underline"
          >
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
}
