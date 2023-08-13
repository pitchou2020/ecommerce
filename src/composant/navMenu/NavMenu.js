import React, { useState, useEffect } from 'react'
import './NavMenu.css'
import FormSearch from './../../composant/FormSearch';
import SidebarProfile from '../SidebarProfile/SidebarPorfile'
import FloatingCartButton from '../FloatingCartButton';
import { getCarrinho } from '../../redux/cartReducer'
import logo from './../../assets/images/estilizado.png'
import { useSelector,useDispatch } from "react-redux"
import { createPortal } from "react-dom"
import Cart from "./../Cart"
import Login from '../../pages/Login/Login';
import { isEmpty } from '../Utils';

export default function NavMenu() {
    const [showModalCart, setShowModalCart] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [ showLogin, setShowLogin] = useState(false);
    
    const [carousselIndex, setCarousselIndex] = useState("");
    const [titreImagem, setTitreImagem] = useState("");
    let menu = document.querySelector('#menu-bars');
    let navMenu = document.querySelector('.nav-menu');
    
 
const sacola = useSelector(state=>state.cartReducer)
const dispatch = useDispatch()

if(sacola===undefined){
    dispatch(getCarrinho)
}  

    const toggleModal = () => {
        setShowModal(!showModal);
        
        if(showModal==false){
            menu.classList.add('fa-times');

        }
        else{
            menu.classList.remove('fa-times');

        }
      };
const toggleModalLogin=()=>{
    setShowLogin(!showLogin)
}
    const selectMenu = () => {
        setShowModal(!showModal);
       
        if(menu.classList.contains("fa-times")){
            menu.classList.remove('fa-times');
            navMenu.classList.remove('active');

        }
        else{
            menu.classList.add('fa-times');
            navMenu.classList.add('active');
        }
    }
   

    const removeSelectMenu = () => {
        //ativar o item do menu selecionado
        const buttons = document.querySelectorAll('.nav-menu a')
        

        let url = window.location.href;
        buttons.forEach((button) => {           

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
    }
    document.addEventListener("click", fecharNavBar)

        function fecharNavBar(){
            if(menu.classList.contains("fa-times")){
                menu.classList.remove('fa-times');
                navMenu.classList.remove('active')
             console.log("sim")
            }
           
      
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
               
                    {/*<i className="fas fa-bars" id='menu-bars' onClick={selectMenu}></i>*/}
                    <i className="fas fa-bars" id='menu-bars' onClick={toggleModal}></i>
                    
                    <i className="fas fa-search" id='search-icon' onClick={selectSearch}></i>
                    <a href="#" className='heart'>
                        <i class="fa-solid fa-heart"></i>
                    </a>
                    {/*<FloatingCartButton/>*/}
                   <button class="notification" onClick={() => setShowModalCart(!showModalCart)}>
                   <i className='fas fa-shopping-cart' ></i>
                   <span className="num">{(sacola.items) && sacola.items.length}</span>
                   </button>
                  
                   {showModalCart &&
        createPortal(
          <Cart sacola={sacola.items} onClose={() => setShowModalCart(false)} />,
          document.body
        )}
                    <i className="fa-solid fa-user" onClick={toggleModalLogin}></i>
{showLogin && <Login onClose={() => setShowLogin(false)} />}
                </div>
            </header>
            <form action="" id="search-form">
                <input type="search" name="" placeholder='pesquisar aqui ' id="search-box" />
                <label htmlFor="search-box" className='fas fa-search'></label>
                <i className="fas fa-times" id="close" onClick={selectClose}></i>
            </form>
            {showModal&& (<div>
             <nav className='menu-responsive'>
                    <a href="/" className='active' onClick={toggleModal} >Início</a>
                    <a href="/loja" onClick={toggleModal} >Loja</a>
                    <a href="/menu-rodizio" onClick={toggleModal} >Cardapio</a>
                    <a href="/receitas" onClick={toggleModal} >Receitas</a>
                    <a href="/contato" onClick={toggleModal} >Contato</a>
                    <a href="/sobre" onClick={toggleModal} >Sobre</a>
                    <a href="/noticias" onClick={toggleModal} >Notícias</a>
                    <a href="/#order" onClick={toggleModal} >Orçamento/festa/Eventos </a> 
                </nav>
            </div>)}
           
        </>
    )
}
