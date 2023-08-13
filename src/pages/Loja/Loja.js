import React, { useState, useEffect } from 'react'
import './Loja.css';
import chapati from './../../assets/images/pratos/chapati.jpg'
import feijoada from './../../assets/images/pratos/feijoada.jpg'
import arroz from './../../assets/images/pratos/arroz-pilao.jpg'
import kachori from './../../assets/images/pratos/kachori.jpeg'
import kuku from './../../assets/images/pratos/kuku.jpg'
import mafe from './../../assets/images/pratos/mafe-veg.jpg'
import moqueca from './../../assets/images/pratos/moqueca.jpg'
import ndeke from './../../assets/images/pratos/ndeke.jpg'

import Footer from '../../composant/Footer/Footer'
import sliderData from '../../data/sliderData';
import Pitchou from './../Admin/img/people.png'
import NavMenu from '../../composant/navMenu/NavMenu';
import Slider from '../../composant/Slider/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsLists } from './products';
import ProductsList from './ProductsList';
import FloatingCartButton from '../../composant/FloatingCartButton';
import { isEmpty } from '../../composant/Utils';
import leftChevron from './../../assets/images/SVG/left-arrow.svg'
import rightChevron from './../../assets/images/SVG/right-arrow.svg'


export default function Loja() {

    const ContDirection = document.querySelectorAll(".nav-product");
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

    return (
        <>
            <NavMenu />
            <Slider />
            <section className="diches" id='dishe'>
                <h3 className="sub-heading">Nossa Loja</h3>
               {<ProductsList/>}
            </section>
            <section className='about' id='about'>
                <h3 className="sub-heading">Congolinaria</h3>
                <h1 className="heading">Restaurantes</h1>
                <div className="row">
                    <div className="image">
                        <img src={ndeke} alt="" />
                    </div>
                    <div className="content">
                        <h3>CONGOLINARIA ZO </h3>
                        <p>AVENIDA PROFESSOR ALFONSO BOVERO , PROXIMO AO METRÔ SUMARÉ , LINHA VERDE / SP</p>
                        <p>
                            CONGOLINARIA DO ALFONSO BOVERO é a nossa unidade tradicional. Desde o início de 2017 com uma loja fixa, cravamos o congolinaria na avenida  no andar de cima da fatiado discos, já  virou uma  referência do turismo, moda e gastronomia congolesa em são paulo. O horário de terça a domingo é das 11h às 22h.
                        </p>

                        <h3>CONGOLINARIA ZL </h3>
                        <p>RUA CAQUITO 251, PROXIMO AO MERCADO MUNICIPAL PENHA / SP</p>
                        <p>O  CONGOLINARIA DA RUA CAQUITO é nossa primeira unidade na Zona Leste, uma verdadeira reprodução da experiência do Alfonso. A mesma atmosfera, mesmo cardápio, mesmo atendimento, com um salão, onde acontece mensalmente os bailes e com DJs convidados. Nossa unidade da penha  oferece nosso cardápio completo rodízio , a la carte, drinks, sucos tipicos e sobremesas.  O horário de terça a domingo é das 11h às 22h.. Entrega pelo Ifood .</p>
                        <div className="icons-container">
                            <div className="icons">
                                <i class="fas fa-shipping-fast"></i>
                                <span>DELIVERY DE COMIDA CONGOLESA</span>
                            </div>
                            <div className="icons">
                                <i class="fa-solid fa-utensils"></i>
                                <span>RODIZIO DE COMIDA CONGOLESA</span>
                            </div>
                            <div className="icons">
                                <i class="fas fa-headset"></i>
                                <span>FUNCIONAMENTO: terça a domingo  das 11h às 22h.</span>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            <section className="menu" id="menu">
                <h3 className="sub-heading">Nosso Menu</h3>
                <h1 className="heading">
                    hoje é dia da specialidade
                </h1>
                <div className='contenair-product'>
                <div className="nav-product" >
                {(Object.values(sliderData).map(prato =>
                    <div className="box">
                        <div className="image">
                            <img src={prato.imagem} alt="" />
                            <a href="#" className="heart">
                                <i class="fa-solid fa-heart"></i>
                            </a>
                        </div>
                        <div className="content">
                            <h3>{prato.titre}</h3>
                        </div>
                    </div>
                    ))}
                </div>
                <button className='navigation-button-product prev-button' onClick={handleLeft}>
                        <img src={leftChevron} alt="" />
                    </button>
                    <button className="navigation-button-product next-button" onClick={handleRight} >
                        <img src={rightChevron} alt="next image" />
                    </button>
                    </div>
            </section>
            <section className="review" id="review">
                <div className="review-slider">
                    <div className="wrapper">
                        <div className="slide">
                            <i className="fas fa-quote-right"></i>
                            <div className="user">
                                <img src={Pitchou} alt="" width={100} />
                                <div className="user-info">
                                    <h3>Pitchou Luambo</h3>
                                    <span>Chef do congolinaria</span>
                                    <div className="stars">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <p>“Congolinária é a possibilidade de mostrar para as pessoas a história que os brasileiros desconhecem.
                                Falamos da cultura africana (da congolesa, principalmente),
                                da gastronomia, dos direitos dos animais, da situação dos refugiados…
                                Os visitantes entram, comem e saem diferentes”</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
