import {createSlice} from "@reduxjs/toolkit"
import api from '../config/configApi'
const initialState ={
    items:[],
    loading: false,
    error: false,
    dados:undefined
}
export const cartReducer = createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
    
        addCarinho: (state,action)=>{
       state.items = action.payload        
      },
        addPost: (state, action) => {
            state.items.push(action.payload);
          },
          editData: (state, action) => {
            state.data.find(el => el.id_produto === action.payload.id_produto)
          },
          updateItemFromSelect: (state, action) => {
            console.log(state.items.find(el => el.id_produto === action.payload.id_produto).qty )
            state.items.find(el => el.id_produto === action.payload.id_produto).quantity = Number(action.payload.value)
          },
          deleteFromCart: (state, action) => {
           console.log(action)
            const indexOfItemToRemove = state.items.findIndex(el => el.id_produto === action.payload)
            state.items.splice(indexOfItemToRemove, 1)
           
          },
          addLoader: (state, action) => {
            state.loading = true
          },
          addError: (state, action) => {
            state.error = true
            state.loading = false
          },
    },
    extraReducers: {
        ["cartReducer/addCarinho"]: (state, action) => {
          state.items.find(el => el.id_carrinho === action.payload.id_carrinho).picked = true
        },
        ["cartReducer/deleteFromCart"]: (state, action) => {
          state.items.find(el => el.id_carrinho === action.payload).picked =false
        }
      }

})

export function getCarrinho() {
  return function (dispatch, getState) {
    api.get('/carrinho.php')
      .then(response => {
        dispatch(addCarinho(response.data))        
      })
  }
};
export function addOneToCart(action) {
  return function (dispatch, getState){
  
    const storeState = getState()
    const isAlreadyPresent = storeState.cartReducer.items.find(el => el.id_produto === action)
    if(!isAlreadyPresent) {
      const itemToAdd = storeState.products.items.find(el => el.id_produto === action)
      
      const newCartItem = {
        ...itemToAdd,
        quantity: 1
      }
      console.log(itemToAdd)
      dispatch(addPost(newCartItem))
    }
  }
}

export function addCart(data,action) {
  return function (dispatch, getState) {
    return api.post('/carrinho.php', data)
      .then(response => {
      dispatch(addOneToCart(action))
      }).catch(() =>
        dispatch(addError()))
  }
}

  export function editProduct(data) {

    return function (dispatch, getState) {
      return api.post('/editar_comment.php', data)
        .then(response => {
          dispatch(editData(data));
  
        }).catch(() =>
          dispatch(addError()))
    }
  }
  
  export function deleteCart(id_carrinho) {
    return function (dispatch) {
      return api.delete("carrinho.php?id=" + id_carrinho)
        .then(response => {    
          console.log(response.data)
          dispatch(deleteFromCart(id_carrinho))
  
        }).catch(() =>
          dispatch(addError()))
    }
  };
export const{addProducts,addPost,addError,deleteData,editData,addCarinho,deleteFromCart,updateItemFromSelect} = cartReducer.actions
export default cartReducer.reducer