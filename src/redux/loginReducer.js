import {createSlice} from "@reduxjs/toolkit"
import api from '../config/configApi'

const initialState ={
    usuario :([
        { Email: '' },
        { senha: '' },
      ]),
    items:[],
    loading: false,
    error: false,
    dados:undefined
}

export const loginReducer = createSlice({
    name:"loginReducer",
    initialState,

    reducers:{
        addUser: (state,action)=>{
            state.items = action.payload;       
           },
    },
})

  export function getUser(data,action) {
    return function (dispatch, getState) {
      return api.post('/login.php', data)
        .then(response => {
          dispatch(addUser(response.data)) 
        })
    }
  }

  export const{addUser} = loginReducer.actions
export default loginReducer.reducer