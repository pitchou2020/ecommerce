import { useEffect } from 'react';
import { useState } from 'react';
import { Table, Titulo, ButtonPrimary, AlertSucess, AlertDanger } from './styles'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';
import People from './../Admin/img/people.png';
import "./../Loja/Product.css"
import api from './../../config/configApi'

import NavMenuAdmin from '../../composant/navMenu/NavMenuAdmin'
import Sidebar from '../../composant/Sidebar/Sidebar';

import { useSelector, useDispatch } from 'react-redux'
import {getRecettesFromAPI} from './../Recettes/recettesReducer'
import { getRecette } from './../Recettes/recettesReducer';
import { deleteRecette } from './../Recettes/recettesReducer';
import spinner from './../../assets/spinner.svg'


//import './App.css';

//import Forms from '../Forms/Forms';
//import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';

export default function Home(props) {
  
const recettes = useSelector(state=>state.recettesReducer)

const [APIState, setAPIState]= useState({
  loading:false,
  error:true,
  data:undefined
})



  const dispatch = useDispatch()
  
  

  const [dataCardapio, setDataCardapio] = useState([]);
  const [statusEnvio, setEnvioStatus] = useState({
    type: '',
    mensagem: ''
  })

const url= 'http://localhost/RestoAfrica/src/views/'
  useEffect(() => {

  }, [])


let content;
if(!recettes.data && !recettes.loading && !recettes.error){
  dispatch(getRecette())
}
else if(recettes.loading){
  content = <img src={spinner} alt='spinning loader'/>
}
else if(recettes.loading) content = <img src={spinner} width={150} alt="icone de chargement"/>
else if(recettes.error) content = <p> Une erreur est survenue</p>
else if(recettes.data?.length > 0){
 content = 
((recettes.data).map(receita => (
  <tr key={receita.id_recettes}>
    {console.log(receita.title)}
    <td>{receita.titre}</td>
    <td> {receita.infos}</td>
    <td> {receita.ingredients}</td>
    <td> {receita.etapes}</td>
    <td>
      <img id="logo" src={url + receita.imagem} width={'300'} alt="Refugiado na cozinha" /></td>

    <td>
      <Link to={"/visualizar/" + receita.id_recettes}><ButtonPrimary><i class="fa-regular fa-eye"></i></ButtonPrimary></Link>
      <Link to={"/editarRecettes/" + receita.id_recettes}
      state={{
        titre: receita.titre,
        ingredients: receita.ingredients,
        etapes: receita.etapes,
        imagem: receita.imagem,
        categorie: receita.categorie,
        vegan: receita.vegan,
        sinopse:receita.sinopse,
        infos:receita.infos,
        id_recette:receita.id_recettes,
        createdAt:receita.createdAt
       
    }}

      ><ButtonPrimary><i class="fa-solid fa-pen"></i> </ButtonPrimary></Link>
      <ButtonPrimary onClick={() => dispatch(deleteRecette(receita.id_recettes))}><i class="fa-solid fa-trash"></i></ButtonPrimary>
    </td>
  </tr>
)))
}

  return (

    <>
      <Sidebar/>
      <section id='content'>
<NavMenuAdmin/>
     
<main>
<div class="head-title">
<div class="left">
        <h1>RECETTES</h1>
        </div> 
        <a href='/cadastro/'>adicionar novo</a>
        </div>
        {statusEnvio.type === 'erro' ? <AlertDanger>{statusEnvio.mensagem}</AlertDanger> : ""}
        {statusEnvio.type === 'sucess' ? <AlertSucess>{statusEnvio.mensagem}</AlertSucess> : ""}
        <div class="order">
        <table>
          <thead>
            <tr>

              <th>Titre</th>
              <th>INFOS</th>
              <th>INGREDIENTS</th>
              <th>ETAPES</th>
              <th>IMAGES</th>

              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {
              content
            }
          </tbody>
        </table>
        </div>
        </main>
      </section>
    </>


  );
}


