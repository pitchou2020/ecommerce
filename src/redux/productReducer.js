import {createSlice} from "@reduxjs/toolkit"
import { GET_PRODUCTS } from "../actions/productAction";

const initialState ={
    items:undefined,
    loading: false,
    error: false
}

export default function productReducer(state = initialState,action){
    switch(action.type){
        case GET_PRODUCTS:
            return action.payload;
            default:
                return state;
    }
 
}
