import React from 'react'
import Input from '../Input'
import * as C from './styles';
import { useEffect } from 'react';
import { useState } from 'react';
import FormSearch from '../FormSearch';

const Pesquisa = (props) => {
  const [dataRestaurantes, setDataRestaurantes] = useState([]);
  const [titre, setTitre] = useState();
 

  const getRestaurantes = async () => {
    fetch('https://refugiadonacozinha.com.br/recettes.php')
      .then(response => response.json())
      .then(data => {

        setDataRestaurantes(data.recettes);
        setTitre(data.recettes.titre)


      })

  }


  useEffect(() => {
    getRestaurantes();

  }, [])
  const recetteUnicos = [];
  Object.values(dataRestaurantes).forEach((item) => {
    var duplicated = recetteUnicos.findIndex(redItem => {
      return item.titre == redItem.titre;
    }) > -1
    if (!duplicated) {
      recetteUnicos.push(item);
    }
  });
const [filterRecette, setFilterRecette]= useState(recetteUnicos)
const [search, setSearch] = useState();
const searchLowerCase = search?.toLowerCase()


const recettes = recetteUnicos.filter(recette=>recette.titre?.toLowerCase().includes(searchLowerCase))
console.log(!search)

const valorSearh = e => {

  setSearch(e);
}

  return (

    <C.ContainerPesquisa>

      <C.contentPesquisa>
        <C.NavPesquisa>
          <FormSearch funcSearch ={valorSearh} search={search}/>
        </C.NavPesquisa>
        {search && 
        <C.ContentResult>
          
          <ul>
            {(Object.values(recettes).map(resto =>
              <li key={resto.id}>
                <a href= {'https://refugiadonacozinha.com.br/single_recette/'+ resto.id_recettes}>
                <img id="logo" src={`${resto.url_images}`} width={100} alt="Refugiado na cozinha" />
                <p>{resto.titre}</p>
                </a>
              </li>
            ))}
            </ul>
        </C.ContentResult>}
      </C.contentPesquisa>





    </C.ContainerPesquisa>
  )
}

export default Pesquisa
