import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adicionarAoCarrinhoRedux } from "../../redux/cartReducer";

export default function DetalhePratoCOP30({ atualizarCarrinhoGlobal }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prato, setPrato] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");

  // 🔎 Carrega prato e relacionados
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

  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido.");
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      let valorFrete = 0;
      if (data.localidade === "São Paulo") valorFrete = 8.9;
      else if (data.uf === "SP") valorFrete = 14.9;
      else valorFrete = 24.9;

      setFrete({
        cidade: data.localidade,
        uf: data.uf,
        valor: valorFrete.toFixed(2),
      });
    } catch (e) {
      alert("Erro ao calcular frete.");
    }
  };

  const dispatch = useDispatch();

const adicionarAoCarrinho = () => {
  dispatch(adicionarAoCarrinhoRedux({
    id_produto: prato.id,
    nome: prato.nome,
    preco: parseFloat(prato.preco),
    imagem: prato.imagem,
    quantity: quantidade,
  }));

  setMensagem("✅ Adicionado à sacola!");
  setTimeout(() => setMensagem(""), 2000);
};

  if (!prato) {
    return <p className="text-center mt-10 text-gray-500">Carregando prato...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-green-700 hover:underline mb-6"
      >
        ← Voltar
      </button>

      {/* Estrutura principal */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Coluna esquerda — Detalhes */}
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-3">{prato.nome}</h1>
          <p className="text-gray-700 mb-4 leading-relaxed">{prato.descricao}</p>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm mb-6">
            {prato.peso && <p><strong>Peso:</strong> {prato.peso}</p>}
            {prato.calorias && <p><strong>Calorias:</strong> {prato.calorias} kcal</p>}
            {prato.tempo_preparo && <p><strong>Tempo:</strong> {prato.tempo_preparo}</p>}
            {prato.tipo_embalagem && <p><strong>Embalagem:</strong> {prato.tipo_embalagem}</p>}
          </div>

          {/* Ingredientes */}
          {prato.ingredientes && (
            <div className="mb-4">
              <h2 className="font-semibold text-lg text-green-700">Ingredientes</h2>
              <p className="text-gray-700 whitespace-pre-line">{prato.ingredientes}</p>
            </div>
          )}

          {/* Alergênicos */}
          <div className="mb-4 border-t pt-4 text-sm">
            {prato.contem && (
              <p className="text-red-600 font-semibold">⚠️ Contém: {prato.contem}</p>
            )}
            {prato.pode_conter && (
              <p className="text-orange-600 mt-1">Pode conter: {prato.pode_conter}</p>
            )}
          </div>

          {/* Preço */}
          <p className="text-3xl font-bold text-green-800 mb-4">
            R$ {parseFloat(prato.preco).toFixed(2)}
          </p>

          {/* Botão e quantidade */}
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
              onClick={adicionarAoCarrinho}
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
            >
              🛍️ Adicionar à Sacola
            </button>
          </div>

          {mensagem && (
            <p className="text-green-600 font-semibold mb-4">{mensagem}</p>
          )}

          {/* 🚚 Calcular Frete abaixo do botão */}
          <div className="mt-4 border-t pt-4">
            <h2 className="font-semibold text-lg text-green-700 mb-2">Calcular Frete</h2>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength="9"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => {
                  let valor = e.target.value.replace(/\D/g, "");
                  if (valor.length > 5) valor = valor.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
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
                <span className="font-semibold text-green-700">R$ {frete.valor}</span>
              </p>
            )}
          </div>
        </div>

        {/* Coluna direita — Imagem */}
        <div className="flex justify-center items-start">
          <img
            src={`https://congolinaria.com.br/${prato.imagem}`}
            alt={prato.nome}
            className="w-full md:w-[90%] h-auto rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* 🌿 Produtos Relacionados */}
      {relacionados.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Produtos Relacionados
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
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{p.descricao}</p>
                  <p className="text-green-700 font-bold">
                    R$ {parseFloat(p.preco).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
