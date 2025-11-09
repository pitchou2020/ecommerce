import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletarItemRedux } from "../../redux/cartReducer";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function MiniCartDropdown({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const subtotal = cartItems.reduce((acc, item) => acc + item.preco * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-4 border border-gray-100">
        <p className="text-center text-gray-600">🛒 Sua sacola está vazia.</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-50">
      <div className="max-h-64 overflow-y-auto divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div key={item.id_produto} className="flex items-center gap-3 p-3">
            <img
              src={`https://congolinaria.com.br/${item.imagem}`}
              alt={item.nome}
              className="w-14 h-14 rounded-md object-cover border"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.nome}</p>
              <p className="text-sm text-gray-500">
                {item.quantity}x R$ {item.preco.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => dispatch(deletarItemRedux(item.id_produto))}
              className="text-red-500 hover:text-red-700"
              title="Remover"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-gray-50">
        <p className="flex justify-between font-semibold text-gray-800 mb-3">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="flex-1 bg-green-700 text-white rounded-lg py-2 hover:bg-green-800 transition"
          >
            Finalizar Compra
          </button>
          <button
            onClick={() => {
              onClose();
              navigate("/sacola");
            }}
            className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 hover:bg-gray-300 transition"
          >
            Ver Sacola
          </button>
        </div>
      </div>
    </div>
  );
}
