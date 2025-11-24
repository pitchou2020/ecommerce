import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PedidoFalhou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
      <XCircle className="text-red-600 w-20 h-20 mb-4" />

      <h1 className="text-3xl font-bold text-red-800 mb-2">
        Pagamento Não Autorizado
      </h1>

      <p className="text-lg text-gray-700 text-center max-w-md">
        Houve um problema ao processar o pagamento.  
        Verifique seus dados e tente novamente.
      </p>

      <Link
        to="/checkout"
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Tentar Novamente
      </Link>
    </div>
  );
}
