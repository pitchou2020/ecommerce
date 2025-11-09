import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/images/estilizado.png";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import MiniCartDropdown from "./MiniCartDropdown";

export default function NavMenu() {
  const navigate = useNavigate();
  const sacola = useSelector((state) => state.cart.cartItems || []);
  const totalItens = sacola.reduce((acc, item) => acc + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  // Fecha dropdown ao clicar fora
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
        <nav className="hidden lg:flex gap-4 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-yellow-600">Início</a>
          <a href="/loja-congo" className="hover:text-yellow-600">Loja</a>
          <a href="/redirect_cardapio/" className="hover:text-yellow-600">Cardápio</a>
          <a href="/vegFest/" className="hover:text-yellow-600">VegFest</a>
          <a href="/receitas" className="hover:text-yellow-600">Receitas</a>
          <a href="/contato" className="hover:text-yellow-600">Contato</a>
          <a href="/sobre" className="hover:text-yellow-600">Sobre</a>
          <a href="/blog" className="hover:text-yellow-600">Blog</a>
        </nav>

        {/* Ícones */}
        <div className="flex items-center gap-4 relative" ref={cartRef}>
          {/* 🛍️ Sacola */}
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

          {/* Dropdown */}
          <AnimatePresence>
            {showCart && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MiniCartDropdown onClose={() => setShowCart(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ícone mobile */}
          <button
            className="lg:hidden text-2xl text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </header>
    </>
  );
}
