import {createSlice} from "@reduxjs/toolkit"
import api from '../../config/configApi'
const initialState ={
    items:undefined,
    loading: false,
    error: false,
    dataItems:[

    ],
}
export const products = createSlice({
    name:"products",
    initialState,
    reducers:{
        addProducts: (state,action)=>{
            state.items = action.payload
        
        },
        
        addPost: (state, action) => {
            //state.data = action.payload
            state.data.push(action.payload);
          },
          editData: (state, action) => {
            state.data.find(el => el.id_produto === action.payload.id_produto)
          },
          deleteData: (state, action) => {
            const indexOfItemToRemove = state.data.findIndex(el => el.id_produto === action.payload)
            state.data.splice(indexOfItemToRemove, 1)
      
          },
    },
    extraReducers: {
        ["cart/createCartItem"]: (state, action) => {
         
         
          state.items.find(el => el.id_produto === action.payload.id_produto).picked = "1"
        },
        ["cart/deleteFromCart"]: (state, action) => {
          state.items.find(el => el.id_produto === action.payload).picked ="0"
        }
      }

})


export function getProductsLists(action){
    return function (dispatch, getState) {
      api.get('/produto.php')
        .then(response => {
          dispatch(addProducts(response.data))
        })
    }
}
export function addProduct(data) {
    console.log(data)
    return function (dispatch, getState) {
      return api.post('/add_comments.php', data)
        .then(response => {
          dispatch(addPost(data));
          console.log(response.data)
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
  
  export function deleteProduct(id_comments) {
    return function (dispatch) {
      return api.post("deletar_comment.php?id=" + id_comments)
        .then(response => {
          dispatch(deleteData(id_comments))
  
        }).catch(() =>
          dispatch(addError()))
    }
  };
export const{addProducts,addPost,addError,deleteData,editData} = products.actions
export default products.reducer