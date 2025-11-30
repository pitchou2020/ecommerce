import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function HeaderInstituto() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/instituto", label: "Início" },
    { path: "/instituto/quem-somos", label: "Quem Somos" },
    { path: "/instituto/programas", label: "Programas" },
    { path: "/instituto/centro-cultural", label: "Centro Cultural" },
    { path: "/instituto/interpretacao", label: "Intérpretes" },
    { path: "/instituto/investir-no-brasil", label: "Investir no Brasil" },
    { path: "/instituto/transparencia", label: "Transparência" },
    { path: "/instituto/noticias", label: "Notícias" },
    { path: "/instituto/parcerias", label: "Parcerias" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg ${
        scrolled ? "bg-[#144D3A]/80 shadow-xl" : "bg-[#144D3A]/95 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between transition-all duration-300">

        {/* LOGO (com efeito shrink) */}
        <Link to="/instituto" className="flex items-center gap-3">
          <img
            src="/images/logo-instituto1.png"
            alt="Instituto Congolinaria"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-9" : "h-11"
            }`}
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-4">

          <nav className="flex gap-8 text-sm font-medium">
            {navLinks.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
  `transition font-medium ${
    isActive ? "text-[#C9A23F]" : "text-white"
  } hover:text-[#C9A23F]`
}

              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* DOAR */}
          <Link
            to="/instituto/doar"
            className="px-5 py-2 bg-[#C9A23F] text-[#144D3A] rounded-full font-semibold text-sm hover:bg-[#e2c35c] transition shadow-md"
          >
            Doe Agora
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden text-white text-3xl"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* MOBILE MENU (animado) */}
      <div
        className={`lg:hidden bg-[#0f3a2a]/95 backdrop-blur-md text-white px-6 py-4 w-full transition-all duration-300 ease-in-out ${
          open
            ? "max-h-[600px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
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
