import api from '../config/configApi'

export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const EDIT_POSTS = "EDIT_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";

export function getCarrinho() {
    return function (dispatch) {
      api.get('/carrinho.php')
        .then(response => {
          dispatch({type:GET_POSTS , payload: response.data})
        })
    }
  };

  export function addCart(data) {
    return function (dispatch) {
      return api.post('/carrinho.php', data)
        .then(response => {
          console.log(response)
          console.log(response.data)
          if(response.data!="carrinho alterado com successo"){
         // dispatch(addPost(data));
         dispatch({type:ADD_POSTS , payload: data})}
         
        
        })
    }
  }
  
  export function editCart(data) {
  
    return function (dispatch, getState) {
      return api.post('/carrinho.php', data)
        .then(response => {
          dispatch({type:EDIT_POSTS , payload: data})
        })
    }
  }
  
  export function deleteCart(id_carrinho) {
    return function (dispatch) {
      return api.post("deletar_carrinho.php?id=" + id_carrinho)
        .then(response => {   
          console.log(response) 
          dispatch({type:DELETE_POSTS , payload: id_carrinho})
         
  
        })
    }
  };