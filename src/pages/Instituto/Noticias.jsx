import React from "react";

export default function Noticias() {
  const posts = [
    {
      titulo: "Oficina AfroVeg forma nova turma de jovens cozinheiros",
      data: "28 Novembro 2025",
      imagem: "/img/instituto/oficina-afroveg.jpg",
      resumo:
        "A formação contou com 25 jovens da região leste de São Paulo...",
    },
    {
      titulo: "Feira Sabores da Ancestralidade reúne 2 mil pessoas",
      data: "12 Outubro 2025",
      imagem: "/img/instituto/feira-ancestralidade.jpg",
      resumo:
        "Evento celebrou a culinária afro-brasileira com pratos, música e arte.",
    },
  ];

  return (
    <div className="bg-[#F7F0E8] min-h-screen pb-20">

      {/* HERO */}
      <section className="bg-[#144D3A] text-white py-16 mb-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Notícias e Publicações</h1>
          <p className="text-sm mt-2 max-w-xl text-[#E5E7EB]">
            Acompanhe as novidades, eventos, ações culturais e relatos do
            Instituto Congolinaria.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {posts.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border overflow-hidden"
          >
            <img src={p.imagem} className="h-56 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs text-[#C9A23F]">{p.data}</p>
              <h3 className="text-lg font-semibold text-[#144D3A] mt-1">
                {p.titulo}
              </h3>
              <p className="text-sm text-[#4b5563] mt-2">{p.resumo}</p>
              <button className="px-4 py-2 bg-[#144D3A] text-white rounded-full text-sm mt-4">
                Ler mais
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
