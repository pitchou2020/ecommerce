import React from "react";

const unidades = [
  {
    id: 1,
    nome: "Congolinaria – Zona Oeste",
    endereco: "Av. Professor Alfonso Bovero, 382 – Sumaré, São Paulo – SP",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.294239342446!2d-46.6841657!3d-23.5585236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d594c2e9a3%3A0xd960c5f3a1c8c779!2sAv.%20Prof.%20Alfonso%20Bovero%2C%20382%20-%20Sumar%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1695751609010!5m2!1spt-BR!2sbr",
  },
  {
    id: 2,
    nome: "Congolinaria – Zona Leste",
    endereco: "Rua Caquito, 251 – Penha, São Paulo – SP",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.416492899401!2d-46.5388951!3d-23.5896827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5edc09c586a7%3A0xf9e48a7d1f2c70ec!2sR.%20Caquito%2C%20251%20-%20Penha%20de%20Fran%C3%A7a%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1695751720543!5m2!1spt-BR!2sbr",
  },
];

const MapaUnidades = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Nossas Unidades
        </h2>
        <p className="text-lg text-gray-600">
          Visite o Congolinaria mais perto de você.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {unidades.map((unidade) => (
          <div key={unidade.id} className="bg-gray-100 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{unidade.nome}</h3>
            <p className="text-gray-700 mb-4">{unidade.endereco}</p>
            <div className="w-full h-64">
              <iframe
                src={unidade.mapa}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg border border-gray-300"
                title={`Mapa da unidade ${unidade.nome}`}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MapaUnidades;
