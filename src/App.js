import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./i18n";

import ThemeContextProvider, { ThemeContext } from "./Context/ThemeContext";

// ---- Páginas confirmadas ----
import Home from "./pages/Home/HomePageTailwind";
import Cardapio from "./pages/Cardapio/CardapioCongolinaria";
import AdminCardapio from "./pages/Cardapio/PainelCardapioAdmin";
import PainelAdminHortifruti from "./pages/Cardapio/PainelAdminHortifruti";

import Cadastrar from "./pages/Cadastrar";
import Receita from "./pages/Receita/IAReceitas";
import RecettesCategory from "./pages/RecettesCategory/RecettesCategory";
import PainelReceitasAutorais from "./pages/Receita/PainelReceitasAutorais";
import PainelPratosPopulares from "./pages/Admin/PainelPratosPopulares";

import CardapioCOP30 from "./pages/Cardapio/CardapioCOP30";
import PainelPedidosCOP30 from "./pages/Cardapio/PainelPedidosCOP30";
import PainelPedidosHortifruti from "./pages/Cardapio/PainelPedidosHortifruti";
import PainelGarcomCOP30 from "./pages/Cardapio/PainelGarcomCOP30";
import PainelGarcomPedidos from "./pages/Cardapio/PainelGarcomPedidos";
import FecharPedidoGarcom from "./pages/Cardapio/FecharPedidoGarcom";
import PainelCaixaCOP30 from "./pages/Cardapio/PainelCaixaCOP30";
import PainelAdminCop30 from "./pages/Cardapio/PainelAdminCop30";
import PainelHeroAdmin from "./pages/Home/PainelHeroAdmin";
import PainelPopupAdmin from "./pages/Popup/PainelPopupAdmin";

import Checkout from "./pages/Cardapio/Checkout";
import CheckoutHortifruti from "./pages/Cardapio/CheckoutHortifruti";
import Sacola from "./pages/Sacola/Sacola";
import SacolaHortifruti from "./pages/Sacola/SacolaHortifruti";

import NotFound from "./pages/NotFound/NotFound";
import Admin from "./pages/Admin/admin";
import Login from "./pages/Login/Login";
import RegisterUser from "./pages/RegisterUser";

import Protected from "./Protected";

// ---- Redux actions ----
import { getNotesFromAPI } from "./pages/Notes/notes";

// Layouts
import InstitutoLayout from "./layouts/InstitutoLayout";
import HortifrutiLayout from "./layouts/HortifrutiLayout";

// Instituto
import HomeInstituto from "./pages/Instituto/HomeInstituto";
import QuemSomos from "./pages/Instituto/QuemSomos";
import Programas from "./pages/Instituto/Programas";
import CentroCultural from "./pages/Instituto/CentroCultural";
import Transparencia from "./pages/Instituto/Transparencia";
import Doe from "./pages/Instituto/Doe";
import Parcerias from "./pages/Instituto/Parcerias";
import Noticias from "./pages/Instituto/Noticias";

import InscricoesIdioma from "./pages/Instituto/InscricoesIdioma";
import CadastroImigrante from "./pages/Instituto/CadastroImigrante";
import CadastroVoluntario from "./pages/Instituto/CadastroVoluntario";
import PainelImigrantes from "./pages/Instituto/PainelImigrantes";
import PainelVoluntarios from "./pages/Instituto/PainelVoluntarios";
import Interpretacao from "./pages/Instituto/Interpretacao";
import InvestirNoBrasil from "./pages/Instituto/InvestirNoBrasil";

// Outras
import AssistenteCompleto from "./pages/Receita/AssistenteCompleto";
import AvaliarReceita from "./pages/Receita/AvaliarReceita";
import IAReceitas from "./pages/Receita/IAReceitas";
import PedidoConcluido from "./pages/Cardapio/PedidoConcluido";
import PedidoPendente from "./pages/Cardapio/PedidoPendente";
import PedidoFalhou from "./pages/Cardapio/PedidoFalhou";
import PainelAdminFrete from "./pages/Cardapio/PainelAdminFrete";

import Etiquetas from "./pages/Etiquetas/Etiquetas";

// Hortifruti público
import Hortifruti from "./pages/Cardapio/Hortifruti";
import DetalheProdutoHortifruti from "./pages/Cardapio/DetalheProdutoHortifruti";

