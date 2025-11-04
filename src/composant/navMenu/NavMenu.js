import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCarrinho } from "../../redux/cartReducer";
import { getUser } from "../../redux/userReducer";
import logo from "../../assets/images/estilizado.png";
import { motion, AnimatePresence } from "framer-motion";


export default function NavMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const sacola = useSelector((state) => state.cartReducer || { items: [] });
  const usuario = useSelector((state) => state.userReducer || { items: [] });
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!sacola.items || sacola.items.length === 0) dispatch(getCarrinho());
    if (!usuario.items || usuario.items.length === 0) dispatch(getUser());
  }, [dispatch]);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setShowProfile(false);
  };
const [menuOpen, setMenuOpen] = useState(false);

  return (
   <>
<header className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
<a href="/">
<img src={logo} alt="Logo Congolinaria" className="w-15 h-12"/>
</a>


{/* Menu desktop */}
<nav className="hidden lg:flex gap-4 text-sm font-medium text-gray-700">
<a href="/" className="hover:text-yellow-600">Início</a>
<a href="/loja-congo" className="hover:text-yellow-600">Loja</a>
<a href="/redirect_cardapio/" className="hover:text-yellow-600">Cardápio</a>
<a href="/vegFest/" className="hover:text-yellow-600">VegFest 2024</a>
<a href="/receitas" className="hover:text-yellow-600">Receitas</a>
<a href="/contato" className="hover:text-yellow-600">Contato</a>
<a href="/sobre" className="hover:text-yellow-600">Sobre</a>
<a href="/blog" className="hover:text-yellow-600">Blog</a>
<a href="/#order" className="hover:text-yellow-600">Orçamento</a>
</nav>


{/* Ícone mobile */}
<button
className="lg:hidden text-2xl text-gray-700 focus:outline-none"
onClick={() => setMenuOpen(!menuOpen)}
>
<i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
</button>
</header>

<AnimatePresence>
{menuOpen && (
<motion.nav
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
className="lg:hidden bg-white shadow-md px-6 py-4 flex flex-col space-y-3 text-gray-800 font-medium z-40"
>
<a href="/" onClick={() => setMenuOpen(false)}>Início</a>
<a href="/loja-congo" onClick={() => setMenuOpen(false)}>Loja</a>
<a href="/redirect_cardapio/" onClick={() => setMenuOpen(false)}>Cardápio</a>
<a href="/vegFest/" onClick={() => setMenuOpen(false)}>VegFest 2024</a>
<a href="/receitas" onClick={() => setMenuOpen(false)}>Receitas</a>
<a href="/contato" onClick={() => setMenuOpen(false)}>Contato</a>
<a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
<a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
<a href="/#order" onClick={() => setMenuOpen(false)}>Orçamento</a>
</motion.nav>
)}
</AnimatePresence>

<main className="flex-grow">
<div className="text-center py-20">
<h1 className="text-3xl font-bold text-yellow-600">Bem-vindo ao Congolinaria</h1>
<p className="text-gray-600 mt-2">Descobrindo Sabores do Congo</p>
</div>
</main>
</>
  );
}
