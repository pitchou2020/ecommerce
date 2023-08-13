import React from 'react'
import Sidebar from '../../composant/Sidebar/Sidebar'
import Navbar from '../../composant/Navbar/Menutopo'
import Footer from '../../composant/Footer/Footer'
import NavBarAdmin from './../../composant/NavBarAdmin'
import SidebarSite from './../../composant/sidebarSite'
import ThemeContextProvider from '../../Context/ThemeContext'
import "./sobre.css"


export default function Sobre(props) {
  return (
    <>    
    <ThemeContextProvider>
    <SidebarSite/>
    </ThemeContextProvider>
<section id='content'>
        
        <NavBarAdmin  />
      <div className="container-sobre">
      <div className='carte-sobre'>
        
        <h1>REFUGIADOS NA COZINHA</h1>
        <p>
        A comida, que nutre, e a cozinha, que aproxima e acolhe as pessoas, são ferramentas importantes nesse processo de aprendizado sobre a cultura daquele que vem de fora. Nosso projeto pretende também levar a uma troca de informações sobre os costumes, uma vez que haverá, antes das oficinas de culinária propriamente ditas, um encontro voltado aos cozinheiros e cozinheiras, com foco em hábitos e higiene na cozinha no Brasil e outro encontro, para todos os participantes, onde serão apresentados a cultura alimentar de cada um dos três países, abordando hábitos e ingredientes entre outros aspectos. Esses encontros permitirão também a troca de informações com os participantes.  
        </p>
        <p>
        O projeto Refugiados na Cozinha propõe a realização de uma oficina de culinária de três países de diferentes regiões da África – Moçambique, África do Sul e República Democrática do Congo - com presença de refugiados e refugiadas na cidade de São Paulo. As oficinas de culinária são voltadas a pessoas interessadas em aprender sobre a cultura alimentar desses países e a preparar alguns pratos, de sabores e ingredientes diferenciados.
        </p>
       
      </div>
      </div>
    </section>
    </>
  )
}
