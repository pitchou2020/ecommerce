import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export default function PedidoPendente() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <Clock className="text-yellow-600 w-20 h-20 mb-4" />

      <h1 className="text-3xl font-bold text-yellow-800 mb-2">
        Pagamento Pendente
      </h1>

      <p className="text-lg text-gray-700 text-center max-w-md">
        Estamos aguardando a confirmação do seu pagamento.  
        Assim que for aprovado, você será avisado!
      </p>

      <Link
        to="/cardapio"
        className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
      >
        Voltar ao Cardápio
      </Link>
    </div>
  );
}
