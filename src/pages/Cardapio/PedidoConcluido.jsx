import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function PedidoConcluido() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-green-600 mb-4"
      >
        <CheckCircle size={100} />
      </motion.div>

      <h1 className="text-3xl font-bold text-green-700 mb-2">Pagamento Recebido!</h1>
      <p className="text-gray-700 max-w-md mb-6">
        Seu pedido foi concluído com sucesso 🍃  
        Em breve nossa equipe entrará em contato para confirmar a entrega.
      </p>

      <Link
        to="/cardapio"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Voltar ao Cardápio
      </Link>
    </div>
  );
}
