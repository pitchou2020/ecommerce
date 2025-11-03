import React from 'react'
import { useEffect,useState} from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {Container,ConteudoProd,ButtonPrimary} from './styles';

export default function Visualizar(props) {
  console.log(props)

    const[dataCardapio, setDataCardapio] = useState([]);
    const params = useParams();
   const idcad = useState(params.id);
   
   

    useEffect(()=>{
        const getProduto = async ()=>{
            await fetch("https://refugiadonacozinha.com.br/visualizar.php?id="+ idcad)
            .then((response)=> response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                setDataCardapio(responseJson.produto);
            })
        }
        getProduto();
    },[idcad]);

    const navigate = useNavigate()
   const goHome = () => {navigate ("/")}
  return (
    <div>
        <p>Listar</p>
      <Container>
      
    Visualizar Receita
    <ButtonPrimary onClick={goHome}>LISTAR</ButtonPrimary>
      <ConteudoProd>ID : {dataCardapio.id_recettes}</ConteudoProd>
      <ConteudoProd>Pratos : {dataCardapio.titre}</ConteudoProd>
      <ConteudoProd>Infos : {dataCardapio.infos}</ConteudoProd>
      <ConteudoProd>Ingredients : {dataCardapio.ingredients}</ConteudoProd>
      <ConteudoProd>Modo de preparo : {dataCardapio.etapes}</ConteudoProd>
      </Container>
    </div>
  )
}
