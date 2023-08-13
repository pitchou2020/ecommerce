
import './style.css'

import React, {useRef, useLayoutEffect, useState, useEffect,useContext} from 'react'

import People from './img/people.png'
import Dashbord from './dashbord'
import NavBarAdmin from './../../composant/NavBarAdmin'
import SidebarAdmin from './../../composant/sidebarAdmin'
import ListarRecette from './../ListarRecettesCuisineLibre'
import ThemeContextProvider from "./../../Context/ThemeContext";
import {ThemeContext} from "./../../Context/ThemeContext";

//import "./script";

function Admin(props){
	
	const [dataRestaurantes, setDataRestaurantes] = useState([]);
	const [dataUsuarios, setDataUsuarios]= useState([]);
    const [titre, setTitre] = useState();
    const [categorie, setCategorie] = useState()
	const [numRecettes, setNumRecettes] = useState()
    const carousel = useRef(null);
    const UrlBase = 'https://refugiadonacozinha.com.br/';

    const{withBrowser,Protected,isLoggedIn} = useContext(ThemeContext)
    console.log(isLoggedIn==='administrador')
    console.log(Protected)
	
	
 	
    const getRestaurantes = async () => {
        fetch(UrlBase + 'recettes.php')
            .then(response => response.json())
            .then(data => {
                console.log(data.length)

                setDataRestaurantes(data);
                setTitre(data.titre)
                setCategorie(data.categorie)
            })

    }

	const getusuarios = async () => {
        fetch(UrlBase + 'usuarios.php')
            .then(response => response.json())
            .then(data => {
                console.log(data.length)

                setDataUsuarios(data);
            })

    }

    useEffect(() => {
     
        getRestaurantes();
		getusuarios();

    }, []);
   
  return (
    <>
    <ThemeContextProvider>
<SidebarAdmin/>
</ThemeContextProvider>
<section id='content'>
        
        <NavBarAdmin  />

	
		
		<Dashbord numRecettes={dataRestaurantes.length } usuarios = {dataUsuarios} func={getusuarios}/>
    </section>
		
	
    </>
    
  )
}

export default Admin

