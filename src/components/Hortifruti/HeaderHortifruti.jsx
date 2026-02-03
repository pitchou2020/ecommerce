import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/images/estilizado.png";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import MiniCartDropdown from "./MiniCartDropdown";

export default function HeaderHortifruti() {
  const sacola = useSelector((state) => state.cart.cartItems || []);
  const totalItens = sacola.reduce((acc, item) => acc + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false); // (você já usa isso)
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  const [open, setOpen] = useState(false); // menu mobile (você já usa isso)
  const [scrolled, setScrolled] = useState(false);

  const [categorias, setCategorias] = useState([]);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  // Fecha dropdown da sacola ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Carrega categorias do banco
  useEffect(() => {
    const url = "https://congolinaria.com.br/api/hortifruti_categorias.php"; // <- ajuste se seu endpoint for outro

    axios
      .get(url)
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        const norm = arr
          .map((c) => ({
            id: Number(c.id ?? c.categoria_id ?? 0),
            nome: String(c.nome ?? c.titulo ?? c.categoria ?? "").trim(),
            slug: String(c.slug ?? "").trim(),
            ordem: Number(c.ordem ?? 0),
          }))
          .filter((c) => c.id > 0 && c.nome);

        // ordena se vier ordem, senão por nome
        norm.sort((a, b) => {
          if (a.ordem && b.ordem) return a.ordem - b.ordem;
          return a.nome.localeCompare(b.nome, "pt-BR");
        });

        setCategorias(norm);
      })
      .catch(() => {
        // fallback (se endpoint ainda não existir)
        setCategorias([
          { id: 1, nome: "Legumes" },
          { id: 2, nome: "Verduras" },
          { id: 6, nome: "Frutas" },
          { id: 3, nome: "Temperos" },
          { id: 4, nome: "Cogumelos" },
          { id: 5, nome: "Castanhas e Grãos" },
        ]);
      });
  }, []);

  // ✅ NavLinks gerados a partir das categorias
  const navLinks = useMemo(() => {
    const links = [{ to: "/hortifruti", label: "Início" }];

    categorias.forEach((c) => {
      links.push({
        to: `/hortifruti?cat=${c.id}`,
        label: c.nome,
      });
    });

    return links;
  }, [categorias]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg ${
        scrolled ? "bg-[#144D3A]/80 shadow-xl" : "bg-[#144D3A]/95 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between transition-all duration-300">
        {/* LOGO */}
        <Link to="/hortifruti" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Hortifruti Conglobal"
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
                to={item.to}
                end={item.to === "/hortifruti"}
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
        </div>

        {/* Ícones + Mobile */}
        <div className="flex items-center gap-4 relative" ref={cartRef}>
          {/* Sacola */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative hover:text-yellow-600 transition"
          >
            <ShoppingBag size={28} color="white" />
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItens}
              </span>
            )}
          </button>

          {/* Dropdown da sacola */}
          <AnimatePresence>
            {showCart && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3"
              >
                <MiniCartDropdown onClose={() => setShowCart(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão Mobile */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden bg-[#0f3a2a]/95 backdrop-blur-md text-white px-6 py-4 w-full transition-all duration-300 ease-in-out ${
          open
            ? "max-h-[700px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col gap-5 text-sm font-medium">
          {navLinks.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              end={item.to === "/hortifruti"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `transition py-1 ${
                  isActive ? "text-[#C9A23F]" : "text-white"
                } hover:text-[#C9A23F]`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
