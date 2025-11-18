import React, { useState } from "react";
import { MenuData } from "./MenuData";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import favicon from "./../../assets/images/logo_rouge.png";
import { HiMenuAlt2, HiX } from "react-icons/hi";

export default function SidebarPremium() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open);

  const goHome = () => navigate("/");

  // ⭐ Animação do Drawer Mobile
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const isActive = (url) => location.pathname === url;

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-red-700 text-white p-2 rounded-md shadow-xl"
      >
        {open ? <HiX size={26} /> : <HiMenuAlt2 size={26} />}
      </button>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex">
        <SidebarContent
          goHome={goHome}
          navigate={navigate}
          isActive={isActive}
        />
      </div>

      {/* MOBILE SIDEBAR (drawer animado) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-0 left-0 w-64 h-full bg-red-700 shadow-xl z-50 text-white"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <SidebarContent
              goHome={() => {
                goHome();
                setOpen(false);
              }}
              navigate={(url) => {
                navigate(url);
                setOpen(false);
              }}
              isActive={isActive}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------
   COMPONENTE INTERNO: CONTEÚDO DO SIDEBAR (REUTILIZADO EM MOBILE + DESKTOP)
------------------------------------------------------------------- */
function SidebarContent({ goHome, navigate, isActive }) {
  return (
    <div className="w-64 min-h-screen bg-red-700 text-white flex flex-col shadow-2xl">

      {/* CABEÇALHO PREMIUM */}
      <div className="flex items-center gap-3 p-5 border-b border-red-600 bg-gradient-to-r from-red-800 to-red-600">
        <motion.img
          src={favicon}
          alt="Logo"
          className="w-12 h-12 rounded-lg shadow-md object-contain"
          whileHover={{ rotate: 6, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <div>
          <h1 className="text-xl font-extrabold tracking-wide">COP30 – Admin</h1>
          <p className="text-xs text-red-100">Congolinaria Empório</p>
        </div>
      </div>

      {/* MENU PREMIUM */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-red-700/90 backdrop-blur-sm">

        {MenuData.map((item, index) => {
          const active = isActive(item.url);

          return (
            <motion.button
              key={index}
              onClick={() => navigate(item.url)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left 
                transition-all duration-300 relative
                ${
                  active
                    ? "bg-white text-red-700 font-semibold shadow-inner"
                    : "hover:bg-red-600/60"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Marcador ativo lateral */}
              {active && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-xl"
                />
              )}

              <i
                className={`${item.icone} text-lg ${
                  active ? "text-red-700" : "text-white/90"
                }`}
              ></i>

              <span className={`text-sm ${active ? "font-bold" : "font-medium"}`}>
                {item.title}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* RODAPÉ PREMIUM */}
      <footer className="p-4 border-t border-red-600 bg-red-800/40">
        <motion.button
          onClick={goHome}
          className="w-full bg-white text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Voltar ao Site
        </motion.button>
      </footer>
    </div>
  );
}
