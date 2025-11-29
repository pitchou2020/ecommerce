import React from "react";

export default function CentroCultural() {
  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-8">
          Centro Cultural Congolinaria
        </h1>

        <p className="text-lg text-gray-700 max-w-4xl mb-10">
          O Centro Cultural Congolinaria é um espaço de convivência, formação,
          arte e memória que promove encontros entre saberes africanos,
          afro-brasileiros e imigrantes residentes no Brasil. Aqui, cultura,
          gastronomia, educação e acolhimento caminham juntos.
        </p>

        {/* SEÇÕES DO CENTRO CULTURAL */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Gastronomia */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-[#144D3A] mb-3">
              Gastronomia Afro e Oficinas
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Oficinas de culinária afrovegana, palestras gastronômicas,
              degustações, aulas práticas e formação comunitária com foco na
              história alimentar africana.
            </p>
          </div>

          {/* Aulas de português */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-[#144D3A] mb-3">
              Aulas de Português para Imigrantes
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cursos gratuitos ministrados por voluntários brasileiros: alfabetização,
              conversação, preparação para entrevistas, documentos e mundo do trabalho.
            </p>
          </div>

          {/* Programação cultural */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-[#144D3A] mb-3">
              Programação Cultural
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Rodas de conversa, cine-debates, saraus, apresentações artísticas,
              eventos do Congo e celebrações da diáspora.
            </p>
          </div>

          {/* Apoio Social */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-[#144D3A] mb-3">
              Acolhimento Social
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Apoio emocional, mediação de conflitos, encaminhamento para serviços
              públicos e integração comunitária.
            </p>
          </div>
        </div>

        {/* Calendário (placeholder para implementação futura) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#144D3A] mb-3">Agenda Cultural</h2>
          <p className="text-gray-700">Em breve: calendário completo de oficinas, aulas e eventos.</p>
        </div>
      </div>
    </div>
  );
}
