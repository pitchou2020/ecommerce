import React from 'react'
import { useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid'
import Card from './../../composant/Card/Card';
import { useNavigate } from 'react-router-dom'
import './Recettes.css'

import { getArticles } from './../../redux/articles/articleReducer'
import { getRecette } from '../Recettes/recettesReducer';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import ThemeContextProvider from "../../Context/ThemeContext";
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import Categorie from '../../composant/NavCategorie/Categorie';
import NavMenu from '../../composant/navMenu/NavMenu';

export default function RecettesCategory(props) {

    const { theme } = useContext(ThemeContext);
    const { showModal } = useContext(ThemeContext);
    const { toggleModal } = useContext(ThemeContext);

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))

    const recette = useSelector(state=>state.recettesReducer)
 
    const dispatch = useDispatch()
    const location = useLocation()

    const carousel = useRef(null);



    useEffect(() => {

        if (articles.length === 0) {
            dispatch(getArticles());
        }

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
    const navigate = useNavigate()
    const goHome = () => { navigate("/") }
    const recetteUnicos = [];
    const categorieUnico = new Map();

    Object.values(articles).forEach((item) => {
        var duplicated = recetteUnicos.findIndex(redItem => {
            return item.titre == redItem.titre;
        }) > -1
        if (!duplicated) {
            recetteUnicos.push(item);
        }

    });
    articles.forEach((cat) => {
        if (!categorieUnico.has(cat.categorie)) {
            categorieUnico.set(cat.categorie, cat)
        }

    });
    const cat = [...categorieUnico.keys()]

    const recettes = recetteUnicos.filter(recette => recette.categorie?.includes(location.state.categorie))

    return (
        <>
            <NavMenu />
            <Categorie />

            <section className='content'>



                <h1 className="home-title">{location.state.categorie}</h1>
                <div className='container-recette'>


                    {(Object.values(recettes).map(item =>

                        <Card key={uuidv4()}>
                            <Link

                                to={
                                    `/receita/${item.titre.trim().replace(/\s+/g, '-')}`
                                }
                                state={{
                                    titre: item.titre,
                                    ingredients: item.ingredients,
                                    etapes: item.etapes,
                                    imagem: item.imagem
                                }}

                            >
                                <div className='image'>
                                    <img id="logo" src={'https://congolinaria.com.br/img_upload/' + item.imagem} alt="congolianria" />
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
                                {item.vegan != "Não vegetariano!" ? <span className='img-vegan'>{item.vegan}</span> : ""}

                                <h3> {item.titre}  </h3>
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>
        </>

    )
}