// UI
import Footer from "./composant/Footer/Footer";
import NavMenu from "./composant/navMenu/NavMenu";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  // Carrega notes uma única vez
  useEffect(() => {
    if (!notes.list) dispatch(getNotesFromAPI());
  }, [dispatch, notes]);

  // ✅ controle correto de exibição por rota
  const path = window.location.pathname;
  const isInstituto = path.startsWith("/instituto");
  const isHortifruti = path.startsWith("/hortifruti");

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* ✅ NavMenu fora do Instituto (e opcionalmente fora do Hortifruti) */}
      {!isInstituto && !isHortifruti && <NavMenu />}

      <main className="flex-grow">
        <Routes>
          {/* PÁGINAS PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/redirect_cardapio" element={<Cardapio />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/receita/:slug" element={<Receita />} />
          <Route path="/recettesCategory/:slug" element={<RecettesCategory />} />
          <Route path="/assistente-completo" element={<AssistenteCompleto />} />
          <Route path="/avaliar-receita" element={<AvaliarReceita />} />
          <Route path="/sacola" element={<Sacola />} />
          <Route path="/sacola-hortifruti" element={<SacolaHortifruti />} />

          <Route path="/cardapio-congelados" element={<CardapioCOP30 />} />
          <Route path="/receitas" element={<IAReceitas />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-hortifruti" element={<CheckoutHortifruti />} />

          <Route path="/pedido-concluido" element={<PedidoConcluido />} />
          <Route path="/pedido-pendente" element={<PedidoPendente />} />
          <Route path="/pedido-falhou" element={<PedidoFalhou />} />

          {/* ADMIN GERAL */}
          <Route
            path="/admin"
            element={
              <Protected>
                <Admin />
              </Protected>
            }
          />

          <Route
            path="/admin/popup"
            element={
              <Protected>
                <PainelPopupAdmin />
              </Protected>
            }
          />

          <Route
            path="/admin/pratos-populares"
            element={
              <Protected>
                <PainelPratosPopulares />
              </Protected>
            }
          />

          {/* PAINEL ADMIN CARDÁPIO */}
          <Route
            path="/admin/cardapio"
            element={
              <Protected>
                <AdminCardapio />
              </Protected>
            }
          />

          {/* COP30 - PROTEGIDOS */}
          <Route
            path="/admin/painel-admin-cop30"
            element={
              <Protected>
                <PainelAdminCop30 />
              </Protected>
            }
          />

          {/* ✅ ADMIN HORTIFRUTI */}
          <Route
            path="/admin/painel-admin-hortifruti"
            element={
              <Protected>
                <PainelAdminHortifruti />
              </Protected>
            }
          />

          {/* ✅ PAINEL PEDIDOS COP30 */}
          <Route
            path="/admin/painel-pedidos-cop30"
            element={
              <Protected>
                <PainelPedidosCOP30 />
              </Protected>
            }
          />

          {/* ✅ PAINEL PEDIDOS HORTIFRUTI (AQUI) */}
          <Route
            path="/admin/painel-pedidos-hortifruti"
            element={
              <Protected>
                <PainelPedidosHortifruti />
              </Protected>
            }
          />

          <Route
            path="/admin/painel-hero-admin"
            element={
              <Protected>
                <PainelHeroAdmin />
              </Protected>
            }
          />

          <Route
            path="/admin/painel-garcom-cop30"
            element={
              <Protected>
                <PainelGarcomCOP30 />
              </Protected>
            }
          />

          <Route
            path="/admin/painel-garcom-pedidos"
            element={
              <Protected>
                <PainelGarcomPedidos />
              </Protected>
            }
          />

          <Route
            path="/painel-caixa"
            element={
              <Protected>
                <PainelCaixaCOP30 />
              </Protected>
            }
          />

          <Route
            path="/admin/frete"
            element={
              <Protected>
                <PainelAdminFrete />
              </Protected>
            }
          />

          {/* INSTITUTO */}
          <Route path="/instituto" element={<InstitutoLayout />}>
            <Route index element={<HomeInstituto />} />
            <Route path="quem-somos" element={<QuemSomos />} />
            <Route path="programas" element={<Programas />} />
            <Route path="centro-cultural" element={<CentroCultural />} />
            <Route path="transparencia" element={<Transparencia />} />
            <Route path="doar" element={<Doe />} />
            <Route path="parcerias" element={<Parcerias />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="idiomas" element={<InscricoesIdioma />} />
            <Route path="imigrante" element={<CadastroImigrante />} />
            <Route path="voluntario" element={<CadastroVoluntario />} />
            <Route path="interpretacao" element={<Interpretacao />} />
            <Route path="investir-no-brasil" element={<InvestirNoBrasil />} />
          </Route>

          {/* ETIQUETAS */}
          <Route path="/etiquetas" element={<Etiquetas />} />

          {/* HORTIFRUTI PÚBLICO (LAYOUT) */}
          <Route path="/hortifruti" element={<HortifrutiLayout />}>
            <Route index element={<Hortifruti />} />
            <Route path="produto/:id" element={<DetalheProdutoHortifruti />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* ✅ Footer só aparece fora do Instituto e fora do Hortifruti */}
      {!isInstituto && !isHortifruti && <Footer />}
    </div>
  );
}

export default App;
