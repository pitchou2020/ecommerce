import React from "react";
import { Link } from "react-router-dom";
import { FaFilePdf, FaShieldAlt, FaUsersCog, FaBalanceScale } from "react-icons/fa";

export default function Transparencia() {
  return (
    <div className="bg-[#F7F0E8] min-h-screen pb-20">
      {/* TÍTULO */}
      <section className="bg-[#144D3A] text-white py-20 px-6 text-center shadow-md">
        <h1 className="text-4xl font-bold">Transparência</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          Compromisso institucional com ética, responsabilidade e prestação de contas.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-14">

        {/* INTRODUÇÃO */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-[#144D3A]">
            Prestação de contas em construção
          </h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto leading-relaxed">
            O Instituto Conglobal está em fase inicial de estruturação e, por isso, 
            ainda não possui relatórios financeiros ou atividades consolidadas. 
            No entanto, assumimos desde já o compromisso público de transparência, 
            governança ética e responsabilidade na gestão de todos os recursos recebidos.
            <br /><br />
            Todos os relatórios anuais, demonstrações financeiras e documentos oficiais 
            serão publicados nesta página ao final do primeiro exercício.
          </p>
        </section>

        {/* CARDS DE TRANSPARÊNCIA */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* CARD 1 – Governança */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-[#c9a23f]/30">
            <div className="text-[#144D3A] text-4xl mb-3">
              <FaUsersCog />
            </div>
            <h3 className="text-lg font-semibold text-[#144D3A]">Governança</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Estrutura organizacional, funções e responsabilidades da diretoria e dos conselhos.
            </p>
            <Link
              to="#"
              className="inline-block mt-4 text-[#C9A23F] font-medium hover:underline"
            >
              Em breve
            </Link>
          </div>

          {/* CARD 2 – Estatuto Social */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-[#c9a23f]/30">
            <div className="text-[#144D3A] text-4xl mb-3">
              <FaBalanceScale />
            </div>
            <h3 className="text-lg font-semibold text-[#144D3A]">Estatuto Social</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Documento oficial que rege as diretrizes e finalidades do Instituto Conglobal.
            </p>
            <a
              href="/pdf/estatuto-instituto.pdf"
              className="inline-flex items-center gap-2 mt-4 text-[#C9A23F] font-medium hover:underline"
            >
              <FaFilePdf /> Visualizar PDF
            </a>
          </div>

          {/* CARD 3 – Política de Integridade */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-[#c9a23f]/30">
            <div className="text-[#144D3A] text-4xl mb-3">
              <FaShieldAlt />
            </div>
            <h3 className="text-lg font-semibold text-[#144D3A]">Integridade e Ética</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Compromisso com boas práticas, gestão ética e prevenção de irregularidades.
            </p>
            <Link
              to="#"
              className="inline-block mt-4 text-[#C9A23F] font-medium hover:underline"
            >
              Política em desenvolvimento
            </Link>
          </div>

        </section>

        {/* AVISO FINAL */}
        <section className="text-center mt-12">
          <p className="text-gray-700 max-w-2xl mx-auto">
            Assim que os primeiros projetos forem executados e os primeiros recursos captados, 
            os relatórios serão publicados com total transparência conforme as boas práticas 
            do Terceiro Setor no Brasil.
          </p>
        </section>
      </div>
    </div>
  );
}
