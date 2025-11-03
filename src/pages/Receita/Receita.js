import React from 'react'
import './Receita.css'
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import DOMPurify from 'dompurify';
import { useSelector, useDispatch } from 'react-redux'
import { getArticles } from './../../redux/articles/articleReducer'
import { getRecette } from './../Recettes/recettesReducer';
import { addStarRecette} from './../Recettes/recettesReducer';
import Comments, { GetComments as getComments } from "./../../composant/FormComment/Comments"

import ThemeContextProvider from '../../Context/ThemeContext'

import Categorie from '../../composant/NavCategorie/Categorie';
import api from '../../config/configApi'
import { useParams, Navigate, Link } from 'react-router-dom'
import axios from 'axios';
import Star from '../../composant/Star'
import RecettesAleatoire from '../../composant/RecettesAleatoire/RecettesAleatoire';
import ClientePdf from '../../composant/ClientePdf/ClientePdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Footer from './../../composant/Footer/Footer'
import NavMenu from '../../composant/navMenu/NavMenu';



export default function Recette(props) {
  const { articles } = useSelector(state => ({
    ...state.articleReducer
  }))
  const recettes = useSelector(state => state.recettesReducer)


  const idUser = localStorage.getItem('idUser')
  const currentUserId = idUser;
  const params = useParams();
  const idcad = useState(params.id);
  const dispatch = useDispatch()
  const location = useLocation()
  const [showModalLike, setShowModalLike] = useState(false);
  const [showModalDeslike, setShowModalDeslike] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalPdf, setShowModalPdf] = useState(false);

  // configuração das estrelas 

  const items = [...(new Array(5).keys())];
  const [activeIndex, setActiveIndex] = useState();


  const carouselbtn = useRef(null);
  useEffect(() => {

    if (recettes.length === 0) {
      dispatch(getRecette());
    }

  }, [dispatch, recettes, activeIndex]);

  const carousel = useRef(null);
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  const deslikeRecette = () => {
    if (!idUser) {
      setShowModalDeslike(!showModalDeslike);
      setShowModalSave(false);
      setShowModalLike(false);
      setShowModalPdf(false)
    } else {
      api.post("/like_recette.php", {
        id_recette: location.state.id_recette,
        id_usuario: idUser,
        curtir: 0


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
        id_recette: location.state.id_recette,
        id_usuario: idUser,
        curtir: 1
      }).then((res) => {

      })
    }
  }
  const newIngredients = location.state.ingredients?.replaceAll("<br/>", "\n")
  const newEtapes = location.state.etapes?.replaceAll("<br/>", "")

  function getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
  const clientesPDF = async () => {
    if (!localStorage.getItem('idUser')) {
      setShowModalPdf(!showModalPdf)
      setShowModalDeslike(false)
      setShowModalSave(false)
      setShowModalLike(false)



    } else {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      const reportTitle = [
        {
          text: 'Receita',
          fontSize: 15,
          bold: true,
          margin: [15, 20, 0, 45]
        }
      ];
      const details = [


        {/* {
                image: await getBase64ImageFromURL(
                   'https://refugiadonacozinha.com.br/img_upload/'+location.state.imagem
                ),
                width: 300
            },*/},
        {
          text: location.state.titre,
          style: 'header'
        },
        '\n\nINGREDIENTES\n\n\n',
        {
          text: newIngredients,
          style: 'subheader'
        },
        '\n\n MODO DE PREPARO\n\n\n',
        {
          text: newEtapes,
          style: 'subheader'
        },

      ];
      function Rodape(currentPage, pageCount) {
        return [
          {

            text: 'Receitas reservada para congolinaria' + currentPage + '/' + pageCount,
            alignment: 'right',
            fontSize: 9,
            bold: true,
            margin: [0, 10, 20, 0]//left,top,right,bottom
          },

        ]
      }

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: Rodape
      }
      pdfMake.createPdf(docDefinition).open();
    }
  }
  const onClickStar = (index) => {
    setActiveIndex(index)
    console.log(index)
    const form={
      id_recettes:location.state.id_recette,
      id_usuario:15,
      star:index,
    }
    dispatch(addStarRecette(form))

  }
  const saveRecette = () => {
    if (!idUser) {
      setShowModalSave(!showModalSave);
      setShowModalDeslike(false);
      setShowModalLike(false);
      setShowModalPdf(false)
    } else {
      api.post("/save_recette.php", {
        id_recettes: location.state.id_recette,
        id_usuario: idUser

      }).then((res) => {


      })
    }

  }

  document.querySelectorAll(".icons-container li button").forEach((button) => {
    button.classList.remove("active")
  })
  const selectButton = (e) => {

    const button = e.currentTarget
    console.log(button.dataset.tipo)
    //remover todos as classes .active
    const buttons = document.querySelectorAll(".icons-container li button")
    buttons.forEach((button) => {
      button.classList.remove("active")
    })

    //selecionar o button clicado

    // color a funcão conforme o butão clicado
    if (button.dataset.tipo === "save") {
      saveRecette()
    }
    if (button.dataset.tipo === "download") {
      clientesPDF()
    }
    if (button.dataset.tipo === "like") {
      likeRecette()
    }
    if (button.dataset.tipo === "deslike") {
      deslikeRecette()
    }
    //adicionar a classe .active para este botao
    button.classList.add("active")
  }
  return (
    <>
      <NavMenu />
      <Categorie />

      <section id='content'>



        <div className='ContainerRecette'>
          <div className='ColumnRecettes'>
            <div className='ContainerRecetteSingle'>
              <div className='image-recette'>
                <img id="logo" src={'https://congolinaria.com.br/' + location.state.imagem} alt={location.state.titre} />

              </div>
              <div className='titulo-recette'>
                <h2>{location.state.titre}</h2>
              </div>
              <div className='content'>
                <div className='stars'>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
              <div className='colonne-recette'>
                <div className='ingredients ConteudoProd' >
                  <h3>Ingredientes</h3>
                  {location.state.ingredients.split(',').map(e =>
                    <p>{e}</p>)}
                </div>

                <div className='etapes ConteudoProd'>
                  <h3>Modo de Preparo</h3>
                  {location.state.etapes.split(',').map(e =>
                    <p>{e}</p>)}
                </div>
              </div>
              <div className='icons-container' ref={carouselbtn}>

                <ul class="recettes-btn">
                  <li >
                    <button className='btn-modal active' data-tipo={'like'} onClick={selectButton} >
                      <i class="fa-solid fa-thumbs-up"></i>
                      Gostei
                    </button>
                    {/*showModalLike && <div className='contenair-modal'>

                      <p>Gostou desta receita</p>
                      <p>Conecta-se para dar a sua opinão</p>
                      <a href="../login">entrar</a>
  </div>*/}
                  </li>

                  <li>
                    <button className='btn-modal ' data-tipo={'deslike'} onClick={selectButton}>

                      <i class="fa-solid fa-thumbs-down"></i>
                      Não Gostei
                    </button >
                    {showModalDeslike && <div className='contenair-modal'>
                      <p>Não gostou desta receita</p>
                      <p>Conecta-se para dar a sua opinão</p>


                      <a href="../login">entrar</a>
                    </div>}
                  </li>

                  <li>
                    <button className='btn-modal' data-tipo={'save'} onClick={selectButton}>
                      <i class="fa-solid fa-bookmark"></i>
                      Salvar</button>
                    {showModalSave && <div className='contenair-modal'>
                      <p>Salvar esta  receitas </p>
                      <p>Conecta-se para criar uma listas de suas receitas favoritas</p>

                      <a href="../login">entrar</a>
                    </div>}
                  </li>

                  <li>
                    <button className='btn-modal' data-tipo={'download'} onClick={selectButton}>
                      <i class="fa-solid fa-download"></i>
                      Baixar </button>
                    {showModalPdf && <div className='contenair-modal'>
                      <p>Baixar  receitas</p>
                      <p>Conecta-se para baixar receitas no seu dispositivo</p>
                      <a href="../login">entrar</a>
                    </div>}
                  </li>
                </ul>
              </div>
              <div className="avaliar-receita">
                <h4>Avaliar a receitas</h4>


                {items.map((index) => (


                  <Star key={`start_${index}`} isActive={index <= activeIndex} onClick={() => onClickStar(index)} />

                ))}

              </div>
              <div >

                <Comments activeIndex={activeIndex} />
              </div>
            </div>
            <div className='SugesRecette'>
              <h1>você também pode gostar...</h1>
              <RecettesAleatoire />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
