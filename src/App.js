
import { Routes, Route,useParams } from "react-router-dom"
import React, { useState, useRef,useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import ThemeContextProvider from "./Context/ThemeContext";
import Cardapio from "./pages/Cardapio/Cardapio";
import CardapioAdmin from "./pages/Cardapio/CardapioAdmin";
import Recette from "./pages/Recettes/Recettes";
import Cadastrar from './pages/Cadastrar';
import RecettesCategory from "./pages/RecettesCategory/RecettesCategory"
import Receita from './pages/Receita/Receita';
import Loja from './pages/Loja/Loja';
import {ThemeContext} from "./Context/ThemeContext";
import NotFound from "./pages/NotFound/NotFound";


import Home from './pages/Home/Home';
import ListarRecettes from './pages/Home';
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


/*


import Sobre from "./pages/Sobre/Sobre";
import Restaurantes from "./pages/Restaurantes/Restaurantes";
import Recettes from "./pages/Recettes/Recettes";
import Pesquisa from "./pages/Pesquisa/Pesquisa";
import Blog from "./pages/Blog/Blog"
import Usuarios from "./pages/usuarios"
import Oficinas from "./pages/Oficinas/Oficinas";

import SingleRecettes from "./pages/Single_recettes";
import SingleBlog from "./pages/Single_blog";
import Admin from "./pages/Admin/admin";




import { useEffect } from "react";
import Perfil from "./pages/Perfil/Perfil";

import FacebookLoginCustome from 'react-facebook-login/dist/facebook-login-render-props'
import * as C from './styles';


import Upload from "./composant/Forms/Upload/Upload";
import SingleOficinas from "./pages/Single_oficinas";
import ListarRecettesCuisineLibre from "./pages/ListarRecettesCuisineLibre"
import EditarRecettesCuisineLibre from "./pages/editarRecettesCuisineLibre"

import Protected from "./Protected";






import Comments from "./comments/Comments";*/

import { getNotesFromAPI } from "./pages/Notes/notes";
import { getRecettesFromAPI } from "./pages/Recettes/recettesReducer";

function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const recettes = useSelector(state=>state.recettesReducer)
  console.log(notes)
 
  if(!notes.list){
    dispatch(getNotesFromAPI())
  }

  /*logique login */
  
  const{theme, resize} = useContext(ThemeContext);
  const{withBrowser} = useContext(ThemeContext)
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
    console.log(showModal)
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
    console.log(showModalPerfil)
  };
  const toggleModalPesquisa = () => {
    setShowModalPesquisa(!showModalPesquisa);
    setShowModal(false);
    console.log(showModalPesquisa)
  };
  const toggleModalRegister = () => {
    setShowModalRegister(!showModalRegister);
    setShowModal(false);
    setShowModalLogin(false)
    setShowModalPesquisa(false);
  
  };


  const responseFacebook = (response) => {


    setData(response);
    setPicture(response.picture.data.url);
    setName(response.name);

    console.log(response)
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);

    }


  }
  const handleLogout = () => {
    setData({});
    setPicture("");
    setLogin(false);
    localStorage.clear();
  };

  let buttonFB = "";
  let buttonLogin = "";
  if (!login) {

   

    console.log(login != true);
  }
  else {


    buttonFB = <div><img src={picture} width={25} />
    </div>


  }
  const goHome = () => { navigate("/register") }
  const pathnames=["/admin","/listarRecettes"]
  const [pagina, setPagina]=useState()
const pathAdmin = window.location.pathname==='/admin'
const pathrecettes= window.location.pathname==='/listarRecettes'
const pathUser= window.location.pathname==="/usuarios"
const pathLogin= window.location.pathname==="/login"
  console.log(window.location.pathname==='/admin')
  console.log(pathnames.length)
  const caminho =()=>{
    for(let i=0;i<pathnames.length;i++){
      console.log(pathnames[i])
    }
  }
 caminho()
  return (

    <>
  
<ThemeContextProvider>
  
      <Routes>

<Route path="/tarefa" element={<Tarefa/>} />
<Route path="/note/:id" element={<DisplayedNote />} />
<Route path="/editer" element={<Edit />} />
<Route path="/editer/:id" element={<Edit />} />

        <Route path='/' element={
        <ThemeContextProvider>
        <Home 
        modal={showModalLogin} 
        func2={toggleModalLogin} 
        win={windowWidth.current} 
        sidebar={showSidebar} 
        toggleModal={toggleModal} 
        showModal={showModal}/>
        </ThemeContextProvider>} />
        <Route path="/menu-rodizio" element={<Cardapio/>}/>
        <Route path='/receitas/' element={
          <ThemeContextProvider>
        <Recette
        modal={showModalLogin} 
        func2={toggleModalLogin} 
        win={windowWidth.current} 
        sidebar={showSidebar} 
        getComments={getComments}
        dataComment= {dataComment}
        toggleModal={toggleModal} 
        showModal={showModal}/></ThemeContextProvider>
        } />

<Route path='/receita/:slug' element = {<Receita
        
         
        modal={showModalLogin} 
        func2={toggleModalLogin} 
        win={windowWidth.current} 
        sidebar={showSidebar} 
        getComments={getComments}
        dataComment= {dataComment}
        toggleModal={toggleModal} 
        showModal={showModal}/>}/>
        <Route path='/cadastro' element={<Cadastrar  sidebar={showSidebar} />} />
        <Route path="/admin/cardapio" element={<CardapioAdmin />}/>
        <Route path='*' element={<NotFound />} />

        <Route path='/listarRecettes/' element={
          <ListarRecettes toggleModal={toggleModal} 
          showModal={showModal} />} />

        <Route path='/visualizar/:id' element={<Visualizar />} />
        <Route path='/deletar/:id' element={<Deletar />} />
        <Route path='/editar/:id' element={<Editar />} />
        <Route path='/editarRecettes/:id' element={<EditarRecettes />} />
        <Route path="/loja" element={<Loja/>}/>
        <Route path="/carrinho" element={<Carrinho/>}/>
        <Route path="/recettesCategory/:slug" element={<RecettesCategory /> }></Route>
        <Route path="/singleProduct/:slug" element={<SingleProduct /> }></Route>
        
               {/*
               
        <Route path='/usuarios/' element={

          <Usuarios  sidebar={showSidebar} toggleModal={toggleModal} 
          showModal={showModal} />
        } />
        <Route path='/listarRecettesCuisineLibre/' element={

          <ListarRecettesCuisineLibre />} />

        <Route path='/editarRecettesCuisineLibre/:id' element={

          <EditarRecettesCuisineLibre />} />
        <Route path='/admin/' element={
          <Protected isLoggedIn={isLoggedIn}>
            <Admin logOut={logOut}  sidebar={showSidebar}
            toggleModal={toggleModal} 
            showModal={showModal} />
           </Protected>
        } />


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
       <Route path="/addProducts" element={<AddProduct/>}/>
     
        
      </Routes>
    
     
   
     
      </ThemeContextProvider>
    </>
    
  );
}

export default App;
