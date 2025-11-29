import React, { useEffect, useState } from "react";

export default function PromoPopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] p-4">
      
      <div className="relative bg-yellow-400 text-black w-full max-w-[850px] rounded-xl shadow-2xl animate-scaleIn max-h-screen overflow-y-auto">

        {/* botão fechar */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-black text-3xl font-bold z-50"
        >
          ×
        </button>

        {/* IMAGENS FIXAS */}
        <div className="w-full overflow-hidden">

          <img
            src="/promo/simba.jpeg"
            alt="Simba"
            className="w-full max-h-[35vh] object-cover"
          />

          <img
            src="/promo/ngombe.jpeg"
            alt="Ngombe"
            className="w-full max-h-[35vh] object-cover border-t-2 border-yellow-500"
          />

        </div>

        {/* TEXTO */}
        <div className="p-6 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Promoção Congolinaria
          </h1>

          <p className="text-lg md:text-2xl mt-2 font-semibold">
            2 pratos congelados por
            <span className="text-red-600"> R$ 39,90</span>
          </p>

          <p className="mt-2 text-md md:text-lg">
            Pratos: Simba & Ngombe
          </p>

          <button className="mt-4 bg-black text-yellow-400 font-bold px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-gray-900">
            Aproveitar Agora
          </button>
        </div>

      </div>
    </div>
  );
}
