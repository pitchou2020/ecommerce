import React from 'react'
import { useEffect, useState } from "react";
import { useParams,Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Aside from '../Restaurantes/Aside';
import { Container, ConteudoProd,Sinopse, Categorie, ColumnRecettes, Colonne, ButtonPrimary, SugesRecette, ContainerRecetteSingle, ContainerRecette, ImagemRecette, TituloRecette, LinkRecette, SubRecette } from './styles';
import Navbar from '../../composant/Navbar/Menutopo';
import FormsComment from '../../composant/FormComment/FormsComment';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser'

export default function SingleBlog(props) {
  console.log(props)

  const [dataCardapio, setDataCardapio] = useState([]);
  const [dataRecettesAleatoire, setDataRecettesAleatoire] = useState([]);
  const params = useParams();
  const idcad = useState(params.id);
  const [preparo, setPreparo] = useState([]);
  const [ingredients, setIngredients] = useState()
  const UrlBase = 'http://localhost/RestoAfrica/src/views/';

  const getRecettes = async () => {

    await fetch(UrlBase +"recettesAleatoire.php")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setDataRecettesAleatoire(responseJson.recettes);
      })

  }
  let nume = 1;
  let num = 1;
 
  const getProduto = async () => {
    await fetch(UrlBase +"/single_blog.php?id=" + idcad)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setDataCardapio(responseJson.produto);


        setPreparo((responseJson.produto.etapes.split('<br/>').map((e, i) =>
          <table class="preparation" key={i}>
            <tr>
              <td><p class="numero">{nume++}</p></td>
              <td class="preparation_etape"><p>{e}</p></td>
            </tr>
          </table>)));

        setIngredients((responseJson.produto.ingredients.split('<br/>').map((e, i) =>
          <div class="ingredients">
            <p key={i}>{
              e
            }</p></div>)))
      })
  }
  console.log(dataCardapio)
  const navigate = useNavigate()
  const [nameUrl, setNameUrl]=useState(window.location.href)
  //const nameUrl = window.location.href // pegar o link atual
  useEffect(() => {
    getProduto();
    getRecettes();


  }, []);
  console.log(nameUrl);


  
  function goHome ()  { 
    //return <Navigate to="/" replace />
    navigate("/", { replace: true })
  }
  


  return (
    <div>
  
      {props.modalLogin && <Login func={props.func} funcRegister={props.funcRegister} />}
      {props.modalRegister && <RegisterUser func={props.func} funcRegister={props.funcRegister} />}
      <Aside />

      <ContainerRecette>
        <Categorie>
          <p class="categorie">{dataCardapio.categorie}</p>          
        </Categorie>
        <ColumnRecettes>
          <ContainerRecetteSingle>
           
            
              <Sinopse>
                {dataCardapio.sinopse}
              </Sinopse>
              <h1>{dataCardapio.title_post}</h1>
            <p>{dataCardapio.content_post}</p>
            {dataCardapio.imagem && <ImagemRecette id="logo" src={dataCardapio.imagem} alt="Refugiado na cozinha"></ImagemRecette>}
            <TituloRecette >{dataCardapio.titre} </TituloRecette>
            <Colonne>
              <ConteudoProd class="colonne1">
                <SubRecette> Ingredientes</SubRecette>
                <div class="ingredients">
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
            <FormsComment func={props.func} funcRegister={props.funcRegister} />
          </ContainerRecetteSingle>

          <SugesRecette>
            <h1>você também pode gostar...</h1>
            {(Object.values(dataRecettesAleatoire).map(resto =>

              <a href={UrlBase +'single_recette/'+ resto.id_recettes}>

                <img id="logo" src={resto.imagem} alt="Refugiado na cozinha" width={'300'} />

                <h2 key={resto.id_recettes}>{resto.titre} </h2>

              </a>
            ))}

          </SugesRecette>
        </ColumnRecettes>
      </ContainerRecette>
     

    </div>
  )
}
