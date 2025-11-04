import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-yellow-50 py-12 md:py-20">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Texto */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Culinária AfroVeg com Sabor e História
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Explore pratos tradicionais do Congo em versões plant-based exclusivas do Congolinaria.
          </p>
          <Link
            to="/cardapio"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
          >
            Ver Cardápio
          </Link>
        </div>

        {/* Imagem */}
        <div className="flex-1">
          <img
            src="/img/hero-prato.png"
            alt="Prato AfroVeg do Congolinaria"
            className="w-full max-w-md mx-auto drop-shadow-xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
