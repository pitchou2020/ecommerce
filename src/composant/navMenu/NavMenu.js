import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/images/estilizado.png";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import MiniCartDropdown from "./MiniCartDropdown";

export default function NavMenu() {
  const navigate = useNavigate();
  const sacola = useSelector((state) => state.cart.cartItems || []);
  const totalItens = sacola.reduce((acc, item) => acc + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

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

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo Congolinaria" className="w-15 h-12" />
        </a>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex gap-5 text-sm font-semibold text-gray-700">
          <Link to="/" className="hover:text-yellow-600">Início</Link>
          <Link to="/cardapio-congelados" className="hover:text-yellow-600">Loja</Link>
          <Link to="/redirect_cardapio/" className="hover:text-yellow-600">Cardápio</Link>
          <Link to="/vegFest/" className="hover:text-yellow-600">VegFest</Link>
          <Link to="/receitas" className="hover:text-yellow-600">Receitas</Link>
          <Link to="/contato" className="hover:text-yellow-600">Contato</Link>
          <Link to="/sobre" className="hover:text-yellow-600">Sobre</Link>
          <Link to="/blog" className="hover:text-yellow-600">Blog</Link>
           <Link to="/instituto" className="hover:text-yellow-600">Instituto</Link>
            <Link to="/hortifruti" className="hover:text-yellow-600">Hortifruti</Link>
        </nav>

        {/* Ícones */}
        <div className="flex items-center gap-4 relative" ref={cartRef}>
          {/* Sacola */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative text-gray-800 hover:text-yellow-600 transition"
          >
            <ShoppingBag size={28} />
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

          {/* Ícone Mobile */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white shadow-md px-5 py-5 flex flex-col gap-4 text-gray-700 text-base font-medium"
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
            <Link to="/cardapio-congelados" onClick={() => setMenuOpen(false)}>Loja</Link>
            <Link to="/redirect_cardapio/" onClick={() => setMenuOpen(false)}>Cardápio</Link>
            <Link to="/vegFest/" onClick={() => setMenuOpen(false)}>VegFest</Link>
            <Link to="/receitas" onClick={() => setMenuOpen(false)}>Receitas</Link>
            <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
            <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
             <Link to="/instituto" onClick={() => setMenuOpen(false)}>Instituto</Link>
             <Link to="/hortifruti" onClick={() => setMenuOpen(false)}>Hortifruti</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
