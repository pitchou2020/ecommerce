import React from 'react'
import { useEffect,useState} from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {Container,ConteudoProd,ButtonPrimary} from './styles';

export default function Deletar(props) {

    const[dataCardapio, setDataCardapio] = useState([]);
    const params = useParams();
   const idcad = useState(params.id); 

    useEffect(()=>{
        const getProduto = async ()=>{
            await fetch("https://refugiadonacozinha.com.br/deletar?id="+ idcad)
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
      
    Visualizar Menu
    <ButtonPrimary onClick={goHome}>LISTAR</ButtonPrimary>
      <ConteudoProd>ID : {dataCardapio.id_cardapio}</ConteudoProd>
      <ConteudoProd>Pratos : {dataCardapio.pratos}</ConteudoProd>
      <ConteudoProd>Descricao : {dataCardapio.descricao}</ConteudoProd>
      <ConteudoProd>Preço : {dataCardapio.preco}</ConteudoProd>
      <ConteudoProd>Status : {dataCardapio.status}</ConteudoProd>
      </Container>
    </div>
  )
}
