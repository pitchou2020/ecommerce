import {createSlice} from "@reduxjs/toolkit"
import { ADD_POSTS, DELETE_POSTS, EDIT_POSTS, GET_POSTS } from "../actions/carrinhoAction";

const initialState ={
    items:undefined,
    loading: false,
    error: false
}

export default function carrinhoReducer(state = initialState,action){
    switch(action.type){
        case GET_POSTS:
            return action.payload;
        case ADD_POSTS:
            return [action.payload, ...state];
            
        case EDIT_POSTS:
            return state.map((post)=>{
                if(post.id_carrinho === action.payload.id_carrinho){
                    return{
                    ...post,
                    qty:action.payload.qty
                };
                } else return post;
            });
        case DELETE_POSTS:
            return state.filter((post)=>post.id_carrinho!=action.payload);
            default:
                return state;
    }
 
}
