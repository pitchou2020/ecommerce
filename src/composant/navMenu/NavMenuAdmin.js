import React, { useState, useEffect } from 'react'
import './NavMenu.css'
import FormSearch from './../../composant/FormSearch';

import logo from './../../assets/images/estilizado.png'

export default function NavMenuAdmin() {
    const [carousselIndex, setCarousselIndex] = useState("");
    const [titreImagem, setTitreImagem] = useState("");
    let menu = document.querySelector('#menu-bars');
    let navMenu = document.querySelector('.nav-menu');

    const selectMenu = () => {
        menu.classList.add('fa-times');
        navMenu.classList.add('active')
    }
    let section = document.querySelectorAll('section');
    let navLink = document.querySelectorAll('.nav-menu a')

    const removeSelectMenu = () => {
        //ativar o item do menu selecionado
        const buttons = document.querySelectorAll('.nav-menu a')
        

        let url = window.location.href;
        buttons.forEach((button) => {
            button.classList.remove("active")
            

            if (button.href === url) {
                button.classList.add("active")
            }
            else if (button.href != url) {
                button.classList.remove("active")

            }
        })
    }
    useEffect(() => {

        removeSelectMenu()

    }, [removeSelectMenu]);

    /*window.onscroll=()=>{
        menu.classList.remove('fa-times');
        navMenu.classList.remove('active')
    }*/

    const selectSearch = () => {
        document.querySelector('#search-form').classList.add('active');
    }
    const selectClose = () => {
        document.querySelector('#search-form').classList.remove('active');
    }
    return (
        <>
            <header>
                <a href="#" className='logo'> <img src={logo} alt="" /></a>


                <nav className='nav-menu'>
                    <a href="/" className='active'>Início</a>
                    <a href="/loja">Loja</a>
                    <a href="/menu-rodizio">Cardapio</a>
                    <a href="/receitas">Receitas</a>
                    <a href="/contato">Contato</a>
                    <a href="/sobre">Sobre</a>
                    <a href="/noticias">Notícias</a>
                    <a href="/#order">Orçamento/festa/Eventos </a>
                </nav>
                <FormSearch/>
                <div className="icons">
               
                    <i className="fas fa-bars" id='menu-bars' onClick={selectMenu}></i>
                    <i className="fas fa-search" id='search-icon' onClick={selectSearch}></i>
                    <a href="#" className='heart'>
                        <i class="fa-solid fa-heart"></i>
                    </a>
                    <a href="#" className='fas fa-shopping-cart'></a>
                    <i className="fa-solid fa-user"></i>

                </div>
            </header>
            <form action="" id="search-form">
                <input type="search" name="" placeholder='pesquisar aqui ' id="search-box" />
                <label htmlFor="search-box" className='fas fa-search'></label>
                <i className="fas fa-times" id="close" onClick={selectClose}></i>
            </form>
        </>
    )
}
