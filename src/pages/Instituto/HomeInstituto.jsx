import React from "react";
import { Link } from "react-router-dom";

export default function HomeInstituto() {
  return (
   
    <div className="bg-[#F7F0E8] min-h-screen">

      
      {/* HERO */}
<section className="relative bg-[#144D3A] text-white py-20 px-6 overflow-hidden">



  <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    {/* Texto (Fade-in) */}
    <div 
      className="order-2 md:order-1 opacity-0 translate-y-6 animate-[fadeUp_1s_ease_forwards]"
      style={{ animationDelay: "0.2s" }}
    >
      <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
        Cultura, Gastronomia e Transformação Social
      </h1>

      <p className="text-lg text-gray-200 mb-8 max-w-xl">
        O Instituto Conglobal promove educação, memória, inclusão social
        e acolhimento de imigrantes e refugiados, unindo cultura afro-brasileira
        e congolesa, dignidade humana e integração social.
      </p>

      <div className="flex gap-4">
        <Link
          to="/instituto/quem-somos"
          className="px-6 py-3 bg-white text-[#144D3A] font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          Conheça o Instituto
        </Link>

        <Link
          to="/instituto/doar"
          className="px-6 py-3 bg-[#C9A23F] text-[#144D3A] font-semibold rounded-full shadow hover:bg-[#e7ce7a] transition"
        >
          Doe Agora
        </Link>
      </div>
    </div>

    {/* LOGO (Fade + hover suave + gradient box) */}
    <div 
      className="order-1 md:order-2 flex justify-center opacity-0 translate-y-6 animate-[fadeUp_1s_ease_forwards]"
      style={{ animationDelay: "0.5s" }}
    >
      <div className="bg-gradient-to-br from-[#144D3A] via-[#0f3a2a] to-[#07261c] p-6 rounded-2xl shadow-xl">
        <img
          src="/images/Logo_Instituto_Congolinaria_branca.png"
          alt="Instituto Conglobal"
          className="rounded-xl shadow-xl w-[92%] mx-auto transition-transform duration-500 hover:scale-[1.06]"
        />
      </div>
    </div>

  </div>
</section>

{/* SEPARADOR AFRICANO */}




      {/* EIXOS */}
      <section className="py-20 px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#144D3A] mb-10">
          Eixos de Atuação
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              titulo: "Cultura e Memória",
              texto:
                "Centro de memória e ações culturais que preservam culinária e ancestralidade africana."
            },
            {
              titulo: "Educação e Formação",
              texto:
                "Escola AfroVeg, bolsas de estudo, oficinas e programas para jovens, mulheres e imigrantes."
            },
            {
              titulo: "Integração Social",
              texto:
                "Português para Imigrantes, apoio documental, acolhimento humanitário e orientação jurídica."
            },
            {
              titulo: "Sustentabilidade",
              texto:
                "Horta urbana, economia criativa, reciclagem e aproveitamento alimentar integral."
            },
          ].map((eixo, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-[#144D3A] mb-3">
                {eixo.titulo}
              </h3>
              <p className="text-gray-700">{eixo.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Construindo o Futuro */}
      <section className="bg-[#F7F0E8] py-20 text-center px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-8">
          Construindo o Futuro
        </h2>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Estamos iniciando uma jornada para fortalecer cultura, educação e integração social.
          Em breve, você poderá acompanhar aqui nossos resultados e indicadores de impacto.
        </p>

        <div className="max-w-2xl mx-auto grid gap-4 text-left text-gray-700 text-lg">

          {[
            "Implementar aulas gratuitas de português para imigrantes.",
            "Criar o Programa de Validação de Diplomas Estrangeiros.",
            "Fortalecer ações culturais congolesas e afro-brasileiras.",
            "Desenvolver cursos profissionalizantes comunitários.",
            "Ativar redes de voluntariado (professores, psicólogos, tradutores).",
            "Estabelecer parcerias com universidades e órgãos públicos.",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#144D3A] text-xl">•</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA DOAÇÃO */}
      <section className="bg-[#144D3A] text-white py-16 text-center px-6">
        <h3 className="text-2xl font-bold mb-4">Apoie o Instituto Conglobal</h3>
        <p className="text-gray-200 max-w-2xl mx-auto mb-6">
          Sua doação ajuda a manter projetos culturais, assistência documental,
          aulas de português e programas que transformam vidas.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/instituto/doar"
            className="px-6 py-3 bg-[#C9A23F] text-[#144D3A] font-semibold rounded-full shadow hover:bg-[#e8cb7b]"
          >
            Quero Doar
          </Link>

          <Link
            to="/instituto/parcerias"
            className="px-6 py-3 bg-transparent border border-white rounded-full font-semibold hover:bg-white hover:text-[#144D3A]"
          >
            Ser Parceiro
          </Link>
        </div>
      </section>
    </div>
  );
}
