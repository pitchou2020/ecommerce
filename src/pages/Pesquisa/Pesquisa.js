import React from 'react'
import { useEffect, useRef } from 'react';
import { useState } from 'react';


import './Pesquisa.css'
import './../Home/css/main.css';
import Footer from '../../composant/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Aside from './Aside';
//import Navbar from '../../composant/Navbar/Menutopo';
import NavBarAdmin from '../../composant/NavBarAdmin'
import SidebarSite from '../../composant/sidebarSite'
import './../Admin/style.css'
import FormSearch from '../../composant/FormSearch';
import Pesquisaform from '../../composant/PesquisaMobile';

export default function Pesquisa(props) {
    
    
    const [dataRestaurantes, setDataRestaurantes] = useState([]);
    const [titre, setTitre] = useState();
    const [categorie, setCategorie] = useState()
    const carousel = useRef(null);
    const UrlBase = 'https://refugiadonacozinha.com.br/';
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


    useEffect(() => {
        getRestaurantes();

    }, []);

    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
    console.log(dataRestaurantes);
    const navigate = useNavigate()
    const goRecette = () => { navigate("/recettes") }
    const recetteUnicos = [];
    const categorieUnico = new Map();

    Object.values(dataRestaurantes).forEach((item) => {
        var duplicated = recetteUnicos.findIndex(redItem => {
            return item.titre == redItem.titre;
        }) > -1
        if (!duplicated) {
            recetteUnicos.push(item);
        }

    });
    dataRestaurantes.forEach((cat) => {
        if (!categorieUnico.has(cat.categorie)) {
            categorieUnico.set(cat.categorie, cat)
        }

    });
    const cat = [...categorieUnico.keys()]
    console.log(cat);

    console.log(props.win)


    const [filterRecette, setFilterRecette] = useState(recetteUnicos)
    const [search, setSearch] = useState();
    const searchLowerCase = search?.toLowerCase()


    const recettes = recetteUnicos.filter(recette => recette.titre?.toLowerCase().includes(searchLowerCase))
    console.log(!search)

    const valorSearh = e => {

        setSearch(e);
    }
    return (
        <>
     <section id='content-pesquisa'>
        <div className='nav-pesquisa'>
        <button onClick={goRecette}>
        <i class="fa-solid fa-arrow-left"></i>
                </button>
        
     <FormSearch funcSearch ={valorSearh} search={search}/></div>
                {search &&
                    <div className='pesquisa'>
                        <ul >
                            {(Object.values(recettes).map(resto =>
                                <li key={resto.id}>
                                    <a href={'https://refugiadonacozinha.com.br/single_recette/' + resto.id_recettes}>
                                        <img id="logo" src={resto.imagem} width={100} alt="Refugiado na cozinha" />
                                        <p>{resto.titre}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>}
                <div className='contenair-categorie'>
                </div>
                <div className='container-recette'>

                    {(Object.values(recetteUnicos).map(resto =>

                        <div className='carte-recette'>
                            <a href={'single_recette/' + resto.id_recettes}>
                                <img id="logo" src={resto.imagem} alt="Refugiado na cozinha" />
                                {resto.vegan != "Não vegetariano!" ? <span className='img-vegan'>{resto.vegan}</span> : ""}
                                <h2 key={resto.id}>{resto.titre} </h2>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </>

    )
}
