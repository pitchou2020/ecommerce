import React from "react";

export default function Parcerias() {
  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-6 text-center">
          Torne-se um Parceiro do Instituto Congolinaria
        </h1>

        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Buscamos alianças com universidades, organizações, empresas e profissionais
          que acreditam na transformação social através da cultura, educação e integração
          de imigrantes no Brasil.
        </p>

        {/* TIPOS DE PARCERIA */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            "Universidades e Centros Acadêmicos",
            "Empresas e Iniciativas Privadas",
            "Organizações da Sociedade Civil",
            "Escolas e Projetos Educacionais",
            "Grupos de Pesquisadores",
            "Voluntariado (professores, tradutores, psicólogos)",
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow"
            >
              <h3 className="text-lg font-bold text-[#144D3A] mb-2">{item}</h3>
              <p className="text-gray-700">
                Entre em contato e apoie nossos programas de formação, acolhimento,
                documentação e cultura.
              </p>
            </div>
          ))}
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-[#144D3A] mb-6">
            Envie sua Proposta de Parceria
          </h2>

          <form className="grid gap-5">
            <input className="p-3 border rounded-md" placeholder="Nome da instituição ou profissional" />
            <input className="p-3 border rounded-md" placeholder="Email" />
            <input className="p-3 border rounded-md" placeholder="Telefone" />
            <select className="p-3 border rounded-md">
              <option>Selecione o tipo de parceria</option>
              <option>Universidade</option>
              <option>ONG</option>
              <option>Empresa</option>
              <option>Projeto Educacional</option>
              <option>Voluntariado</option>
              <option>Outro</option>
            </select>
            <textarea
              className="p-3 border rounded-md h-32"
              placeholder="Descreva sua proposta ou área de interesse"
            ></textarea>

            <button className="bg-[#144D3A] text-white py-3 rounded-md font-semibold hover:bg-[#0e3a2b]">
              Enviar Proposta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
