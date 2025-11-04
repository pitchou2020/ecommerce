import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { adicionarItem, deleteFromCart, atualizarQuantidadeItem, getCarrinho, getUsersLists } from './../redux/cartReducer';

import { useNavigate } from 'react-router-dom'
import spinner from "../assets/spinner.svg"
import "./Cart/Cart.css"
import axios from "axios"
import { isEmpty } from "./Utils"
export default function Cart({ onClose,sacola }) {
  const cart = useSelector(state => state.cartReducer)
  const carrinhos = useSelector(state=> state.products)
  //const sacolas = useSelector(state => state.carrinhoReducer.js)
  const dispatch = useDispatch()

  const carrinhoUser = [];
  let content;

  const navigate = useNavigate()
  const goCarrinho = () => {navigate ("/carrinho/")}
  
  const [carrinho, setCarrinho]= useState({
    imagem:'',
    titre:'',
    quantidade:'',
    price:''
  })
  const [imagem, setImagem]= useState([])
  const[product_id,setProduct_id]=useState([])
  const [quantidade, setQuantidade]= useState([])
  const[price,setPrice]=useState([])
  const newTitre =[]
  const newImagem =[]
  const newQuantidade =[]
  const newPrice =[]

  const addCArrinho=()=>{

   cart.cartItems.map(el=>{
    newTitre.push(el.id_produto)
    newImagem.push(el.imagem)
    newQuantidade.push(el.quantity)
    newPrice.push(el.price)
    console.log(newTitre)
   })
   setImagem(newImagem)
    setProduct_id(newTitre)
    console.log(product_id)
    setQuantidade(newQuantidade)
    setPrice(newPrice)
    for (var i = 0; i < cart.cartItems.length; i++) {
    const form ={
      user_id:12,
      product_id: product_id[i],
      qty:quantidade[i],
      price: price[i],
  }
  
  /*let endpoint = "http://localhost/RestoAfrica/src/views/add_carrinho.php";
   axios.post(endpoint,form)
  .then((response)=>{
      console.log(response.data)
      
  }).catch((err)=>{
      
  })*/
 dispatch(adicionarItem(form,product_id))
  //dispatch(addCart(form,product_id))
  //goCarrinho()
  
  }
}
const addNum =()=>{
  const plus = document.querySelector(".plus")
  const minus = document.querySelector(".minus")
  const num = document.querySelector(".num")
  let a = 1;
 
   
    //console.log( a++);
  
}

  return (
    <div onClick={onClose} className="carossel" >
      <div
        onClick={e => e.stopPropagation()}
        className="box-carossel"
      >
        <button
          onClick={onClose}
          className="btn-close"
        >
          X
        </button>

        <table>
          <thead>
            <tr>

              <th></th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Subtotal</th>

              <th>Ação</th>
            </tr>
          </thead>
          {console.log(sacola)}
          {!isEmpty (sacola) && sacola.length > 0 ? (
            sacola.map(el => (
              <tbody key={el.id_produto} >
                {console.log(el)}
                <td data-imagem = {el.imagem}>
                  <img

                  src={"http://localhost/RestoAfrica/src/views/"+el.imagem} width={30}
                  alt={el.titre}
                /></td>
                <td data-titre ={el.titre}><p >{el.nome}</p></td>

                <td data-quantidade={el.quantity} className="quantity">
                  
                  <input
                  name="quantity"
                  min="1" 
                  type="number"
                  onChange={e => dispatch(atualizarQuantidadeItem({ value: e.target.value, id_produto: el.id_produto }))}
                  value={el.quantity}>
                </input>
                
                </td>
               
                <td data-price={el.price}>R$ {(el.price) * el.quantity}</td>
                <td>
                
                  <button
                    onClick={() =>{ dispatch(deleteFromCart(el.id_carrinho))
                    dispatch(getCarrinho())}
                    
                    
                    }>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>

              </tbody>

            ))
          ) : (
            <p className="mb-4">Seu carrinho está vazio....</p>
          )}
          <tr>
            <td></td>
            <td></td>
            <td><p className="text-xl">
              Total :{" "}

            </p></td>
            <td>
              <span className="font-semibold">
                R$ {sacola
                  .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                  .toFixed(2)}

              </span>
            </td>
          </tr>
        </table>

        <div className="btn-carrinho">
          <button onClick={addCArrinho}> Ver carrinho </button>
          <button >Finalizar Compra </button>
        </div>

      </div>
    </div>
  )
}
