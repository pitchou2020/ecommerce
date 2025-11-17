import React from 'react'
import { useEffect, useRef, useState } from 'react';
import leftChevron from './../../assets/images/SVG/left-arrow.svg'
import rightChevron from './../../assets/images/SVG/right-arrow.svg'

import './Recettes.css'

import Card from './../../composant/Card/Card';
import { useSelector, useDispatch } from 'react-redux'
import { getRecette } from './recettesReducer';
import { getData } from './recettesReducer';
import spinner from "../../assets/spinner.svg"
//import { getRecettesFromAPI } from './recettesReducer';
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import CardDestaque from '../../composant/CardDestaque/CardDestaque';
import Categorie from '../../composant/NavCategorie/Categorie';
import Footer from './../../composant/Footer/Footer'
import NavMenu from '../../composant/navMenu/NavMenu';


import ThemeContextProvider from '../../Context/ThemeContext'


export default function Recettes() {
    const [APIState, setAPIState] = useState({
        loading: false,
        error: true,
        data: undefined
    })


    const dispatch = useDispatch()
    const carousel = useRef(null);

    const recettes = useSelector(state => state.recettesReducer)

    const recetteUnicos = [];
    const categorieUnico = new Map();
    let content
    if (!recettes.data && !recettes.loading && !recettes.error) {
        dispatch(getRecette())
    }
    else if (recettes.loading) {
        content = <img src={spinner} alt='spinning loader' />
    }
    else if (recettes.error) {
        content = <p> An error has occured</p>
    }
    else if (recettes.data) {
        Object.values(recettes.data).forEach((item) => {
            var duplicated = recetteUnicos.findIndex(redItem => {
                return item.titre === redItem.titre;
            }) > -1
            if (!duplicated) {
                recetteUnicos.push(item);
            }

        });
        recettes.data.forEach((cat) => {
            if (!categorieUnico.has(cat.categorie)) {
                categorieUnico.set(cat.categorie, cat)
            }

        });
    }

    const cat = [...categorieUnico.keys()]


    useEffect(() => {

    }, []);
    const ContDirection = document.querySelectorAll(".container-destaque");

    const handleLeft = (e) => {
        e.preventDefault();
        ContDirection.forEach((cont) => {
            if (e.target.dataset.container === cont.dataset.container) {
                cont.scrollLeft -= cont.offsetWidth;
            }

        })

    }
    const handleRight = (e) => {
        e.preventDefault();
        ContDirection.forEach((cont) => {
            if (e.target.dataset.container === cont.dataset.container) {
                cont.scrollLeft += cont.offsetWidth;
            }

        })

    }
    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    return (
        <>
            <NavMenu />

            <Categorie />
            <section className='content'>

                <h1 className="home-title">Receitas</h1>

                {
                    cat.map(result =>
                        <div className="destaqueReceita" data-container={result}>
                            <h1><strong>{result}</strong></h1>
                            <button className='btn-left-recette navigation-button prev-button' onClick={handleLeft}>
                                <img src={leftChevron} alt="" data-container={result} />
                            </button>
                            <button className="btn-right-recette navigation-button next-button" onClick={handleRight} data-container={result}>
                                <img src={rightChevron} alt="next image" />
                            </button>
                            <div className={"container-destaque"} data-container={result} >

                                {recetteUnicos.filter(recette => recette.categorie?.includes(result)).map(item => {
                                    return (
                                        <CardDestaque key={uuidv4()}>
                                            <Link

                                                to={
                                                    `/receita/${item.titre.trim().replace(/\s+/g, '-')}`
                                                }
                                                state={{
                                                    titre: item.titre,
                                                    ingredients: item.ingredients,
                                                    etapes: item.etapes,
                                                    imagem: item.imagem,
                                                    id_recette: item.id_recettes

                                                }}

                                            >
                                                <div className='image'>
                                                    <img id="logo" src={'https://congolinaria.com.br/' + item.imagem} alt="Refugiado na cozinha" />
                                                </div>
                                                <div className='content'>
                                                    <div className='stars'>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                    </div>
                                                </div>
                                                {item.vegan !== "Não vegetariano!" ? <span className='img-vegan'>{item.vegan}</span> : ""}

                                                <h3> {item.titre}  </h3>
                                            </Link>
                                        </CardDestaque>
                                    )
                                })}


                            </div>
                            <div className='ver-tudo'>
                                <Link
                                    to={
                                        `/recettesCategory/${result.trim().replace(/\s+/g, '-')}`
                                    }
                                    state={{
                                        categorie: result
                                    }}>
                                    ver tudo</Link>
                            </div>

                        </div>)}


            </section>
            <Footer />
        </>

    )
}
