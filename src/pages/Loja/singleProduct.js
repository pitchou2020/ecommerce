import React from 'react'
import "./singleProduct.css"
import { useLocation } from 'react-router-dom'
import{useSelector, useDispatch} from "react-redux"
import { getProductsLists } from "./products"
import NavMenu from '../../composant/navMenu/NavMenu';
import pagamento from './../../assets/images/forma_pagamento.png'
import { addOneToCart,addCart, getCarrinho } from "./../../redux/cartReducer";
import leftChevron from './../../assets/images/SVG/left-arrow.svg'
import rightChevron from './../../assets/images/SVG/right-arrow.svg'
import Footer from './../../composant/Footer/Footer'
export default function SingleProduct  ()  {

    const dispatch = useDispatch()
    const location = useLocation()

    const products = useSelector(state=>state.products)
    console.log(products.items)
    const productsUnicos = [];
     
    let content
      if(!products.items && !products.loading && !products.error){
          dispatch(getProductsLists())
      }
      else if(products.loading){
          //content = <img src={spinner} alt='spinning loader'/>
      }
      else if(products.error){
          content = <p> An error has occured</p>
      }
      else if(products.items){
          Object.values(products.items).forEach((item) => {
              var duplicated = productsUnicos.findIndex(redItem => {
                  return item.nome === redItem.nome;
              }) > -1
              if (!duplicated) {
                productsUnicos.push(item);
              }
      
          });
      }

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
    //const newDescricao = location.state.descricao?.replaceAll(".", "<br>")
    //console.log(newDescricao)

var newDescricao = location.state.descricao.split(".");


  return (
    <>
     <NavMenu />

     <section id='content-product'>

<main>
<div class="table-data">
<div className='image'>
<img id="logo" src={'http://localhost/RestoAfrica/src/views/' + location.state.imagem} alt={location.state.nome} />
</div>
<div className='content'>
    <h3>{location.state.nome}</h3>
    <span>R$ {location.state.price}</span>
    {newDescricao.map(desc=><p>{desc}</p>)}
  
    <h3>Como preparar a sua refeição</h3>
<p>Demos três suggestões para preparar a sua refoção usando micro-ondas(1) , manho maria (2) ou deixar na geladeira de um dia por outro.
</p>
<h4>1. Micro – Ondas : </h4>

<p>Coloque o pote mais ou menos 6 minutos  no micro-ondas ( esse tempo pode variar conforme a potência do aprelho).</p>

<h4>2. Banho Maria </h4> 

<p>leve ao fogo uma panela  com água suficiente para cobrir o pote

quando começar a ferver coloque a o pote de congelado na água

Espere  mais ou menos 30 minutos e tire da água. ( cuidado com a temperatura).</p>

<h4>3. Geladeira </h4>

<p>No dia anterior tira o congelado do congelador coloque na geladeira , no dia seguite vai estar descongelado e só aquencer em uma panela. </p>
    </div>
<div className='frete-info'>    
Retire grátis  <br/>em uma unidade do Congolinaria <br/> 
   de Terça Feira a Domingo<br/>
     Das 12h às 17h
    
    <h3>Meios de pagamento:</h3>
    <img src={pagamento} alt="" width={200} />

                          <button
                              onClick={async () => {
                                  const form = {
                                      user_id: 12,
                                      product_id: location.state.id_produto,
                                      qty: 1,
                                      price: location.state.price,

                                  };


                                  //dispatch(addOneToCart(prato.id_produto))
                                  await dispatch(addCart(form, location.state.id_produto)); dispatch(getCarrinho)
                              }} className={`${location.state.picked ? "btn" : "btn"}`}>
                              {location.state.picked === "1" ? "ver carrinho" : "Comprar agora"}</button>

                              <button
                              onClick={async () => {
                                  const form = {
                                      user_id: 12,
                                      product_id: location.state.id_produto,
                                      qty: 1,
                                      price: location.state.price,

                                  };


                                  //dispatch(addOneToCart(prato.id_produto))
                                  await dispatch(addCart(form, location.state.id_produto)); dispatch(getCarrinho)
                              }} className={`${location.state.picked ? "btn" : "btn"}`}>
                              {location.state.picked === "1" ? "ver carrinho" : "Adicionar ao carrinho"}</button>

</div>

</div>
<div className='produto-relacionado'>
<h1>Produtos relacionados</h1>

<div className='contenair-product'>
                <div className="nav-product" >
                    
                
                {(Object.values(productsUnicos).map(produto =>
                    <div className="box">
                        <div className="image">
                            <img src={"http://localhost/RestoAfrica/src/views/"+produto.imagem} alt="" />
                            <a href="#" className="heart">
                                <i class="fa-solid fa-heart"></i>
                            </a>
                        </div>
                        <div className="content">
                            <h3>{produto.nome}</h3>
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
</div>
</main>


     </section>
     <Footer />
    </>
  )
}
