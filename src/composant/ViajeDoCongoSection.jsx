import React from "react";
import { Link } from "react-router-dom";

const ViajeDoCongoSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Viaje pelo Congo sem sair de São Paulo
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Viva uma experiência gastronômica e cultural única com pratos típicos, música, arte e muita ancestralidade.  
        </p>
        <Link
          to="/experiencias"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-xl transition duration-300"
        >
          Ver Experiências
        </Link>
      </div>

      {/* Imagens ilustrativas */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <img
          src="/img/viaje1.jpg"
          alt="Culinária congolesa"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
        <img
          src="/img/viaje2.jpg"
          alt="Cultura africana"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
        <img
          src="/img/viaje3.jpg"
          alt="Experiência Congolinaria"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
      </div>
    </section>
  );
};

export default ViajeDoCongoSection;
