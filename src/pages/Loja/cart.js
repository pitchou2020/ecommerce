import { createSlice } from "@reduxjs/toolkit";
import api from '../../config/configApi'
import axios from "axios";



const initialState = {
  cartItems: [

  ]
}

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createCartItem: (state, action) => {
      const data = action.payload
      console.log(data)
      state.cartItems.push(data)
      console.log(action)
    },
    updateItemFromSelect: (state, action) => {
      state.cartItems.find(el => el.id_produto === action.payload.id_produto).quantity = Number(action.payload.value)
    },
    deleteFromCart: (state, action) => {
     console.log(action)
      const indexOfItemToRemove = state.cartItems.findIndex(el => el.id_produto === action.payload)
      state.cartItems.splice(indexOfItemToRemove, 1)
     
    },
    addData: (state, action) => {
      state.cartItems.push(action.payload)
      
    },
 addLoader: (state, action) => {
      state.loading = true
    },
    addError: (state, action) => {
      state.error = true
      state.loading = false
    },
  }
})

export function getCarrinho(action) {
  return function (dispatch, getState) {
    dispatch(addLoader())
    api.get('/carrinho.php')
      .then(response => {
        dispatch(createCartItem(response.data))
        dispatch(addData(response.data))
        console.log(response.data)
      }).catch(() =>
        dispatch(addError()))
  }
};

export function addOneToCart(action) {
  return function (dispatch, getState){
  
    const storeState = getState()
 
    
    const isAlreadyPresent = storeState.cart.cartItems.find(el => el.id_produto === action)
    
    if(!isAlreadyPresent) {
     
      const itemToAdd = storeState.products.items.find(el => el.id_produto === action)
      
      const newCartItem = {
        ...itemToAdd,
        quantity: 1
      }
      
      //dispatch(createCartItem(newCartItem))
    }
  }
}
export function addCart(data,action) {
 
  return function (dispatch, getState) {
    return api.post('/carrinho.php', data)
      .then(response => {
       // dispatch(addPost(data));

       const storeState = getState()
     
    
       const isAlreadyPresent = storeState.cart.cartItems.find(el => el.id_produto === action)
       
       if(!isAlreadyPresent) {
        
        
         const itemToAdd = storeState.products.items.find(el => el.id_produto=== action)
         
         const newCartItem = {
           ...itemToAdd,
           quantity: 1
         }
         
         dispatch(createCartItem(newCartItem))
       }
      }).catch(() =>
        dispatch(addError()))
  }
}

export function editCart(data) {

  return function (dispatch, getState) {
    return api.post('/editar_comment.php', data)
      .then(response => {
        dispatch(updateItemFromSelect(data));

      }).catch(() =>
        dispatch(addError()))
  }
}

export function deleteCart(id_carrinho) {
  return function (dispatch) {
    return api.post("deletar_carrinho.php?id=" + id_carrinho)
      .then(response => {    
        console.log(response.data)
        dispatch(deleteFromCart(id_carrinho))

      }).catch(() =>
        dispatch(addError()))
  }
};

export const {createCartItem, updateItemFromSelect, deleteFromCart,addError,addLoader,addData} = cart.actions 
export default cart.reducer