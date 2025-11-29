import React from "react";

export default function Programas() {
  const eixos = [
    {
      titulo: "Cultura e Memória",
      descricao:
        "Promoção da história afro-brasileira, tradições congolesas, valorização da ancestralidade, feiras culturais, exposições, rodas de conversa e memória gastronômica.",
      cor: "from-[#144D3A] to-[#0E2F24]",
    },
    {
      titulo: "Educação e Formação",
      descricao:
        "Cursos de culinária AfroVeg, formação profissional, oficinas de empreendedorismo, manipulação de alimentos e bolsas para jovens, mulheres e imigrantes.",
      cor: "from-[#C9A23F] to-[#b08c35]",
    },
    {
      titulo: "Gastronomia Solidária",
      descricao:
        "Refeições comunitárias, formação de cozinheiras, combate à fome, distribuição de alimentos, cozinhas solidárias e programas de geração de renda.",
      cor: "from-[#4E2A1E] to-[#3A1E15]",
    },
    {
      titulo: "Sustentabilidade",
      descricao:
        "Hortas urbanas, compostagem, economia criativa, reciclagem, oficinas de aproveitamento integral e educação ambiental.",
      cor: "from-[#0F6D40] to-[#0A4D30]",
    },

    /* -------------------- NOVOS PROGRAMAS (Integração) -------------------- */

    {
      titulo: "Reconhecer para Integrar — Revalidação de Diplomas",
      descricao:
        "Apoio completo para validação e equivalência de diplomas estrangeiros no Brasil, incluindo montagem de dossiês, orientação para universidades públicas, e acesso a tradutores juramentados parceiros.",
      cor: "from-[#144D3A] to-[#1A5C46]",
    },
    {
      titulo: "Futuro Academicamente Livre — Bolsas e Universidades",
      descricao:
        "Acompanhamento educacional para ingresso no ensino superior, bolsas sociais, PROUNI, ENEM, orientação acadêmica e divulgação de parcerias Brasil–África para estudantes estrangeiros.",
      cor: "from-[#C9A23F] to-[#E2C35C]",
    },
    {
      titulo: "DocumentaBR — Naturalização, Refúgio e Migração",
      descricao:
        "Apoio em processos de pedido de refúgio, naturalização, CRNM, residência por trabalho ou estudo, agendamentos, orientação jurídica humanizada e mediação comunitária.",
      cor: "from-[#4E2A1E] to-[#2D180F]",
    },
    {
      titulo: "Pontes Brasil–África — Parcerias Internacionais",
      descricao:
        "Divulgação e encaminhamento para programas bilaterais Brasil–África, editais educacionais, bolsas PEC-G e PEC-PG, acordos do Itamaraty, programas da CAPES e universidades federais.",
      cor: "from-[#0F6D40] to-[#0A4F32]",
    },
    {
      titulo: "Português para Imigrantes e Refugiados",
      descricao:
        "Aulas gratuitas de português com voluntários brasileiros, reforço escolar, alfabetização cultural, conversação e cursos voltados ao mercado de trabalho e documentos oficiais.",
      cor: "from-[#144D3A] to-[#0E2F24]",
    },
    {
      titulo: "Acolhimento Social e Comunitário",
      descricao:
        "Apoio psicológico voluntário, mediação de conflitos, fortalecimento de famílias migrantes, orientação sobre direitos sociais e integração humanizada no território brasileiro.",
      cor: "from-[#C9A23F] to-[#b08c35]",
    },
  ];

  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-10">
          Programas e Projetos do Instituto Congolinaria
        </h1>

        <p className="text-lg text-gray-700 mb-12 max-w-3xl">
          Nossos programas unem cultura, educação, acolhimento e desenvolvimento
          social, fortalecendo comunidades afro-brasileiras, migrantes e
          refugiadas através da gastronomia, memória, formação profissional,
          acesso à educação e integração no Brasil.
        </p>

        {/* GRID DE PROGRAMAS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eixos.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition"
            >
              <div
                className={`h-32 bg-gradient-to-r ${item.cor} opacity-90`}
              ></div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#144D3A] mb-3">
                  {item.titulo}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
