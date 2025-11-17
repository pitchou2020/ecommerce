import React from 'react';
import './singleRecettes.css'
import { useEffect, useState, useRef } from "react";
import { useParams, Navigate} from 'react-router-dom'
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
import Aside from '../Restaurantes/Aside';
import { Container, ConteudoProd, Sinopse, Categorie, ColumnRecettes, Colonne, ButtonPrimary, SugesRecette, ContainerRecetteSingle, ContainerRecette, ImagemRecette, TituloRecette, LinkRecette, SubRecette } from './styles';
import Navbar from '../../composant/Navbar/Menutopo';
import FormsComment from '../../composant/FormComment/FormsComment';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser'
import clientesPDF from './clientes'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NavBarAdmin from './../../composant/NavBarAdmin'
import SidebarSite from './../../composant/sidebarSite'
import Button from './../../composant/Button'
import Comments, { GetComments as getComments } from "./../../composant/FormComment/Comments"
import api from '../../config/configApi'
import './../../index.css'
import ClientePdf from '../../composant/ClientePdf/ClientePdf';
import CodePix from './../../composant/CodePix/'

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown';
import { convert } from 'html-to-text'
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';


export default function SingleRecettes(props, { goRegister }) {
  const [ingredientsPdf, setIngredientsPdf] = useState('')

  const [dataCardapio, setDataCardapio] = useState([]);
  const [dataRecettesAleatoire, setDataRecettesAleatoire] = useState([]);
  const params = useParams();
  const idcad = useState(params.id);
  const initialText = "";
  const [stateInputMessage, setStateInputMessage] = useState(initialText)

  const [preparo, setPreparo] = useState([]);
  const [ingredients, setIngredients] = useState()
  const imgRef = useRef()
  const { innerWidth: width, innerHeight: height } = window;
  const largura = window.innerWidth;
  const [activeComment, setActiveComment] = useState(null);
  const [dataComment, setDataComment] = useState([]);
  const [isReply, setIsReply] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [createdAt, setCreatedAt] = useState()
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const idUser = localStorage.getItem('idUser')
  const currentUserId = idUser;
  const canReply = Boolean(currentUserId);
  const fiveMinutes = 300000;
  //const [curtir, setCurtir] = useState('')

  const [showModalLike, setShowModalLike] = useState(false);
  const [showModalDeslike, setShowModalDeslike] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalPdf, setShowModalPdf] = useState(false);

  const toggleModalSave = () => {
    setShowModalSave(!showModalSave);
    setShowModalLike(false);
    showModalPdf(false);
    setShowModalDeslike(false)

  };
  const toggleModalLike = () => {
    setShowModalLike(!showModalLike);
    setShowModalSave(false);
    setShowModalPdf(false);
    setShowModalDeslike(false)

  };
  const toggleModalDeslike = () => {
    setShowModalDeslike(!showModalDeslike);
    setShowModalSave(false);
    setShowModalLike(false);
    setShowModalPdf(false)


  };
  const saveRecette = () => {
    if (!idUser) {
      setShowModalSave(!showModalSave);
      setShowModalDeslike(false);
      setShowModalLike(false);
      setShowModalPdf(false)
    } else {
      api.post("/save_recette.php", {
        id_recettes: idcad[0],
        id_usuario: idUser

      }).then((res) => {

      })
    }

  }

  const likeRecette = () => {
    if (!idUser) {
      setShowModalLike(!showModalLike);
      setShowModalSave(false);
      setShowModalDeslike(false);
      setShowModalPdf(false)
    } else {
      api.post("/like_recette.php", {
        id_recette: idcad[0],
        id_usuario: idUser,
        curtir: 1
      }).then((res) => {


      })
    }
    console.log(idUser)

  }

  const deslikeRecette = () => {
    if (!idUser) {
      setShowModalDeslike(!showModalDeslike);
      setShowModalSave(false);
      setShowModalLike(false);
      setShowModalPdf(false)
    } else {
      api.post("/like_recette.php", {
        id_recette: idcad[0],
        id_usuario: idUser,
        curtir: 0


      }).then((res) => {


      })
    }

  }


  const getRecettes = async () => {

    await fetch("https://refugiadonacozinha.com.br/recettesAleatoire.php")
      .then((response) => response.json())
      .then((responseJson) => {

        setDataRecettesAleatoire(responseJson.recettes);
      })

  }
  let nume = 1;
  let num = 1;
  const getProduto = async () => {

    const response = await axios.get("https://refugiadonacozinha.com.br/single_recette.php?id=" + idcad);

    setDataCardapio(response.data.produto)
    setPreparo((response.data.produto.etapes.split('<br/>').map((e, i) =>
      <table class="preparation" key={i}>
        <tr>
          <td><p class="numero">{nume++}</p></td>
          <td class="preparation_etape"><p>{e}</p></td>
        </tr>
      </table>)));

    setIngredients((response.data.produto.ingredients.split('<br/>').map((e, i) =>
      <div class="ingredients">
        <p key={i}>{
          e
        }</p></div>)));
    setIngredientsPdf(response.data.produto.ingredients);


  }

  //const newIngredients = dataCardapio.ingredients.replace("<br/>", "");
  const navigate = useNavigate()
  const [nameUrl, setNameUrl] = useState(window.location.href)
  //const nameUrl = window.location.href // pegar o link atual
  const [img, setImg] = useState()
  const urlBase = "https://refugiadonacozinha.com.br/single_recette/"


  useEffect(() => {
    getProduto();
    getRecettes();
  }, []);
  const newIngredients = dataCardapio.ingredients?.replaceAll("<br/>", "\n")
  const newEtapes = dataCardapio.etapes?.replaceAll("<br/>", "")
  //console.log(dataCardapio.ingredients.replaceAll("<br/>"," "))



  function goHome() {
    //return <Navigate to="/" replace />
    navigate("/", { replace: true })
  }

  return (
    <>


      <SidebarSite wind={props.win} modal={props.func2} />



      <section id='content'>
        <NavBarAdmin sidebar={props.sidebar} func={props.func} />


        <ContainerRecette>
          <Categorie>
            <p class="categorie">{dataCardapio.categorie}</p>
          </Categorie>
          <ColumnRecettes>
            <ContainerRecetteSingle>
              <TituloRecette >{dataCardapio.titre}

              </TituloRecette>

              <Sinopse>
                {dataCardapio.sinopse}
              </Sinopse>

              {dataCardapio.imagem && <ImagemRecette ref={imgRef} id="logo"
                src={'https://refugiadonacozinha.com.br/img_upload/' + dataCardapio.imagem}
                alt="Refugiado na cozinha"></ImagemRecette>}
              <ul class="recettes-btn">
                <li>
                  <button className='btn-modal' onClick={likeRecette}>
                    <i class='bx bx-like' ></i>
                    Gostei
                  </button>
                  {showModalLike && <div className='contenair-modal'>

                    <p>Gostou desta receita</p>
                    <p>Conecta-se para dar a sua opinão</p>
                    <a href="../login">entrar</a>
                  </div>}
                </li>

                <li>
                  <button className='btn-modal' onClick={deslikeRecette}>
                    <i class='bx bx-dislike' ></i>
                    Não Gostei
                  </button >
                  {showModalDeslike && <div className='contenair-modal'>
                    <p>Não gostou desta receita</p>
                    <p>Conecta-se para dar a sua opinão</p>


                    <a href="../login">entrar</a>
                  </div>}
                </li>

                <li>
                  <button className='btn-modal' onClick={saveRecette}> Adicionar a minha receitas</button>
                  {showModalSave && <div className='contenair-modal'>
                    <p>Salvar esta  receitas </p>
                    <p>Conecta-se para criar uma listas de suas receitas favoritas</p>

                    <a href="../login">entrar</a>
                  </div>}
                </li>

                <li>
                  <ClientePdf
                    dataCardapio={dataCardapio}
                    showModalPdf={showModalPdf}
                    setShowModalPdf={setShowModalPdf}
                    setShowModalDeslike={setShowModalDeslike}
                    setShowModalSave={setShowModalSave}
                    setShowModalLike={setShowModalLike}
                  />
                  {showModalPdf && <div className='contenair-modal'>
                    <p>Baixar  receitas</p>
                    <p>Conecta-se para baixar receitas no seu dispositivo</p>
                    <a href="../login">entrar</a>
                  </div>}
                </li>
              </ul>

              <Colonne>
                <ConteudoProd class="colonne1">
                  <SubRecette> Ingredientes</SubRecette>
                  <div className="ingredients">
                    {ingredients}
                  </div>
                </ConteudoProd>

                <ConteudoProd class="colonne2">
                  <SubRecette> Modo de Preparo</SubRecette>
                  {preparo}
                  <ul>
                    {/*(Object.values(preparo.map((prep) => <li>{prep}</li>)))*/}
                  </ul>
                </ConteudoProd>
              </Colonne>


              <div >

                <Comments />
              </div>


            </ContainerRecetteSingle>

            <SugesRecette>
              <h1>você também pode gostar...</h1>
              {(Object.values(dataRecettesAleatoire).map(resto =>

                <a href={'https://refugiadonacozinha.com.br/single_recette/' + resto.id_recettes}>

                  <img id="logo" src={'https://refugiadonacozinha.com.br/img_upload/' + resto.imagem} alt="Refugiado na cozinha" width={'300'} />

                  <h2 key={resto.id_recettes}>{resto.titre} </h2>



                </a>
              ))}

            </SugesRecette>
          </ColumnRecettes>
        </ContainerRecette>
      </section>

    </>
  )
}
