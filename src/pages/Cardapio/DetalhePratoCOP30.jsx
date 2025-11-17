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

  // 🔎 Carregar dados
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

  // 🚚 Calcular frete
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

      let valor = 24.9;
      if (data.localidade === "São Paulo") valor = 8.9;
      else if (data.uf === "SP") valor = 14.9;

      setFrete({
        cidade: data.localidade,
        uf: data.uf,
        valor: valor.toFixed(2),
      });
    } catch {
      alert("Erro ao calcular frete.");
    }
  };

  // 🛍️ Adicionar ao Carrinho
  const adicionarAoCarrinho = () => {
    dispatch(
      adicionarAoCarrinhoRedux({
        id_produto: prato.id,
        nome: prato.nome,
        preco: parseFloat(prato.preco),
        imagem: prato.imagem,
        quantity: quantidade,
      })
    );
    setMensagem("✅ Adicionado à sacola!");
    setTimeout(() => setMensagem(""), 2000);
  };

  if (!prato) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Carregando prato...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      {/* Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-green-700 hover:underline mb-6"
      >
        ← Voltar
      </button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* COLUNA ESQUERDA */}
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">{prato.nome}</h1>
          <p className="text-gray-700 mb-4 leading-relaxed">{prato.descricao}</p>

          {/* Informações principais */}
          <div className="grid grid-cols-2 gap-2 text-sm mb-6">
            {prato.peso && <p><strong>Peso:</strong> {prato.peso}</p>}
            {prato.calorias && <p><strong>Calorias:</strong> {prato.calorias} kcal</p>}
            {prato.tempo_preparo && <p><strong>Tempo:</strong> {prato.tempo_preparo}</p>}
            {prato.tipo_embalagem && <p><strong>Embalagem:</strong> {prato.tipo_embalagem}</p>}
          </div>

          {/* Ingredientes */}
          {prato.ingredientes && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg text-green-700">🌿 Ingredientes</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {prato.ingredientes}
              </p>
            </div>
          )}

          {/* Modo de preparo */}
          {prato.modo_preparo && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg text-green-700">🍳 Modo de Preparo</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {prato.modo_preparo}
              </p>
            </div>
          )}

          {/* Características do produto */}
          <div className="my-6 bg-gray-50 border rounded-lg p-4">
            <h2 className="font-semibold text-lg text-green-700 mb-2">
              📦 Características do Produto
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {prato.peso && <li><strong>Peso líquido:</strong> {prato.peso}</li>}
              {prato.validade && <li><strong>Validade:</strong> {prato.validade}</li>}
              {prato.tipo_prato && <li><strong>Tipo:</strong> {prato.tipo_prato}</li>}
              {prato.conservacao && <li><strong>Conservação:</strong> {prato.conservacao}</li>}
              {prato.embalagem && <li><strong>Embalagem:</strong> {prato.embalagem}</li>}
              {prato.rendimento && <li><strong>Rendimento:</strong> {prato.rendimento}</li>}
            </ul>
          </div>

          {/* Tabela Nutricional */}
          {(prato.calorias || prato.proteina || prato.carboidrato || prato.gordura) && (
            <div className="my-6 border rounded-lg overflow-hidden">
              <h2 className="bg-green-700 text-white text-center py-2 font-semibold">
                Informações Nutricionais – Porção 100g
              </h2>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  {prato.calorias && (
                    <tr className="border-b">
                      <td className="p-2 font-medium">Valor Energético</td>
                      <td className="p-2 text-right">{prato.calorias} kcal</td>
                    </tr>
                  )}
                  {prato.proteina && (
                    <tr className="border-b">
                      <td className="p-2 font-medium">Proteínas</td>
                      <td className="p-2 text-right">{prato.proteina} g</td>
                    </tr>
                  )}
                  {prato.carboidrato && (
                    <tr className="border-b">
                      <td className="p-2 font-medium">Carboidratos</td>
                      <td className="p-2 text-right">{prato.carboidrato} g</td>
                    </tr>
                  )}
                  {prato.gordura && (
                    <tr className="border-b">
                      <td className="p-2 font-medium">Gorduras Totais</td>
                      <td className="p-2 text-right">{prato.gordura} g</td>
                    </tr>
                  )}
                  {prato.fibra && (
                    <tr className="border-b">
                      <td className="p-2 font-medium">Fibra Alimentar</td>
                      <td className="p-2 text-right">{prato.fibra} g</td>
                    </tr>
                  )}
                  {prato.sodio && (
                    <tr className="border-b">
                      <td className="p-2 font-medium">Sódio</td>
                      <td className="p-2 text-right">{prato.sodio} mg</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Alergênicos */}
          {(prato.contem || prato.pode_conter) && (
            <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-sm">
              <h2 className="font-semibold text-yellow-800 mb-1">⚠️ Alergênicos</h2>
              {prato.contem && (
                <p className="text-red-700 pb-1"><strong>Contém:</strong> {prato.contem}</p>
              )}
              {prato.pode_conter && (
                <p className="text-yellow-800"><strong>Pode conter:</strong> {prato.pode_conter}</p>
              )}
            </div>
          )}

          {/* Preço */}
          <p className="text-3xl font-bold text-green-800 mb-4">
            R$ {parseFloat(prato.preco).toFixed(2)}
          </p>

          {/* Quantidade + botão */}
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
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition flex items-center gap-2"
            >
              <FaShoppingBag /> Adicionar à Sacola
            </button>
          </div>

          {mensagem && (
            <p className="text-green-600 font-semibold mb-4">{mensagem}</p>
          )}

          {/* Cálculo de Frete */}
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
                  R$ {frete.valor}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA – IMAGEM */}
        <div className="flex justify-center items-start">
          <img
            src={`https://congolinaria.com.br/${prato.imagem}`}
            alt={prato.nome}
            className="w-full md:w-[90%] h-auto rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* Produtos Relacionados */}
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
    </div>
  );
}
