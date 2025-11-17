import React from 'react'
import { useEffect,useRef, useState } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Aside from '../Restaurantes/Aside';
import { Container, ConteudoProd,Sinopse, Categorie, ColumnOficinas, Colonne, ButtonPrimary, SugesOficina, ContainerOficinaSingle, ContainerOficina, ImagemOficina, TituloOficina, LinkOficina, SubOficina } from './styles';
import Navbar from '../../composant/Navbar/Menutopo';
import FormsComment from '../../composant/FormComment/FormsComment';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser'
import ReactPlayer from 'react-player/youtube'
import useDimension from '../../useDimention';

export default function SingleOficinas(props) {
  const browserWidth = useDimension();
  //const [mobile, SetMobile]= useState(false);
  console.log(browserWidth);
 const mobile = browserWidth <= 768;

 
    console.log(mobile);
  

  

  const [dataCardapio, setDataCardapio] = useState([]);
  const [dataOficinasAleatoire, setDataOficinasAleatoire] = useState([]);
  const params = useParams();
  const idcad = useState(params.id);
  const [preparo, setPreparo] = useState([]);
  const [ingredients, setIngredients] = useState()

  const getOficinas = async () => {

    await fetch("https://refugiadonacozinha.com.br/oficinasAleatoire.php")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setDataOficinasAleatoire(responseJson.oficinas);
      })

  }
  
  const getProduto = async () => {
    await fetch("http://refugiadonacozinha.com.br/single_oficinas.php?id=" + idcad)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setDataCardapio(responseJson.produto);


      })
  }
  useEffect(() => {
    getProduto();
    getOficinas();



  }, []);


  const navigate = useNavigate()
  const goHome = () => { navigate("/") }
  const ref =  useRef();
  console.log(ref);

  useEffect(()=>{
    console.log(ref.current);
  },[])

  return (
    <div>
      {props.modalLogin && <Login func={props.func} funcRegister={props.funcRegister} />}
      {props.modalRegister && <RegisterUser func={props.func} funcRegister={props.funcRegister} />}
      <Aside />

      <ContainerOficina>
        <Categorie>
         

        </Categorie>
        <ColumnOficinas>
          <ContainerOficinaSingle>
            <TituloOficina >{dataCardapio.titulo} </TituloOficina>
            
              <Sinopse>
                {dataCardapio.descricao}
              </Sinopse>
         

           
            <ReactPlayer  url={dataCardapio.video}  width="100%"  autoPlay controls={false} muted/>
           
           

            
            <FormsComment func={props.func} funcRegister={props.funcRegister} />
          </ContainerOficinaSingle>

          <SugesOficina>
            <h1>você também pode gostar...</h1>
            {(Object.values(dataOficinasAleatoire).map(resto =>

              <a href={'https://refugiadonacozinha.com.br/single_oficinas/' + resto.id}>


                <img id="logo" src={`/${resto.imagem}`} alt="Refugiado na cozinha" width={'300'} />


                <h2 key={resto.id}>{resto.titulo} </h2>



              </a>


            ))}

          </SugesOficina>
        </ColumnOficinas>

      </ContainerOficina>


    </div>
  )
}
