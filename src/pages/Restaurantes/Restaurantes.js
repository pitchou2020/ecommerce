import React from 'react'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import './Restaurantes.css'
import './../Home/css/main.css';
import { useNavigate } from 'react-router-dom'
import Aside from './Aside';
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurantes } from './../../redux/articles/articleReducer'
export default function Restaurantes(props) {
    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))
    const dispatch = useDispatch()
    console.log(props);


    const [items, setItems] = useState([]);



    const [readMore, setReadmore] = useState();
    const LIMIT = 150;
    const toggleBtn = () => {

        //ref.current.classList.remove('carte-restaurante')
        ref.current.classList.add('hide-text');

        setReadmore(prevState => !prevState)
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
        }


        if (articles.length === 0) {
            dispatch(getRestaurantes());
        }

    }, [dispatch, articles]);

    const navigate = useNavigate()

    const ref = useRef();

    const restauranteUnicos = [];
    Object.values(articles).forEach((item) => {
        var duplicated = restauranteUnicos.findIndex(redItem => {
            return item.nome === redItem.nome;
        }) > -1
        if (!duplicated) {
            restauranteUnicos.push(item);
        }

    });
    console.log(articles)
    return (
        <div >
            <div>
                <Aside />


            </div>

            <div className='container-restaurante'>

                {((restauranteUnicos).map(resto =>

                    <div className='carte-restaurante' ref={ref} >

                        <a href={resto.endereco}>


                            <img id="logo" src={`/${resto.imagem}`} alt="Refugiado na cozinha" />


                            <h2 key={resto.id}>{resto.nome} ({resto.pais})</h2></a>
                        <p>{readMore ? resto.descricao : resto.descricao.substr(0, LIMIT)} <button className='btn' onClick={toggleBtn}> {readMore ? 'Mostar menos' : '...Mostrar mais'}</button>  </p>




                    </div>
                ))}

            </div>
        </div>
    )
}
