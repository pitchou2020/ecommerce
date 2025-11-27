import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adicionarAoCarrinhoRedux } from "../../redux/cartReducer";
import { FaTruck, FaShoppingBag, FaLeaf } from "react-icons/fa";

export default function DetalhePratoCOP30() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [prato, setPrato] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");

  // VARIAÇÕES
  const [variacoes, setVariacoes] = useState([]);
  const [variacaoEscolhida, setVariacaoEscolhida] = useState(null);
  const [showVarModal, setShowVarModal] = useState(false);

  /* ---------------------------------------------------
     CARREGAR PRATO + RELACIONADOS
  --------------------------------------------------- */
  useEffect(() => {
    axios
      .get("https://congolinaria.com.br/api/cardapio_cop30.php?idioma=pt")
      .then((res) => {
        const dados = res.data;
        const encontrado = dados.find((p) => String(p.id) === id);
        setPrato(encontrado);

        const outros = dados
          .filter((p) => String(p.id) !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setRelacionados(outros);
      })
      .catch(console.error);
  }, [id]);

  /* ---------------------------------------------------
     CARREGAR VARIAÇÕES
  --------------------------------------------------- */
  useEffect(() => {
    if (prato?.id) {
      axios
        .get(
          `https://congolinaria.com.br/api/variacoes_cop30.php?id_produto=${prato.id}`
        )
        .then((res) => setVariacoes(res.data))
        .catch(console.error);
    }
  }, [prato]);

  /* ---------------------------------------------------
     PREÇO FINAL = PREÇO BASE + VARIAÇÃO
  --------------------------------------------------- */
  const precoFinal = () => {
    const base = parseFloat(prato.preco || 0);
    const adicional = variacaoEscolhida
      ? parseFloat(variacaoEscolhida.preco_adicional)
      : 0;
    return (base + adicional).toFixed(2);
  };

  /* ---------------------------------------------------
     ADICIONAR AO CARRINHO
  --------------------------------------------------- */
  const adicionarAoCarrinho = () => {
    dispatch(
      adicionarAoCarrinhoRedux({
        id_produto: prato.id,
        nome:
          prato.nome +
          (variacaoEscolhida ? ` – ${variacaoEscolhida.variacao}` : ""),
        preco: parseFloat(precoFinal()),
        imagem: prato.imagem,
        quantity: quantidade,
        variacao: variacaoEscolhida,
      })
    );

    setMensagem("✅ Adicionado à sacola!");
    setTimeout(() => setMensagem(""), 2000);
  };

  /* ---------------------------------------------------
     CALCULAR FRETE (São Paulo Capital → Rua Caquito 251)
  --------------------------------------------------- */
  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido.");
      setFrete(null);
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (!data || data.erro) {
        setFrete(null);
        alert("CEP não encontrado.");
        return;
      }

      // RESTRIÇÃO: SOMENTE SÃO PAULO CAPITAL
      if (data.localidade !== "São Paulo") {
        setFrete(null);
        alert(
          "Entrega disponível somente para São Paulo Capital. Verifique seu CEP."
        );
        return;
      }

      // FRETE FIXO SP CAPITAL
      const valorFrete = 8.9;

      setFrete({
        cidade: data.localidade,
        uf: data.uf,
        valor: Number(valorFrete),
      });
    } catch (error) {
      console.error("ERRO FRETE:", error);
      setFrete(null);
      alert("Não foi possível calcular o frete.");
    }
  };

  if (!prato) {
    return (
      <p className="text-center mt-10 text-gray-500">Carregando prato...</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      {/* VOLTAR */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-green-700 hover:underline mb-6"
      >
        ← Voltar
      </button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* COLUNA ESQUERDA */}
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {prato.nome}
          </h1>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {prato.descricao}
          </p>

          {/* Ingredientes */}
          {prato.ingredientes && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg text-green-700">
                🌿 Ingredientes
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {prato.ingredientes}
              </p>
            </div>
          )}

          {/* PREÇO */}
          <p className="text-3xl font-bold text-green-800 mb-4">
            R$ {precoFinal()}
          </p>

          {/* BOTÃO VARIAÇÕES */}
          {variacoes.length > 0 && (
            <button
              onClick={() => setShowVarModal(true)}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {variacaoEscolhida
                ? `Variação: ${variacaoEscolhida.variacao}`
                : "Escolher Variação"}
            </button>
          )}

          {/* Quantidade */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              <button
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
              >
                −
              </button>
              <input
                type="number"
                value={quantidade}
                min="1"
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="w-16 text-center border-t border-b border-gray-300"
              />
              <button
                onClick={() => setQuantidade(quantidade + 1)}
                className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                if (variacoes.length > 0 && !variacaoEscolhida) {
                  alert("Escolha uma variação antes de adicionar ao carrinho.");
                  return;
                }
                adicionarAoCarrinho();
              }}
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition flex items-center gap-2"
            >
              <FaShoppingBag /> Adicionar à Sacola
            </button>
          </div>

          {mensagem && (
            <p className="text-green-600 font-semibold mb-4">{mensagem}</p>
          )}

          {/* CALCULAR FRETE */}
          <div className="mt-4 border-t pt-4">
            <h2 className="font-semibold text-lg text-green-700 mb-2 flex items-center gap-2">
              <FaTruck className="text-green-700" /> Calcular Frete
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength="9"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => {
                  let valor = e.target.value.replace(/\D/g, "");

                  if (valor.length === 8 && valor[0] === "0") {
                    valor = "0" + valor.substring(1);
                  }

                  if (valor.length > 5)
                    valor = valor.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");

                  setCep(valor);
                }}
                className="border p-2 rounded w-1/2 tracking-widest focus:border-green-600 outline-none"
              />

              <button
                onClick={calcularFrete}
                className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
              >
                Calcular
              </button>
            </div>

            {frete && (
              <p className="mt-3 text-sm text-gray-700">
                Frete para {frete.cidade}/{frete.uf}:{" "}
                <span className="font-semibold text-green-700">
                  R$ {Number(frete.valor).toFixed(2)}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA = IMAGEM */}
        <div className="flex justify-center items-start">
          <img
            src={`https://congolinaria.com.br/${prato.imagem}`}
            alt={prato.nome}
            className="w-full md:w-[90%] h-auto rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* RELACIONADOS */}
      {relacionados.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <FaLeaf className="text-green-700" /> Produtos Relacionados
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relacionados.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/prato/${p.id}`)}
                className="cursor-pointer border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <img
                  src={`https://congolinaria.com.br/${p.imagem}`}
                  alt={p.nome}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{p.nome}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {p.descricao}
                  </p>
                  <p className="text-green-700 font-bold">
                    R$ {parseFloat(p.preco).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL VARIAÇÕES */}
      {showVarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-green-800">
              Escolha uma Variação
            </h2>

            {variacoes.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setVariacaoEscolhida(v);
                  setShowVarModal(false);
                }}
                className="w-full text-left border p-3 rounded mb-2 hover:bg-green-50"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{v.variacao}</span>
                  <span className="text-green-700 font-bold">
                    + R$ {parseFloat(v.preco_adicional).toFixed(2)}
                  </span>
                </div>
              </button>
            ))}

            <button
              onClick={() => setShowVarModal(false)}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
