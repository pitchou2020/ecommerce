import React from 'react'
import { useEffect, useRef } from 'react';
import { useState } from 'react';


import './Blog.css'
import './../Home/css/main.css';
import Footer from '../../composant/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Aside from './AsideBlog';
import Navbar from '../../composant/Navbar/Menutopo';

export default function Restaurantes() {
    const [dataRestaurantes, setDataRestaurantes] = useState([]);
    const [titre, setTitre] = useState();
    const [categorie, setCategorie] = useState()
    const carousel = useRef(null);
    const UrlBase = 'http://localhost/RestoAfrica/src/views/';
    const getRestaurantes = async () => {
        fetch(UrlBase + 'blog.php')
            .then(response => response.json())
            .then(data => {

                setDataRestaurantes(data);
                setTitre(data.titre)
                setCategorie(data.categorie)
            })

    }


    useEffect(() => {
        getRestaurantes();

    }, []);

    const handleLeftClick = (e)=>{
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
    const handleRightClick = (e)=>{
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
    console.log(dataRestaurantes);
    const navigate = useNavigate()
    const goHome = () => { navigate("/") }
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
    dataRestaurantes.forEach((cat)=>{
        if(!categorieUnico.has(cat.categorie)){
            categorieUnico.set(cat.categorie, cat)
        }

    });
    const cat = [...categorieUnico.keys()]
    console.log(cat);
   
    
    return (
        <div >
           
            <div>
                <Aside />
            </div>
            
           <div className='contenair-categorie'>
           
            <div className='nav-categorie' ref={carousel}>
                
                {
                    cat.map( result => 
                       <div className='item-cat'>
                        <a href="">{result}</a>
                        
                        </div>
                    
                    )
                    
                }


             
             </div>
             
                <button className='btn-left' onClick={handleLeftClick}><i class="fa fa-angle-left"></i></button>
                <button className='btn-right' onClick={handleRightClick}><i class="fa fa-angle-right"></i></button>
            
                </div>
                <h1>BLOG</h1>
        
            <div className='container-blog'>
            
                
                {(Object.values(recetteUnicos).map(resto =>
                    <div className='carte-blog'>                        
                        <a href={'single_blog/' + resto.id_posts}>
                            <img id="logo" src={resto.imagem} alt="Refugiado na cozinha" />
                            {resto.vegan!="Não vegetariano!"?<span className='img-vegan'>{resto.vegan}</span>:""}
                            <h2 key={resto.id}>Receita:<br/>{resto.titre} </h2>
                         
                        </a>
                       <p className='titre-post' key={resto.id}>{resto.title_post}</p>
                    </div>
                    
                    
                ))}
</div>
            </div>




        
    )
}
