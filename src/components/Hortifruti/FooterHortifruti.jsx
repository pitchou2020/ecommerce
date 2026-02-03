import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/images/estilizado.png";

export default function FooterHortifruti() {

  const navLinks = [
    { path: "/Hortifruti", label: "Início" },
    { path: "/Hortifruti/legumes", label: "Legumes" },
    { path: "/Hortifruti/verduras", label: "Verduras" },
    { path: "/Hortifruti/temperos", label: "Temperos" },
    { path: "/Hortifruti/cogumelos", label: "Cogumelos" },
    { path: "/Hortifruti/castanhas-grãos", label: "Castanhas e Grãos" },
     { path: "/Hortifruti/frutas", label: "Frutas" },
  
  ];
  return (
    <footer className="bg-[#144D3A] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">

        {/* COLUNA 1 */}
        <div>
          <img
            src={logo}
            className="h-12 mb-3"
            alt="Hortifruti Congolinaria"
          />
          <p className="text-sm text-[#E5E7EB]">
            Alimentar o corpo, celebrar a cultura, fortalecer o povo.
          </p>
          <p className="text-xs mt-3 text-[#C9A23F]">
            CNPJ do Congolinaria Emporio: 00.000.000/0001-00  
          </p>
        </div>

        {/* COLUNA 2 */}
        <div>
          <h3 className="font-semibold mb-3 text-[#C9A23F] text-sm">
            Acesso Rápido
          </h3>

            <ul className="space-y-2 text-sm">
  {navLinks.map((item, i) => (
    <li key={i}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `transition font-medium ${
            isActive ? "text-[#C9A23F]" : "text-white"
          } hover:text-[#C9A23F]`
        }
      >
        {item.label}
      </NavLink>
    </li>
  ))}
</ul>

        </div>

        {/* COLUNA 3 */}
        <div>
          <h3 className="font-semibold mb-3 text-[#C9A23F] text-sm">
            Contato
          </h3>
          <p className="text-sm">
            Email: <span className="text-[#C9A23F]">hortifruti@congolinaria.com.br</span>
          </p>
          <p className="text-sm mt-1">Telefone/WhatsApp: (11) 980451471</p>
        </div>
      </div>

      <div className="bg-[#0A2A1F] text-center py-3 text-xs text-[#C9A23F]">
        © {new Date().getFullYear()} Hortifruti congolinaria — Todos os direitos reservados.
      </div>
    </footer>
  );
}
