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


function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const recettes = useSelector((state) => state.recettesReducer);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // ---- Inicialização ----
  useEffect(() => {
    if (!notes.list) dispatch(getNotesFromAPI());
  }, [dispatch, notes]);

  // ---- Controle de modais e estados simples ----
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [dataComment, setDataComment] = useState([]);

  const windowWidth = useRef(window.innerWidth);

  // ---- Funções auxiliares ----
  const toggleModal = () => setShowModal(!showModal);
  const toggleModalLogin = () => setShowModalLogin(!showModalLogin);
  const toggleModalRegister = () => setShowModalRegister(!showModalRegister);

  const getComments = async (id_recettes) => {
    try {
      const response = await fetch(
        `http://localhost/RestoAfrica/src/views/single_recette_coment.php?id=${id_recettes}`
      );
      const data = await response.json();
      setDataComment(data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  // ---- Rotas ----
  return (

    <div className="flex flex-col min-h-screen bg-white text-gray-900">
    <NavMenu />

      <main className="flex-grow">
    <ThemeContextProvider>
      
      <Routes>
        {/* Página inicial */}
        <Route
          path="/"
          element={
            <Home
              modal={showModalLogin}
              func2={toggleModalLogin}
              win={windowWidth.current}
              sidebar={showSidebar}
              toggleModal={toggleModal}
              showModal={showModal}
            />
          }
        />
        <Route path="/admin/estoque" element={<AppEstoque />}>
          <Route index element={<Estoque />} />
          <Route path="historico" element={<HistoricoMovimentacao />} />
          <Route path="relatorio" element={<Relatorios />} />
        </Route>
        <Route path="/admin/pratos-populares" element={<PainelPratosPopulares />} />
        {/* Cardápio público */}
        <Route path="/redirect_cardapio" element={<Cardapio />} />
        <Route path="/painel-receitas-autorais" element={<PainelReceitasAutorais/>}/>

        {/* Painel do cardápio (admin) */}
        <Route
          path="/admin/cardapio"
          element={
            <Protected>
              <AdminCardapio />
            </Protected>
          }
        />

     

        {/* Cadastro e login */}
        <Route path="/register" element={<RegisterUser />} />
        <Route
          path="/login"
          element={
            <ThemeContextProvider>
              <Login
                isLogin={false}
                statusLogin={{}}
                valorEmail={() => {}}
                valorSenha={() => {}}
                funcRegister={() => navigate("/register")}
              />
            </ThemeContextProvider>
          }
        />

        {/* Páginas auxiliares */}
        <Route path="/cadastro" element={<Cadastrar sidebar={showSidebar} />} />
        <Route path="/receita/:slug" element={<Receita />} />
        <Route path="/recettesCategory/:slug" element={<RecettesCategory />} />

        {/* Painel Admin geral */}
        <Route
          path="/admin"
          element={
            <Protected>
              <Admin sidebar={showSidebar} toggleModal={toggleModal} showModal={showModal} />
            </Protected>
          }
        />

       

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} />
          <Route path="/redirect_cardapio/" element={<CardapioCongolinaria />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/receitas" element={<Receita />} />
<Route path="/assistente-completo" element={<AssistenteCompleto />} />
<Route path="/avaliar-receita" element={<AvaliarReceita />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cardapio" element={<AdminCardapio />} />
          <Route path="cardapio-congelados" element={<CardapioCOP30 />} />
          <Route path="/sacola" element={<Sacola />} />
          <Route path="/prato/:id" element={<DetalhePratoCOP30 />} />
          
          <Route path="admin/painel-pedidos-cop30" element={<PainelPedidosCOP30 />} />
          <Route path="admin/painel-garcom-cop30" element={<PainelGarcomCOP30 />} />
          <Route path="admin/painel-garcom-pedidos" element={<PainelGarcomPedidos />} />
          <Route path="admin/painel-admin-cop30" element = {<PainelAdminCop30 />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="fechar-pedido-garçom" element={<FecharPedidoGarcom/>}/>
          <Route path="painel-caixa" element = {<PainelCaixaCOP30 />} />
          

      </Routes>
      
    </ThemeContextProvider>
    </main>

      <Footer />
    </div>
  );
}

export default App;
