import React from "react";

export default function Programas() {
  const eixos = [
    /* ---------------------------------------------------
       CULTURA • EDUCAÇÃO • GASTRONOMIA • SUSTENTABILIDADE
    ---------------------------------------------------- */

    {
      titulo: "Cultura e Memória",
      descricao:
        "Promoção da história afro-brasileira, tradições congolesas, valorização da ancestralidade, feiras culturais, exposições, rodas de conversa e memória gastronômica.",
      cor: "from-[#144D3A] to-[#0E2F24]",
    },
    {
      titulo: "Educação e Formação",
      descricao:
        "Cursos de culinária AfroVeg, formação profissional, oficinas de empreendedorismo, manipulação de alimentos e programas de entrada no mercado de trabalho.",
      cor: "from-[#C9A23F] to-[#b08c35]",
    },
    {
      titulo: "Gastronomia Social e Criativa",
      descricao:
        "Uso da gastronomia como instrumento de inclusão, economia criativa e geração de oportunidades, apoiando cozinheiras, empreendedores e jovens talentos.",
      cor: "from-[#4E2A1E] to-[#3A1E15]",
    },
    {
      titulo: "Sustentabilidade",
      descricao:
        "Hortas urbanas, oficinas de compostagem, reciclagem, economia circular e educação ambiental voltada à comunidade.",
      cor: "from-[#0F6D40] to-[#0A4D30]",
    },

    /* ---------------------------------------------------
       ÁREA DE INTEGRAÇÃO BRASIL–ÁFRICA E MIGRAÇÃO
    ---------------------------------------------------- */

    {
      titulo: "Reconhecer para Integrar — Revalidação de Diplomas",
      descricao:
        "Orientação completa e humanizada sobre equivalência de diplomas estrangeiros, montagem de dossiê para universidades públicas e apoio no acesso a tradutores juramentados parceiros.",
      cor: "from-[#144D3A] to-[#1A5C46]",
    },
    {
      titulo: "Futuro Acadêmico — Bolsas e Universidades",
      descricao:
        "Acompanhamento para ingresso no ensino superior, acesso a bolsas, PROUNI, ENEM, PEC-G/PEC-PG e oportunidades de cooperação acadêmica entre Brasil e países africanos.",
      cor: "from-[#C9A23F] to-[#E2C35C]",
    },
    {
      titulo: "DocumentaBR — Imigração e Regularização",
      descricao:
        "Orientação sobre naturalização, residência, CRNM, processos migratórios, pedidos de refúgio e documentação necessária para uma vida regularizada no Brasil.",
      cor: "from-[#4E2A1E] to-[#2D180F]",
    },
    {
      titulo: "Pontes Brasil–África — Parcerias e Diplomacia Cultural",
      descricao:
        "Construção de redes internacionais, apoio a investidores estrangeiros, conexão com universidades, ONGs e instituições públicas para cooperação Brasil–África.",
      cor: "from-[#0F6D40] to-[#0A4F32]",
    },

    /* ---------------------------------------------------
       NOVO BLOCO: LÍNGUAS • INTÉRPRETES • NEGÓCIOS
    ---------------------------------------------------- */

    {
      titulo: "Interpretação e Linguagem — Francês • Inglês • Espanhol",
      descricao:
        "Disponibilização de intérpretes multilíngues para empresários estrangeiros, estudantes, pesquisadores, investidores e imigrantes que necessitam de mediação linguística em atendimentos, visitas técnicas, entrevistas e processos oficiais.",
      cor: "from-[#144D3A] to-[#0E2F24]",
    },
    {
      titulo: "Português para Imigrantes",
      descricao:
        "Cursos gratuitos com voluntários brasileiros, reforço cultural, alfabetização, conversação e preparação para entrevistas, documentos e mercado de trabalho.",
      cor: "from-[#C9A23F] to-[#b08c35]",
    },

    /* ---------------------------------------------------
       APOIO COMUNITÁRIO SEM ASSISTENCIALISMO
    ---------------------------------------------------- */
    {
      titulo: "Acolhimento Social e Mediação Comunitária",
      descricao:
        "Mediação de conflitos, apoio emocional comunitário voluntário, orientação sobre direitos, fortalecimento familiar e integrações em redes públicas sem caráter assistencialista.",
      cor: "from-[#4E2A1E] to-[#2D180F]",
    },
  ];

  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-10">
          Programas e Projetos do Instituto Conglobal        </h1>

        <p className="text-lg text-gray-700 mb-12 max-w-3xl leading-relaxed">
          O Instituto Conglobal desenvolve ações que unem cultura, educação,
          integração linguística, orientação migratória, formação profissional e
          cooperação Brasil–África. O objetivo é promover autonomia, dignidade e
          oportunidades para comunidades afro-diaspóricas, imigrantes,
          empreendedores e estudantes internacionais.
        </p>

        {/* GRID DE PROGRAMAS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eixos.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition"
            >
              <div className={`h-32 bg-gradient-to-r ${item.cor} opacity-90`} />
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
