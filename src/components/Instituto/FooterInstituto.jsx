import React from "react";
import { Link } from "react-router-dom";

export default function FooterInstituto() {
  return (
    <footer className="bg-[#144D3A] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">

        {/* COLUNA 1 */}
        <div>
          <img
            src="/img/instituto/logo-instituto.png"
            className="h-12 mb-3"
            alt="Instituto Congolinaria"
          />
          <p className="text-sm text-[#E5E7EB]">
            Alimentar o corpo, celebrar a cultura, fortalecer o povo.
          </p>
          <p className="text-xs mt-3 text-[#C9A23F]">
            CNPJ do Instituto: 00.000.000/0001-00  
          </p>
        </div>

        {/* COLUNA 2 */}
        <div>
          <h3 className="font-semibold mb-3 text-[#C9A23F] text-sm">
            Acesso Rápido
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/instituto">Início</Link></li>
            <li><Link to="/instituto/quem-somos">Quem Somos</Link></li>
            <li><Link to="/instituto/programas">Programas</Link></li>
            <li><Link to="/instituto/centro-cultural">Centro Cultural</Link></li>
            <li><Link to="/instituto/transparencia">Transparência</Link></li>
            <li><Link to="/instituto/parcerias">Parcerias</Link></li>
          </ul>
        </div>

        {/* COLUNA 3 */}
        <div>
          <h3 className="font-semibold mb-3 text-[#C9A23F] text-sm">
            Contato
          </h3>
          <p className="text-sm">
            Email: <span className="text-[#C9A23F]">instituto@congolinaria.com.br</span>
          </p>
          <p className="text-sm mt-1">Telefone/WhatsApp: (11) 90000-0000</p>
        </div>
      </div>

      <div className="bg-[#0A2A1F] text-center py-3 text-xs text-[#C9A23F]">
        © {new Date().getFullYear()} Instituto Congolinaria — Todos os direitos reservados.
      </div>
    </footer>
  );
}
