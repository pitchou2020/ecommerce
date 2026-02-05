import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/images/variacao_estilizada.png";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import MiniCartDropdown from "./MiniCartDropdown";
import { selectCarrinhoPorCanal } from "../../redux/cartReducer";

export default function HeaderHortifruti() {
  const sacola = useSelector((state) => selectCarrinhoPorCanal(state, "hortifruti"));
  const totalItens = sacola.reduce((acc, item) => acc + Number(item.quantity || 1), 0);

  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  // Fecha dropdown da sacola ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setShowCart(false);
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
    const url = "https://congolinaria.com.br/api/hortifruti_categorias.php";

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

        norm.sort((a, b) => {
          if (a.ordem && b.ordem) return a.ordem - b.ordem;
          return a.nome.localeCompare(b.nome, "pt-BR");
        });

        setCategorias(norm);
      })
      .catch(() => {
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
    categorias.forEach((c) => links.push({ to: `/hortifruti?cat=${c.id}`, label: c.nome }));
    return links;
  }, [categorias]);

  // ✅ Altura do header para NÃO esconder conteúdo da página
  // (ajuste se quiser: 76/84)
  const headerHeight = scrolled ? 72 : 84;

  return (
    <>
      <header
        style={{ height: headerHeight }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg ${
          scrolled ? "bg-[#144D3A]/80 shadow-xl" : "bg-[#144D3A]/95 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link to="/hortifruti" className="flex items-center">
            <img
              src={logo}
              alt="Hortifruti Congolinaria"
              className={`object-contain transition-all duration-300 ${
                scrolled ? "h-9" : "h-11"
              }`}
            />
          </Link>

          {/* DESKTOP MENU (central) */}
          <div className="hidden lg:flex flex-1 justify-center px-10">
            <nav className="flex gap-8 text-sm font-medium whitespace-nowrap">
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

          {/* Ícones + Mobile (direita) */}
          <div
            className="flex items-center justify-end gap-6 relative min-w-[120px] lg:min-w-[160px]"
            ref={cartRef}
          >
            {/* Sacola */}
            <button
              onClick={() => setShowCart((v) => !v)}
              className="relative hover:text-yellow-600 transition p-2 rounded-lg hover:bg-white/10"
              aria-label="Abrir sacola"
            >
              <ShoppingBag size={28} color="white" />
              {totalItens > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
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
                  className="absolute right-0 top-full mt-3"
                >
                  <MiniCartDropdown
                    canal="hortifruti"
                    onClose={() => setShowCart(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão Mobile */}
            <button
              className="lg:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-white/10"
              onClick={toggleMenu}
              aria-label="Abrir menu"
            >
              {open ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden bg-[#0f3a2a]/95 backdrop-blur-md text-white px-6 transition-all duration-300 ease-in-out ${
            open
              ? "max-h-[700px] opacity-100 translate-y-0 py-4"
              : "max-h-0 opacity-0 -translate-y-4 overflow-hidden py-0"
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

      {/* ✅ Espaçador: empurra o conteúdo para baixo do header fixo */}
      <div style={{ height: headerHeight }} />
    </>
  );
}
