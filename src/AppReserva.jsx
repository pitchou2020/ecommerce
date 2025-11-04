
import { Routes, Route, useParams } from "react-router-dom"
import React, { useState, useRef, useContext, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import ThemeContextProvider from "./Context/ThemeContext";
import Cardapio from "./pages/Cardapio/CardapioCongolinaria";
import CardapioEvento from "./pages/Cardapio/CardapioEvento";
import AdminCardapio from "./pages/Cardapio/PainelCardapioAdmin";
import Recette from "./pages/Recettes/IAReceitas";
import NovaReceitaAutoral from "./pages/Recettes/NovaReceitaAutoral"
import Cadastrar from './pages/Cadastrar';
import RecettesCategory from "./pages/RecettesCategory/RecettesCategory"
import Receita from './pages/Receita/Receita';
import Loja from './pages/Loja/Loja';
import { ThemeContext } from "./Context/ThemeContext";
import NotFound from "./pages/NotFound/NotFound";
import EbookVenda from "./Ebook/EbookVenda";
import PrivateRoute from './routes/PrivateRoute';
import PratosPopulares from './pages/Cardapio/PainelPratosPopulares';
import PainelHeroAdmin from "./pages/Home/PainelHeroAdmin";
import EventoCongoEmFoco from "./pages/Eventos/EventoCongoEmFoco";
import Voo from "./pages/Viagem/Voos"


import Home from './pages/Home/Home';
import ListarRecettes from './pages/Home';
import ListarPosts from './pages/ListarPosts';
import ListarSlider from './pages/ListarSlider'
import Visualizar from './pages/Visualizar';
import Deletar from "./pages/Deletar";
import Editar from "./pages/Editar";
import EditarRecettes from "./pages/editarRecettes";
import Carrinho from "./pages/Carrinho/Carrinho";
import Tarefa from "./pages/Notes/tarefa";
import DisplayedNote from "./composant/DisplayedNote"
import Edit from "./composant/Edit"
import RegisterUser from "./pages/RegisterUser";
import Login from "./pages/Login/Login";
import AddProduct from "./pages/Loja/addProduct";
import SingleProduct from "./pages/Loja/singleProduct";
import Admin from "./pages/Admin/admin";
import Protected from "./Protected";
import Blog from "./pages/Blog/Blog_test";
import Posts from './pages/Posts';
import Slider from './pages/Slider';
import SingleBlog from "./pages/Single_blog";
import EditarPosts from "./pages/editarPosts";
import EditarSlider from "./pages/editarSlider";

import VisitorTracker from "./composant/VisitorTracker";
import PainelSliders from "./composant/Slider/PainelSlider";
import { Roteiros, Experiencias, Passagens, Sobre, Contato } from './pages/Viagem/CongolinariaTravel';
import PainelReservas from "./pages/Viagem/PainelReservas";
import PainelPedidos from "./pages/Pedidos/PainelPedidos";
import ChatCulinario from "./pages/Cardapio/ChatCulinario";
import PainelUploadReceitas from "./pages/Recettes/PainelUploadReceitas";
import PainelReceitasAutorais from "./pages/Recettes/PainelReceitasAutorais"
import VisualizarReceitaPublica from './pages/Recettes/VisualizarReceitaPublica';
import AssistenteReceita from './pages/Recettes/AssistenteReceita';
import AvaliarReceita from "./pages/Recettes/AvaliarReceita";



/*


import Sobre from "./pages/Sobre/Sobre";
import Restaurantes from "./pages/Restaurantes/Restaurantes";
import Recettes from "./pages/Recettes/Recettes";
import Pesquisa from "./pages/Pesquisa/Pesquisa";

import Usuarios from "./pages/usuarios"
import Oficinas from "./pages/Oficinas/Oficinas";

import SingleRecettes from "./pages/Single_recettes";
import SingleBlog from "./pages/Single_blog";





import { useEffect } from "react";
import Perfil from "./pages/Perfil/Perfil";

import FacebookLoginCustome from 'react-facebook-login/dist/facebook-login-render-props'
import * as C from './styles';


import Upload from "./composant/Forms/Upload/Upload";
import SingleOficinas from "./pages/Single_oficinas";
import ListarRecettesCuisineLibre from "./pages/ListarRecettesCuisineLibre"
import EditarRecettesCuisineLibre from "./pages/editarRecettesCuisineLibre"








import Comments from "./comments/Comments";*/

import { getNotesFromAPI } from "./pages/Notes/notes";
import { getRecettesFromAPI } from "./pages/Recettes/recettesReducer";

window.open(`https://congolinaria.com.br/avaliar-receita?id=${receita.id}`, '_blank');


function AssistenteWrapper() {
  const { id } = useParams();
  return <AssistenteReceita id={id} />;
}

function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const recettes = useSelector(state => state.recettesReducer)

  if (!notes.list) {
    dispatch(getNotesFromAPI())
  }

  /*logique login */

  const { theme, resize } = useContext(ThemeContext);
  const { withBrowser } = useContext(ThemeContext)
  const [usuario, setUsuario] = useState([

    { Email: '' },
    { senha: '' },
  ]);
  const [statusLogin, setStatusLogin] = useState({
    codigo: '',
    type: '',
    mensagem: ''
  })
  const [stateInputNome, setStateInputNome] = useState();
  const [stateInputEmail, setStateInputEmail] = useState();
  const [stateInputSenha, setStateInputSenha] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [dataComment, setDataComment] = useState([]);
  const params = useParams();
  const idcad = useState(params.id);
  const valorNome = e => {
    setStateInputNome(e);
  }

  const valorEmail = e => {
    setStateInputEmail(e);
  }
  const valorSenha = e => {
    setStateInputSenha(e);
  }

  const goRegister = () => { navigate("/register") }
  const goRecette = () => { navigate("/recettes") }
  function goListarRecette() {
    //return <Navigate to="/" replace />
    navigate('./admin/', { replace: true })
    toggleModalRegister()
  }


  const getComments = async (id_recettes) => {
    await fetch('http://localhost/RestoAfrica/src/views/single_recette_coment.php?id=' + id_recettes)
      .then(response => response.json())
      .then(data => {

        setDataComment(data);
      })
  }
  useEffect(() => {


  }, [])

  /* fim logique login */

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [entrar, setEntrar] = useState("");
  const navigate = useNavigate()
  const [dataSavaldo, setDataSalvado] = useState("");

  const [isMobile, SetIsMobile] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const [showModalPesquisa, setShowModalPesquisa] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [largura, setLargura] = useState('')


  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);

  const toggleModal = () => {
    setShowModal(!showModal);
    SetIsMobile(false)
    setShowModalPesquisa(false)
    setShowModalLogin(false)
  };
  const toggleModalLogin = () => {
    setShowModal(false);
    SetIsMobile(false)
    setShowModalPesquisa(false)
    setShowModalRegister(false);
    setShowModalLogin(!showModalLogin)
  };
  const toggleModalPerfil = () => {
    setShowModalPerfil(!showModalPerfil);
  };
  const toggleModalPesquisa = () => {
    setShowModalPesquisa(!showModalPesquisa);
    setShowModal(false);
  };
  const toggleModalRegister = () => {
    setShowModalRegister(!showModalRegister);
    setShowModal(false);
    setShowModalLogin(false)
    setShowModalPesquisa(false);

  };




  let buttonFB = "";
  let buttonLogin = "";
  if (!login) {



  }
  else {
    buttonFB = <div><img src={picture} width={25} />
    </div>


  }
  const goHome = () => { navigate("/register") }
  const pathnames = ["/admin", "/listarRecettes"]
  const [pagina, setPagina] = useState()
  const pathAdmin = window.location.pathname === '/admin'
  const pathrecettes = window.location.pathname === '/listarRecettes'
  const pathUser = window.location.pathname === "/usuarios"
  const pathLogin = window.location.pathname === "/login"
  const caminho = () => {
    for (let i = 0; i < pathnames.length; i++) {
    }
  }
  caminho()
  return (

    <>
 <VisitorTracker />
      <ThemeContextProvider>

        <Routes>
          <Route path="/avaliar-receita" element={<AvaliarReceita />} />
           <Route path="/assistente/:id" element={<AssistenteWrapper />} />
          <Route path="/tarefa" element={<Tarefa />} />
          <Route path="/note/:id" element={<DisplayedNote />} />
          <Route path="/editer" element={<Edit />} />
          <Route path="/editer/:id" element={<Edit />} />
          <Route path="/listarPosts/" element={<ListarPosts />} />
          <Route path='/editarPosts/:id' element={<EditarPosts />} />
          <Route path="/listarSlider/" element={<ListarSlider />} />
          <Route path='/editarSlider/:id' element={<EditarSlider />}/>
          <Route path='/paneilSlider' element= {<PainelSliders/>}/>
          < Route path="/painelHeroAdmin" element={<PainelHeroAdmin/>}/>
          <Route path="/evento-congo-em-foco" element ={<EventoCongoEmFoco/>}/>
          <Route path="/roteiros" element={<Roteiros />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/passagens" element={<Passagens />} />
          <Route path="/voos" element={<Voo/>}/>
          <Route path="/painel-reservas" element={<PainelReservas/>}/>
          <Route path="/painel-pedido" element={<PainelPedidos/>}/>
          <Route path="/chat-culinario" element={<ChatCulinario/>}/>
          <Route path="/painel-recettes" element={<PainelUploadReceitas/>}/>
          <Route path="/painel-receita-autoral" element={<NovaReceitaAutoral/>}/>
          <Route path="/painel-receitas-autorais" element={<PainelReceitasAutorais/>}/>
          <Route path="/receita/:id" element={<VisualizarReceitaPublica />} /> 
          

          <Route path='/' element={
            <ThemeContextProvider>
              <Home
                modal={showModalLogin}
                func2={toggleModalLogin}
                win={windowWidth.current}
                sidebar={showSidebar}
                toggleModal={toggleModal}
                showModal={showModal} />
            </ThemeContextProvider>} />
          <Route path="/redirect_cardapio/" element={<Cardapio />} />
          <Route path='/ebook' element={<EbookVenda/>}/>
          <Route path="/vegFest/" element={<CardapioEvento />} />
          <Route path="/post/" element={<Posts />} />
          <Route path="/slider/" element={<Slider />} />
          <Route path='/blog/' element={<Blog sidebar={showSidebar} />} />
          <Route path='/single_blog/:id' element={<SingleBlog modal={showModalLogin} ModalRegister={showModalRegister} func={toggleModalLogin} funcRegister={toggleModalRegister} />} />

          <Route path='/receitas/' element={
            <ThemeContextProvider>
              <Recette
                modal={showModalLogin}
                func2={toggleModalLogin}
                win={windowWidth.current}
                sidebar={showSidebar}
                getComments={getComments}
                dataComment={dataComment}
                toggleModal={toggleModal}
                showModal={showModal} /></ThemeContextProvider>
          } />

          <Route path='/receita/:slug' element={<Receita


            modal={showModalLogin}
            func2={toggleModalLogin}
            win={windowWidth.current}
            sidebar={showSidebar}
            getComments={getComments}
            dataComment={dataComment}
            toggleModal={toggleModal}
            showModal={showModal} />} />
          <Route path='/cadastro' element={<Cadastrar sidebar={showSidebar} />} />
          <Route path='/admin/pratos-populares' element={<PratosPopulares/>}/>
          <Route path="/admin/cardapio" element={
            <PrivateRoute>

          <AdminCardapio />
            </PrivateRoute>
            } />
          <Route path='*' element={<NotFound />} />

          <Route path='/listarRecettes/' element={
            <ListarRecettes toggleModal={toggleModal}
              showModal={showModal} />} />

          <Route path='/visualizar/:id' element={<Visualizar />} />
          <Route path='/deletar/:id' element={<Deletar />} />
          <Route path='/editar/:id' element={<Editar />} />
          <Route path='/editarRecettes/:id' element={<EditarRecettes />} />
          <Route path="/loja-congo/" element={<Loja />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/recettesCategory/:slug" element={<RecettesCategory />}></Route>
          <Route path="/singleProduct/:slug" element={<SingleProduct />}></Route>
          <Route path='/admin/' element={
          <PrivateRoute>
              <Admin sidebar={showSidebar}
                toggleModal={toggleModal}
                showModal={showModal} />
            </PrivateRoute>
          } />

          {/*
               
        <Route path='/usuarios/' element={

          <Usuarios  sidebar={showSidebar} toggleModal={toggleModal} 
          showModal={showModal} />
        } />
        <Route path='/listarRecettesCuisineLibre/' element={

          <ListarRecettesCuisineLibre />} />

        <Route path='/editarRecettesCuisineLibre/:id' element={

          <EditarRecettesCuisineLibre />} />
     


        <Route path='/restaurantes/' element={
       <Restaurantes FbLogin={buttonFB} func={toggleModal} modal={showModal} 
        toggleModal={toggleModal} 
        showModal={showModal}/>} />
        <Route path='/oficinas/' element={<Oficinas  sidebar={showSidebar}
        toggleModal={toggleModal} 
        showModal={showModal} />} />
        <Route path='/sobre/' element={<Sobre  win={windowWidth.current} sidebar={showSidebar}
        toggleModal={toggleModal} 
        showModal={showModal} />} />

        <Route path='/recettes/' element={
          <ThemeContextProvider>
        <Recettes  
        modal={showModalLogin} 
        func2={toggleModalLogin} 
        win={windowWidth.current} 
        sidebar={showSidebar} 
        getComments={getComments}
        dataComment= {dataComment}
        toggleModal={toggleModal} 
        showModal={showModal}/></ThemeContextProvider>
        } />
        
        <Route path='/blog/' element={<Blog  sidebar={showSidebar} />} />
        <Route path='/single_recette/:id' element={<SingleRecettes 
         modal={showModalLogin} 
        func2={toggleModalLogin} 
        win={windowWidth.current} 
        sidebar={showSidebar}
        goRegister={goRegister} />} />
        <Route path='/single_blog/:id' element={<SingleBlog modal={showModalLogin} ModalRegister={showModalRegister} func={toggleModalLogin} funcRegister={toggleModalRegister} />} />
        
        <Route path='/register/' element={<RegisterUser />} />
        
        
        <Route path='/upload' element={<Upload />} />
        <Route path="/single_oficinas/:id" element={<SingleOficinas />}></Route>
       
        
        <Route path="/perfil/:id" element={<Perfil/>}></Route>
        <Route path="/pesquisa/" element={<Pesquisa />}></Route>
        
       */}

          <Route path='/login/' element={
            <ThemeContextProvider>
              <Login
                stateInputSenha={stateInputSenha}
                stateInputEmail={stateInputEmail}
                isLogin={isLogin} statusLogin={statusLogin}
                valorEmail={valorEmail}
                valorSenha={valorSenha}
                foto={picture} func={toggleModalRegister} modal={showModalLogin} funcRegister={goRegister} />
            </ThemeContextProvider>} />
          <Route path='/register/' element={<RegisterUser />} />
          <Route path="/addProducts" element={<AddProduct />} />


        </Routes>




      </ThemeContextProvider>
    </>

  );
}

export default App;
