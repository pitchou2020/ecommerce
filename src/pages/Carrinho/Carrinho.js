import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import spinner from "../../assets/spinner.svg"
import { updateItemFromSelect, deleteFromCart, addCart,getCarrinho,deleteCart } from './../../redux/cartReducer'
import { useNavigate } from 'react-router-dom'
import NavMenu from '../../composant/navMenu/NavMenu';
import Footer from './../../composant/Footer/Footer'
import "./Carrinho.css"

export default function Carrinho() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [quantidade,setQuantidade] =useState();
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  })

  const carrinho = useSelector(state => state.cartReducer)
  const carrinhoUser = [];
  let content;

  if (!carrinho.items && !carrinho.loading && !carrinho.error) {
    dispatch(getCarrinho())
  }
  else if (carrinho.loading) {
    content = <img src={spinner} alt='spinning loader' />
  }
  else if (carrinho.error) {
    content = <p> An error has occured</p>
  }

  else if (carrinho.items) {
    Object.values(carrinho.items).forEach((item) => {
      carrinhoUser.push(item);
    });

  }

  useEffect(() => {

  }, []);
console.log(carrinhoUser)
 let a =1;
  const plus = document.querySelector(".quantity-up")
    const minus = document.querySelector(".minus")
    //const num = document.querySelector(".num")
    let inputs= document.querySelectorAll(".quantity input")
    let num = document.querySelector(".quantity input")
    
  const addNum =(e)=>{
    const put = e.currentTarget   
    
   a++
     ///a=(a<10)?"0"+a:a;
    const  input = put.parentElement.children[0]
     put.parentElement.children[0].value = a
      console.log(input);
  }

  const sobNum = (e)=>{
    const put = e.currentTarget  
    if(a>1){
      a--;
     // a=(a<10)?"0"+a:a;
     const  input = put.parentElement.children[0]
     put.parentElement.children[0].value = a
      console.log(input);
    }
   
  }
  return (
    <>
       <NavMenu />
      <section id='content-carrinho'>
        <main>
          <div className='table-data'>
            <div className="order">
              <h3>Produtos</h3>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>

                  {(carrinhoUser && carrinhoUser).map(el =>
                    <tr key={el.id_carrinho}>
                      <td>
                        <button
                          onClick={() => dispatch(deleteCart(el.id_carrinho))}
                          className="bg-slate-900 text-slate-200 px-2 inline-flex items-center justify-center rounded p-2">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                      <td>
                        <img id="logo" src={"http://localhost/RestoAfrica/src/views/" + el.imagem} width={'300'} alt="Refugiado na cozinha" />
                      </td>
                      <td> {el.nome}</td>
                      <td> {el.price}</td>
                      <td data-quantidade={el.qty}>
                       <div className="quantity">
                       
                        <input
                  name="quantity"
                  min="1" 
                  type="number"
                
                  onChange={e => dispatch(updateItemFromSelect({ value: e.target.value, id_produto: el.id_produto }))}
                 value={el.quantity}
                  //value ={2}
                  >
                </input>               
                  
                  </div>
                </td>
                <td data-price={el.price}>R$ {(el.price) * el.quantity}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='resumo'>
              <h3>Resumo de compra</h3>
              <table>
                <tr>
                  <td>Produtos</td>
                  <td>
                  <span className="font-semibold">
                R$ {carrinhoUser
                  .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                  .toFixed(2)}

              </span>
                  </td>
                </tr>
                <tr>
                  <td>Entrega</td>
                  <td>Retire </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                  <span className="font-semibold">
                R$ {carrinhoUser
                  .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                  .toFixed(2)}

              </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <button className='btn'
                    >
                      {"continuar a compra"}</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </>
  )
}