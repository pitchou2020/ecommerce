import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/HomePageTailwind";
import CardapioCongolinaria from "./pages/Cardapio/CardapioCongolinaria";
import AdminCardapio from "./pages/Cardapio/PainelCardapioAdmin";
import Carrinho from "./pages/Carrinho/Carrinho";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Footer from "./composant/Footer/Footer";
import NavMenu from "./composant/navMenu/NavMenu";
import receita from "./pages/Receita/IAReceitas"

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <NavMenu />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<CardapioCongolinaria />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/receita" element={<receita />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cardapio" element={<AdminCardapio />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
