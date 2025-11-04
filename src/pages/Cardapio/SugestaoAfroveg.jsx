import { useState } from "react";
import axios from "axios";

export default function SugestaoAfroveg() {
  const [mostrarSugestao, setMostrarSugestao] = useState(false);
  const [restricoes, setRestricoes] = useState("");
  const [resultado, setResultado] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const buscarPratos = async () => {
    setCarregando(true);
    setResultado([]);
    setErro("");

    try {
      const res = await axios.post("https://congolinaria.com.br/api/sugerir_pratos.php", {
        restricoes: restricoes,
      });

      if (res.data.erro) {
        setErro(res.data.erro);
      } else {
        setResultado(res.data.pratos);
      }
    } catch (err) {
      setErro("Erro ao buscar sugestões.");
    }

    setCarregando(false);
  };

  return (
    <div className="my-6">
      <button
        onClick={() => setMostrarSugestao(!mostrarSugestao)}
        className="bg-orange-700 text-white px-4 py-2 rounded shadow-md hover:bg-orange-800 transition-all"
      >
        {mostrarSugestao ? "Fechar sugestões personalizadas" : "🍲 Ver sugestões afroveg personalizadas"}
      </button>

      {mostrarSugestao && (
        <div className="mt-5 p-4 bg-yellow-50 border-2 border-orange-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3 text-green-800 border-b-2 border-dotted border-orange-500 pb-1">
            Sugestão Afroveg com Restrições Alimentares
          </h2>

          <input
            type="text"
            placeholder="Ex: glúten, soja, pimenta"
            value={restricoes}
            onChange={(e) => setRestricoes(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <button
            onClick={buscarPratos}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            Buscar pratos recomendados
          </button>

          {carregando && <p className="mt-4 text-gray-500 italic">Carregando sugestões afroveg...</p>}
          {erro && <p className="mt-4 text-red-600">{erro}</p>}

          <div className="mt-4 space-y-4">
            {resultado.map((prato, i) => (
              <div key={i} className="p-4 border border-orange-200 rounded-lg bg-white shadow-sm">
                <h3 className="font-bold text-lg text-green-900">{prato.nome}</h3>
                {prato.imagem && (
                  <img
                    src={`https://congolinaria.com.br/img_upload/${prato.imagem}`}
                    alt={prato.nome}
                    className="w-full h-48 object-cover mt-2 mb-3 rounded border border-orange-300"
                  />
                )}
                <p className="text-sm text-gray-800">{prato.descricao}</p>
                {prato.ingredientes && (
                  <p className="mt-1 text-xs text-gray-600">
                    <strong>Ingredientes:</strong> {prato.ingredientes}
                  </p>
                )}
                {prato.harmonizacao && (
                  <p className="mt-2 text-sm text-blue-700 italic">
                    🍷 Harmonização ideal: <strong>{prato.harmonizacao}</strong> – {prato.harmonizacao_descricao}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
