import React, { useState, useRef, useContext, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './i18n';


import ThemeContextProvider, { ThemeContext } from "./Context/ThemeContext";

// ---- Páginas confirmadas ----
import Home from "./pages/Home/HomePageTailwind";
import Cardapio from "./pages/Cardapio/CardapioCongolinaria";
import AdminCardapio from "./pages/Cardapio/PainelCardapioAdmin";
import Cadastrar from "./pages/Cadastrar";
import Receita from "./pages/Receita/IAReceitas";
import RecettesCategory from "./pages/RecettesCategory/RecettesCategory";
import PainelReceitasAutorais from "./pages/Receita/PainelReceitasAutorais";
import PainelPratosPopulares from "./pages/Admin/PainelPratosPopulares";

import CardapioCOP30 from "./pages/Cardapio/CardapioCOP30";
import PainelPedidosCOP30 from "./pages/Cardapio/PainelPedidosCOP30";
import PainelGarcomCOP30 from "./pages/Cardapio/PainelGarcomCOP30";
import PainelGarcomPedidos from "./pages/Cardapio/PainelGarcomPedidos";
import FecharPedidoGarcom from "./pages/Cardapio/FecharPedidoGarcom";
import PainelCaixaCOP30 from "./pages/Cardapio/PainelCaixaCOP30";
import PainelAdminCop30 from "./pages/Cardapio/PainelAdminCop30";
import PainelHeroAdmin from "./pages/Home/PainelHeroAdmin";
import PainelPopupAdmin from "./pages/Popup/PainelPopupAdmin"


import Checkout from "./pages/Cardapio/Checkout";
import Sacola from "./pages/Sacola/Sacola";



import NotFound from "./pages/NotFound/NotFound";
import Admin from "./pages/Admin/admin";
import Login from "./pages/Login/Login";
import RegisterUser from "./pages/RegisterUser";

import Protected from "./Protected";

// ---- Redux actions ----
import { getNotesFromAPI } from "./pages/Notes/notes";
import { getRecettesFromAPI } from "./pages/Recettes/recettesReducer";



import CardapioCongolinaria from "./pages/Cardapio/CardapioCongolinaria";

import Carrinho from "./pages/Carrinho/Carrinho";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Footer from "./composant/Footer/Footer";
import NavMenu from "./composant/navMenu/NavMenu";

import AssistenteCompleto from './pages/Receita/AssistenteCompleto';
import AvaliarReceita from './pages/Receita/AvaliarReceita';

import AppEstoque from './pages/Estoque/AppEstoque';
import Estoque from './pages/Estoque/Estoque';
import HistoricoMovimentacao from './pages/Estoque/HistoricoMovimentacao';
import Relatorios from './pages/Estoque/Relatorios';
import DetalhePratoCOP30 from './pages/Cardapio/DetalhePratoCOP30';

import IAReceitas from "./pages/Receita/IAReceitas";
import PedidoConcluido from "./pages/Cardapio/PedidoConcluido";
import PedidoPendente from "./pages/Cardapio/PedidoPendente";
import PedidoFalhou from "./pages/Cardapio/PedidoFalhou";
import PainelAdminFrete from "./pages/Cardapio/PainelAdminFrete";

// Páginas do INSTITUTO
import HomeInstituto from "./pages/Instituto/HomeInstituto";
import QuemSomos from "./pages/Instituto/QuemSomos";
import Programas from "./pages/Instituto/Programas";
import CentroCultural from "./pages/Instituto/CentroCultural";
import Transparencia from "./pages/Instituto/Transparencia";
import Doe from "./pages/Instituto/Doe";
import Parcerias from "./pages/Instituto/Parcerias";
import Noticias from "./pages/Instituto/Noticias";
import InstitutoLayout from "./layouts/InstitutoLayout";
import InscricoesIdioma from "./pages/Instituto/InscricoesIdioma";



function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const navigate = useNavigate();

  // Carrega notes uma única vez
  useEffect(() => {
    if (!notes.list) dispatch(getNotesFromAPI());
  }, [dispatch, notes]);

  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Mostrar NavMenu somente fora do Instituto */}
{!window.location.pathname.startsWith("/instituto") && <NavMenu />}


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
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/sacola" element={<Sacola />} />
          <Route path="/cardapio-congelados" element={<CardapioCOP30 />} />
          <Route path="/prato/:id" element={<DetalhePratoCOP30 />} />
          <Route path="/receitas" element={<IAReceitas />} />
          <Route path="/checkout" element={<Checkout />} />
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
          <Route path="/admin/popup" element={
            <Protected>
              <PainelPopupAdmin />
            </Protected>

          } />
          <Route path="/admin/pratos-populares" element={<Protected><PainelPratosPopulares /></Protected>} />
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

          <Route
            path="/admin/painel-pedidos-cop30"
            element={
              <Protected>
                <PainelPedidosCOP30 />
              </Protected>
            }
          />
          <Route path="/admin/painel-hero-admin" element={<Protected>< PainelHeroAdmin /></Protected>} />
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
          <Route path="/admin/frete" element={
            <Protected>
              <PainelAdminFrete />
            </Protected>

          } />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />



        {/* 🌿 ROTAS DO INSTITUTO – TODAS DENTRO DO MESMO LAYOUT */}
        <Route path="/instituto" element={<InstitutoLayout />}>
          {/* /instituto -> HomeInstituto */}
          <Route index element={<HomeInstituto />} />

          {/* /instituto/quem-somos */}
          <Route path="quem-somos" element={<QuemSomos />} />

          {/* /instituto/programas */}
          <Route path="programas" element={<Programas />} />

          {/* /instituto/centro-cultural */}
          <Route path="centro-cultural" element={<CentroCultural />} />

          {/* /instituto/transparencia */}
          <Route path="transparencia" element={<Transparencia />} />

          {/* /instituto/doar */}
          <Route path="doar" element={<Doe />} />

          {/* /instituto/parcerias */}
          <Route path="parcerias" element={<Parcerias />} />

          {/* /instituto/noticias */}
          <Route path="noticias" element={<Noticias />} />
          <Route path="/instituto/idiomas" element={<InscricoesIdioma />} />

        </Route>

        </Routes>
      </main>
{/* Footer só aparece fora do Instituto */}
{!window.location.pathname.startsWith("/instituto") && <Footer />}
    </div>
  );
}

export default App;
