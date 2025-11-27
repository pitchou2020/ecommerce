import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ModalVariacoes({ prato, onClose, onSelect }) {
  const [variacoes, setVariacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://congolinaria.com.br/api/variacoes_cop30.php?id_produto=${prato.id}`
      )
      .then((res) => setVariacoes(res.data))
      .finally(() => setLoading(false));
  }, [prato.id]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-3 text-center">
          Escolher variação — {prato.nome}
        </h2>

        {loading && <p className="text-center">Carregando...</p>}

        {!loading && variacoes.length === 0 && (
          <p className="text-center text-gray-600">
            Nenhuma variação cadastrada.
          </p>
        )}

        {/* Lista de variações */}
        <div className="space-y-2">
          {variacoes.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              className="w-full border p-3 rounded-lg hover:bg-green-100 text-left"
            >
              <div className="font-semibold">{v.variacao}</div>
              {Number(v.preco_adicional) > 0 && (
                <div className="text-sm text-green-700">
                  + R$ {Number(v.preco_adicional).toFixed(2)}
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          className="mt-4 w-full bg-gray-300 p-2 rounded"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
