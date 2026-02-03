import React from "react";

export default function QuemSomos() {
  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-8">
          Quem Somos
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl">
          O <strong>Instituto Conglobal</strong> é uma organização social
          dedicada à valorização da cultura afro-brasileira e congolesa,
          promoção da educação, defesa dos direitos humanos e apoio à
          integração de imigrantes e refugiados no Brasil.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl">
          Fundado a partir da força ancestral da gastronomia do Congo e do
          compromisso com a justiça social, o Instituto atua como ponte entre
          culturas, saberes e comunidades, oferecendo projetos que unem
          acolhimento, formação profissional, cidadania, saúde emocional e
          oportunidades acadêmicas.
        </p>

        {/* MISSÃO, VISÃO E VALORES */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 rounded-xl bg-white shadow-md border-l-4 border-[#144D3A]">
            <h2 className="text-xl font-semibold text-[#144D3A] mb-3">Missão</h2>
            <p className="text-gray-700">
              Promover cultura, educação, integração e dignidade para
              imigrantes, refugiados e comunidades afro-brasileiras.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md border-l-4 border-[#C9A23F]">
            <h2 className="text-xl font-semibold text-[#C9A23F] mb-3">Visão</h2>
            <p className="text-gray-700">
              Ser referência nacional em inclusão social, ensino de português
              para imigrantes, revalidação de diplomas estrangeiros e promoção
              da cultura afro.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md border-l-4 border-[#4E2A1E]">
            <h2 className="text-xl font-semibold text-[#4E2A1E] mb-3">Valores</h2>
            <ul className="text-gray-700 space-y-2">
              <li>• Autonomia e dignidade</li>
              <li>• Acolhimento e empatia</li>
              <li>• Ancestralidade e memória</li>
              <li>• Educação transformadora</li>
              <li>• Sustentabilidade e ética</li>
            </ul>
          </div>
        </div>

        {/* SEÇÃO HISTÓRIA */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#144D3A] mb-4">Nossa História</h2>
          <p className="text-gray-700 leading-relaxed max-w-4xl">
            O Instituto nasceu da trajetória do Congolinaria e de seu
            fundador, o Chef congolês Pitchou Luambo, cuja cozinha afrovegana
            tornou-se um espaço de resistência, cuidado e diálogo comunitário.
            A partir da demanda crescente de imigrantes — africanos e
            latino-americanos — por orientação documental, ensino de
            português, apoio emocional e oportunidades acadêmicas, o Instituto
            expandiu sua atuação para se tornar também um polo de integração,
            acolhimento e transformação social.
          </p>
        </div>
      </div>
    </div>
  );
}
