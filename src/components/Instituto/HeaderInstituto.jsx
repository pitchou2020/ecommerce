import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function HeaderInstituto() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { path: "/instituto", label: "Início" },
    { path: "/instituto/quem-somos", label: "Quem Somos" },
    { path: "/instituto/programas", label: "Programas e Projetos" },
    { path: "/instituto/centro-cultural", label: "Centro Cultural" },
    { path: "/instituto/transparencia", label: "Transparência" },
    { path: "/instituto/noticias", label: "Notícias" },
    { path: "/instituto/parcerias", label: "Parcerias" },
  ];

  return (
    <header className="bg-[#144D3A] text-white shadow-md border-b border-[#0d3a2a] relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO + NOME */}
        <Link to="/instituto" className="flex items-center gap-3">
          <img
            src="/img/instituto/logo-instituto.png"
            alt="Instituto Congolinaria"
            className="h-11 w-auto object-contain"
          />
          <span className="font-semibold text-lg tracking-wide whitespace-nowrap">
            Instituto Congolinaria
          </span>
        </Link>

    
  {/* MENU + BOTÃO (lado direito) */}
<div className="hidden lg:flex items-center gap-2">

  {/* MENU */}
  <nav className="flex gap-8 text-sm font-medium">
    {navLinks.map((item, i) => (
      <NavLink
        key={i}
        to={item.path}
        className={({ isActive }) =>
          `hover:text-[#C9A23F] transition ${isActive ? "text-[#C9A23F]" : ""}`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>

  {/* BOTÃO DOAR */}
  <Link
    to="/instituto/doar"
    className="px-5 py-2 bg-[#C9A23F] text-[#144D3A] rounded-full font-semibold text-sm hover:bg-[#e2c35c] transition shadow-md"
  >
    Doe Agora
  </Link>
</div>



        {/* BOTÃO MOBILE */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* MENU MOBILE (slide down) */}
<div
  className={`lg:hidden bg-[#0f3a2a] text-white px-6 py-4 absolute top-full left-0 w-full shadow-md transition-all duration-300 ease-in-out ${
    open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
  }`}
>
  <nav className="flex flex-col gap-5 text-sm font-medium">

    {navLinks.map((item, i) => (
      <NavLink
        key={i}
        to={item.path}
        onClick={closeMenu}
        className="hover:text-[#C9A23F] transition py-1"
      >
        {item.label}
      </NavLink>
    ))}

    <Link
      to="/instituto/doar"
      onClick={closeMenu}
      className="mt-4 px-5 py-2 w-max bg-[#C9A23F] text-[#144D3A] rounded-full font-semibold text-sm shadow-md"
    >
      Doe Agora
    </Link>
  </nav>
</div>

    </header>
  );
}
