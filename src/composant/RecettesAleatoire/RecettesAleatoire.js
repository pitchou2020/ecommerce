import React from 'react'
import './RecettesAleatoire.css'
import { useEffect,useState } from 'react';

import { Link } from 'react-router-dom'

import spinner from './../../assets/images/spinner.gif'

export default function RecettesAleatoire() {

  const [APIState, setAPIState]= useState({
    loading:false,
    error:true,
    data:undefined
  })

  useEffect(()=>{
    setAPIState({...APIState, loading: true})
    fetch("http://localhost/RestoAfrica/src/views/recettesAleatoire.php")
      .then((response) => {
        if(!response.ok) throw new Error()
        return response.json()
      
      })
      .then((data) => {
        setAPIState({loading:false,error:false,data:data})
      })
      .catch(()=>{
        setAPIState({loading:false,error:true,data:undefined})
      })
  },[])
  
 let content;
 if(APIState.loading) content = <img src={spinner} width={100} alt="icone de chargement"/>
 else if(APIState.error) content = <p> Une erreur est survenue</p>
 else if(APIState.data?.length > 0){
  content = 
    
    (APIState.data).map(resto =>
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
        }}>
        <img id="logo" src={'https://refugiadonacozinha.com.br/img_upload/' + resto.imagem} alt="Refugiado na cozinha" width={'300'} />
        <h2 key={resto.id_recettes}>{resto.titre} </h2>
      </Link>
)

 }
 else if(APIState.data?.length===0){
  content = <p></p>
 }
  return (
    <>
    {content}
    </>
  )
}
