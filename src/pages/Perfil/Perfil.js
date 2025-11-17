
import React, { useState, useEffect } from 'react'

import logo from './../../assets/images/logo_Refugiado_na_cozinha.png'
import Button from "../../composant/Button"
import Input from "../../composant/Input"
import { useNavigate } from 'react-router-dom'
import People from './../../pages/Admin/img/people.png'
import bg from './../../assets/images/Backgrounds.jpg'

import * as C from './styles';
import ButtonError from '../../composant/ButtonError'
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components'
import NavBarAdmin from './../../composant/NavBarAdmin'
import SidebarSite from './../../composant/sidebarSite'
import './Perfil.css'
import Card from '../../composant/Card/Card'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles } from './../../redux/articles/articleReducer'

const FacebookLoginButton = {
  backgroundColor: "#37549A",
  color: "#fff",
  borderRadius: "30px",
  fontSize: "15px",

  fontWeight: "bold",
  cursor: "pointer"
}



export default function Perfil(props) {

  const { articles } = useSelector(state => ({
    ...state.articleReducer
}))

const dispatch = useDispatch()
  const idUser = localStorage.getItem('idUser')
  const navigate = useNavigate()
  const goRegister = () => { navigate("./../register") }

  const [dataRecettesSalvas, setDataRecettesSalvas] = useState([]);

  const getRecettesSaved = async () => {

    await fetch("http://localhost/RestoAfrica/src/views/listar_recettes_saves.php?id=" + idUser)
      .then((response) => response.json())
      .then((responseJson) => {

        setDataRecettesSalvas(responseJson);

      })

  }
  const valorVegan = evt => {
    console.log(evt.target.id)
}
  useEffect(() => {
    getRecettesSaved();
    if (articles.length === 0) {
      dispatch(getArticles());
  }

}, [dispatch, articles]);

  return (
    <>

      <SidebarSite wind={props.win} modal={props.func2} />

      <section id='content'>
        <NavBarAdmin sidebar={props.sidebar} func={props.func} />

        <div className='images-capa'>
          <img src={bg} alt="bg" height='300' width="100%" />
          <div className='edit-capa'><i class="fa-solid fa-pen"></i>
            <span>editar capa</span></div>
        </div>

        <div className='container-profile'>
          <div className='foto-profile'>
            <img src={People} alt="people" />
            <i class="fa-solid fa-pen"></i>
            <span>Pitchou luhata luambo</span>
          </div>

          <div className='nav-profile'>
            <a href="./perfil/150">MEU PERFIL</a>
            <a href="">SALVOS</a>
            <a href="">ENVIADOS</a>
            <a href="">HISTÓRICO</a>
            <a href="">BIO</a>
          </div>


          <div className='content-recette-salvos'>
            <h2>receitas salvos</h2>
            <div className="container-recette">
              {(Object.values(dataRecettesSalvas).map(resto =>
              
                <Card key={uuidv4()}>
                   <input type="checkbox" name={resto.titre} id={resto.id_recettes}  onChange={valorVegan}  />
                  <Link

                    to={
                      `/receita/${resto.titre.trim().replace(/\s+/g, '-')}`
                    }
                    state={{
                      titre: resto.titre,
                      ingredients: resto.ingredients,
                      etapes: resto.etapes,
                      imagem: resto.imagem,
                      id_recette: resto.id_recettes

                    }}

                  >
                   
                     
                    <div className='image'>
                  


                      <img id="logo" src={'https://refugiadonacozinha.com.br/img_upload/' + resto.imagem} alt="Refugiado na cozinha" width={'300'} />
                    </div>
                    <h2 key={resto.id_recettes}>{resto.titre} </h2>



                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
