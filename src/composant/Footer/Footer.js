import React from 'react'
import './footer.css'
import congolinaria from '../../assets/images/horizontal/negativo.png'
import pagamento from '../../assets/images/forma_pagamento.png'
import selo from '../../assets/images/selossl.png'
import Data from '../../data/data'
export default function Footer() {
  return (
    <div className='footer'>

      <div className="box-container">

        <div className="box">
          <h3>Navegar</h3>
          <a href="/sobre"><i class="fa-solid fa-caret-right"></i>
            Sobre Congolinaria </a>
          <a href="/"><i class="fa-solid fa-caret-right"></i>Início</a>
          <a href="/loja"><i class="fa-solid fa-caret-right"></i>Loja</a>
          <a href="/menu-rodizio"><i class="fa-solid fa-caret-right"></i>Cardapio</a>
          <a href="/receitas"><i class="fa-solid fa-caret-right"></i>Receitas</a>
          <a href="/contato"><i class="fa-solid fa-caret-right"></i>Contato</a>
          <a href="/noticias"><i class="fa-solid fa-caret-right"></i>Notícias</a>
          <a href="/#order"><i class="fa-solid fa-caret-right"></i>Orçamento/Festa/Eventos</a>
        </div>
        <div className="box">
          <h3>Central de atendimento</h3>
          <a href="#">+551198045-1471</a>
          <a href="#">pitchouluambo@gmail.com</a>
          <a href="#">congolinaria.sp@gmail.com</a>
          <a href="#">Av. Professor Alfonso Boverso, 382, próximo ao metrô sumaré são paulo</a>
          <a href='#'>RUA CAQUITO 251, PROXIMO AO MERCADO MUNICIPAL PENHA / SP</a>
        </div>

        <div className="box">
          <h3>Redes sociais</h3>
          <a href="https://www.facebook.com/congolinaria"><i class="fa-brands fa-facebook"></i>facebook</a>
          <a href="https://www.instagram.com/congolinaria"><i class="fa-brands fa-instagram"></i>instagram</a>
          <a href="https://www.youtube.com/pitchoubresil"><i class="fa-brands fa-youtube"></i>youtube</a>
          <a href="#"><i class="fa-brands fa-twitter"></i>twitter</a>
          <a href="#"><i class="fa-brands fa-linkedin"></i>linkedin</a>
        </div>

      </div>

      <div className="box-container">

        <div className="box">
          <div className="image">
            <img src={congolinaria} alt="" width={300} />
          </div>
          <div className="content">
            <p>
              O congolinária é um restaurante familiar  que serve comida típica da República Democratica do Congo, privilegiando ingredientes naturais ao invés de industrializados. Sem pretensões de Veganizar os pratos típicos da África, fundado em  2016.  Ficou famoso por ter uma das melhores comidas africanas e veganas de são paulo além proporcionar vitaminas e varios nutrientes ao corpo. Lançamos nossa linha de congelados, petiscos, acompanhamentos, molhos e temperos do chef Pitchou, com intuito  de proporcionar alimentação de qualidade com preço acessível para os nossos clientes dentro de suas casas.
            </p>
          </div>

        </div>
        <div className="box">
          <h3>Forma de pagamento</h3>

          <div className="image">
            <img src={pagamento} alt="" width={300} />
          </div>
        </div>

        <div className="box">
          <h3>Selo de segurança</h3>
          <div className="image">
            <img src={selo} alt="" width={300} />
          </div>
        </div>

      </div>
      <div className="credit">&copy;Copyright @2023 - <span>Congolinaria:Descobrindo Sabores do Congo</span> - Todos os direitos reservados</div>

    </div>
  )
}
