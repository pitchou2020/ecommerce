import React from "react";

const DepoimentoChef = () => {
  return (
    <section className="bg-orange-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/chef-pitchou.jpg" // substitua pelo caminho correto da imagem
          alt="Chef Pitchou Luambo"
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-orange-300 shadow-md"
        />

        <blockquote className="mt-8 text-xl italic text-gray-800">
          “A comida é uma ponte entre culturas, memórias e afetos. Cozinhar é minha forma de contar a história do Congo com amor e respeito à natureza.”
        </blockquote>

        <p className="mt-4 text-lg font-semibold text-orange-700">
          Chef Pitchou Luambo
        </p>
        <p className="text-sm text-gray-500">Fundador do Congolinaria</p>
      </div>
    </section>
  );
};

export default DepoimentoChef;
