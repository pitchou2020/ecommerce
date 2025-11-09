import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function RetornoPagamento() {
  const [params] = useSearchParams();
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const transactionId = params.get("transaction_id");

  useEffect(() => {
    const consultarStatus = async () => {
      if (!transactionId) {
        setErro("Código da transação não encontrado.");
        return;
      }

      try {
        const res = await fetch(
          `https://congolinaria.com.br/api/pagseguro_consultar.php?transaction_id=${transactionId}`
        );
        const data = await res.json();
        if (data?.ok) setDados(data);
        else setErro("Falha ao consultar o pagamento.");
      } catch (err) {
        console.error(err);
        setErro("Erro ao conectar ao servidor.");
      }
    };

    consultarStatus();
  }, [transactionId]);

  if (erro)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-3">❌ Erro</h2>
        <p className="text-gray-700 mb-4">{erro}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Voltar ao site
        </button>
      </div>
    );

  if (!dados)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        ⏳ Consultando pagamento...
      </div>
    );

  const cores = {
    "Aguardando pagamento": "bg-yellow-100 text-yellow-700 border-yellow-400",
    "Em análise": "bg-blue-100 text-blue-700 border-blue-400",
    "Pago": "bg-green-100 text-green-700 border-green-400",
    "Disponível": "bg-green-100 text-green-700 border-green-400",
    "Em disputa": "bg-red-100 text-red-700 border-red-400",
    "Devolvido": "bg-red-100 text-red-700 border-red-400",
    "Cancelado": "bg-red-100 text-red-700 border-red-400",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border">
        <div className="flex flex-col items-center">
          <img
            src="https://congolinaria.com.br/img_upload/logo_congolinaria.png"
            alt="Congolinaria"
            className="w-24 mb-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Status do Pagamento
          </h1>
          <p
            className={`px-4 py-2 rounded-full border mt-2 font-semibold ${
              cores[dados.status] || "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {dados.status}
          </p>
        </div>

        <div className="mt-6 text-sm text-gray-700 space-y-2">
          <p>
            <strong>Cliente:</strong> {dados.comprador}
          </p>
          <p>
            <strong>Valor:</strong> R$ {Number(dados.valor).toFixed(2)}
          </p>
          <p>
            <strong>Referência:</strong> {dados.referencia || "N/A"}
          </p>
          <p>
            <strong>Data:</strong> {dados.data}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Voltar ao site
          </button>
        </div>
      </div>
    </div>
  );
}
