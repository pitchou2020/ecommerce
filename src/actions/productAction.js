import api from '../config/configApi'

export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCTS = "ADD_PRODUCTS";

export function getProductsLists() {
    return function (dispatch) {
      api.get('/produto.php')
        .then(response => {
          dispatch({type:GET_PRODUCTS , payload: response.data})
        }).catch(() =>
        console.log("An error has occured"))
    }
  };

  export function addProduct(data) {
    return function (dispatch) {
       api.post('/produto.php', data)
        .then(response => {
         // dispatch(addPost(data));
         dispatch({type:ADD_PRODUCTS , payload: data})
         
        })
    }
  }
  
  export function editCart(data) {
  
    return function (dispatch, getState) {
      return api.post('/carrinho.php', data)
        .then(response => {
          
  
        })
    }
  }
  
  export function deleteCart(id_carrinho) {
    return function (dispatch) {
      return api.post("deletar_carrinho.php?id=" + id_carrinho)
        .then(response => {    
          console.log(response.data)
         
  
        })
    }
  };