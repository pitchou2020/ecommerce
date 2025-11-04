import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import './../Restaurantes/Restaurantes.css'
import './../Home/css/animations.css';
import './../Home/css/main.css';
import './../Home/css/page-landing.css'
import Aside from './../Restaurantes/Aside';
import Navbar from '../../composant/Navbar/Menutopo';
import Footer from '../../composant/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function Oficinas() {
    const [dataRestaurantes, setDataRestaurantes] = useState([]);
    const getRestaurantes = async () => {
        fetch('https://refugiadonacozinha.com.br/oficinas.php')
            .then(response => response.json())
            .then(data => {
                setDataRestaurantes(data.oficinas);
            })

    }
    const [readMore, setReadmore] = useState();
    const LIMIT = 150;
    const toggleBtn = () => {
        setReadmore(prevState => !prevState)
    }

    useEffect(() => {
        getRestaurantes();
    }, [])
    const navigate = useNavigate()
    const goHome = () => { navigate("/") }
    return (
        <div >
            <div>
                <Aside />
            </div>

            <div className='container-restaurante'>


                {(Object.values(dataRestaurantes).map(oficinas =>
                    <div className='carte-restaurante'>
                         <a href= {'/single_oficinas/'+ oficinas.id}>    
                        {/*<a href={oficinas.video}>*/}
                            <img class="animate-up" id="logo" src={`/${oficinas.imagem}`} alt="Refugiado" />

                            <h2 key={oficinas.id}>{oficinas.titulo} </h2></a>
                        <p>{readMore ? oficinas.descricao : oficinas.descricao.substr(0, LIMIT)} <button className='btn' onClick={toggleBtn}> {readMore ? 'Mostar menos' : '...Mostrar mais'}</button>  </p>


                    </div>
                ))}


            </div>
            <Footer />


            <button onClick={goHome} className="create-unidade-congolinaria" title="Voltar"><FontAwesomeIcon icon={faArrowLeft} />Voltar</button>

        </div>
    )
}
