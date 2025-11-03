import { useState } from "react"
import ShoppingCart from "../assets/shopping-cart.svg"
import { useSelector } from "react-redux"
import { createPortal } from "react-dom"

import Cart from "./Cart"
export default function FloatingCartButton() {
  const [showModalCart, setShowModalCart] = useState(false)

  const cart = useSelector(state => state.cart)
console.log(cart)
  return (
    <>
      <button 
      onClick={() => setShowModalCart(!showModalCart)}
      className="carrinho"
      >
        <img className="img-cart" src={ShoppingCart} width= {20}alt="" />
        <span className="num">
          {cart.cartItems.length}
        </span>
      </button>
      {showModalCart &&
        createPortal(
          <Cart onClose={() => setShowModalCart(false)} />,
          document.body
        )}
    </>
  )
}
