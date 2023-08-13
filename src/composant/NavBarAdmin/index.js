import React from 'react'
import { useState } from "react"
import People from './../../pages/Admin/img/people.png'
import Login from '../../pages/Login/Login'
import Pesquisa from '../../pages/Pesquisa/Pesquisa'
import { useNavigate, Link } from 'react-router-dom'
import SidebarProfile from '../SidebarProfile/SidebarPorfile'
import ThemeContextProvider from "../../Context/ThemeContext";
import { useEffect, useRef,useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';

function Index(props) {

  const {theme} = useContext(ThemeContext);
  const {showModal} = useContext(ThemeContext);
  const {toggleModal} = useContext(ThemeContext);

  console.log(props.wind)
  const [isChecked, setIsChecked] = useState();
  const [dataRestaurantes, setDataRestaurantes] = useState([]);
  const [titre, setTitre] = useState();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const navigate = useNavigate()
  const goSearch = () => { navigate("/pesquisa") }

  

  const toggleModalLogin = () => {
    setShowModalLogin(!showModalLogin)
  };
  const btnSearch = () => {
    // setShowModalLogin(!showModalLogin)
    if (props.wind < 576) {
      console.log("isMobile");
      goSearch()

    } else {
      console.log('isDesktop');
      goSearch()

    }

  }

  const getRestaurantes = async () => {
    fetch('https://refugiadonacozinha.com.br/recettes.php')
      .then(response => response.json())
      .then(data => {

        setDataRestaurantes(data);
        setTitre(data.titre)


      })

  }


  useEffect(() => {
    getRestaurantes();

  }, [])

  const recetteUnicos = [];
  Object.values(dataRestaurantes).forEach((item) => {
    var duplicated = recetteUnicos.findIndex(redItem => {
      return item.titre == redItem.titre;
    }) > -1
    if (!duplicated) {
      recetteUnicos.push(item);
    }
  });
  const [filterRecette, setFilterRecette] = useState(recetteUnicos)
  const [search, setSearch] = useState();
  const searchLowerCase = search?.toLowerCase()


  const recettes = recetteUnicos.filter(recette => recette.titre?.toLowerCase().includes(searchLowerCase))
  console.log(!search)
  const valorSearh = e => {
    setSearch(e);
  }

  const modeDark = evt => {
    if (evt.target.checked == true) {
      setIsChecked("dark");
      document.body.classList.add('dark');
    }
    else {
      setIsChecked("no dark");
      document.body.classList.remove('dark');

    }

  }
  console.log(showModal)

  return (
    <>
      {showModalLogin && <Login func={toggleModalLogin} />}

      {!showModalLogin ? <nav>
        <button className='mobile-menu' onClick={props.func} >
          <i class='bx bx-menu' ></i>
        </button>
        <span class="nav-link">Menu</span>

        <form action="#">
          <div class="form-input">
            <input type="search" placeholder="pesquisar no refugiado na cozinha..."
              name="pesquisa"
              value={search}
              onChange={e => valorSearh(e.target.value)} />
            <button type="submit" onClick={btnSearch} class="search-btn"><i class='bx bx-search' ></i></button>
          </div>
        </form>
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
<div className='nav-right'>
        <input type="checkbox" id="switch-mode" hidden value={isChecked} onChange={modeDark} />
        <label for="switch-mode" class="switch-mode"></label>
        <a href="profile" class="notification">
          <i class='bx bxs-bell' ></i>
          <span class="num">8</span>
        </a>
        
          <div onClick={toggleModal} class="profile" >
           <i className="fa-solid fa-user"></i>
            </div>
            </div> 
        


      </nav> : <Login func={toggleModalLogin} />}
<div>{showModal&& <SidebarProfile toggleModal={toggleModal} showModal={showModal}/>}</div>
     

    </>

  )
}

export default Index
