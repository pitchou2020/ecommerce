import React, { useState, useEffect } from 'react'
import './NavCardapio.css'

import logo from './../../assets/images/estilizado.png'

export default function NavCardapio() {
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
            <div className='section-cardapio'>
               


                <nav className='nav-menu'>
                    <a href="#bebidas" className='active'>Bebidas</a>
                    <a href="#entradas"> Entradas</a>
                    <a href="#pratos">pratos</a>
                    <a href="#rodizio">Ródizio</a>
                    <a href="#sobremesas">Sobremesas</a>
                </nav>

                
            </div>
            <form action="" id="search-form">
                <input type="search" name="" placeholder='pesquisar aqui ' id="search-box" />
                <label htmlFor="search-box" className='fas fa-search'></label>
                <i className="fas fa-times" id="close" onClick={selectClose}></i>
            </form>
        </>
    )
}
