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
import Receita from "./pages/Receita/IAReceitas";
import AssistenteCompleto from './pages/Receita/AssistenteCompleto';
import AvaliarReceita from './pages/Receita/AvaliarReceita';


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
    <NavMenu />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redirect_cardapio/" element={<CardapioCongolinaria />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/receitas" element={<Receita />} />
<Route path="/assistente-completo" element={<AssistenteCompleto />} />
<Route path="/avaliar-receita" element={<AvaliarReceita />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cardapio" element={<AdminCardapio />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
