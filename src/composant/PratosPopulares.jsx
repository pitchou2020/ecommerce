import React from "react";

const pratos = [
  {
    id: 1,
    nome: "Feijoada AfroVeg",
    descricao: "Feita com ingredientes típicos africanos, acompanha farofa e arroz de gengibre.",
    imagem: "/img/pratos/feijoada.jpg",
  },
  {
    id: 2,
    nome: "Moqueca de Banana da Terra",
    descricao: "Moqueca vegana com dendê, leite de coco e legumes frescos.",
    imagem: "/img/pratos/moqueca.jpg",
  },
  {
    id: 3,
    nome: "Fufu com Mafé",
    descricao: "Prato tradicional do Congo à base de mandioca e pasta de amendoim.",
    imagem: "/img/pratos/fufu-mafe.jpg",
  },
];

const PratosPopulares = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Pratos Populares
        </h2>
        <p className="text-lg text-gray-600">
          Sabores que conquistam nossos clientes no dia a dia.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pratos.map((prato) => (
          <div
            key={prato.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={prato.imagem}
              alt={prato.nome}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800">
                {prato.nome}
              </h3>
              <p className="mt-2 text-gray-600">{prato.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PratosPopulares;
