import React from 'react'
import api from './../../config/configApi'
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  data: undefined,
  error: false
}

export const recettesReducer = createSlice({
  name: "recettes",
  initialState,
  reducers: {

    addData: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    addPost: (state, action) => {
      //state.data = action.payload
      state.data.push(action.payload);
    },
    addStar:(state, action)=>{
      state.data.push(action.payload);
    },
    editData: (state, action) => {
      state.data.find(el => el.id === action.payload.id)
    },
    deleteData: (state, action) => {
      const indexOfItemToRemove = state.data.findIndex(el => el.id === action.payload)
      state.data.splice(indexOfItemToRemove, 1)

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

export function getRecette(action) {
  return function (dispatch, getState) {
    dispatch(addLoader())

    api.get('/recettes.php')
      .then(response => {
        dispatch(addData(response.data))
        console.log(response.data)
      }).catch(() =>
        dispatch(addError()))
  }
}
export function addRecette(data) {
  console.log(data)
  return function (dispatch, getState) {
    return api.post('/add_recette.php', data)
      .then(response => {
        dispatch(addPost(data));
        console.log(response.data)
      }).catch(() =>
        dispatch(addError()))
  }
}
export function editRecette(data) {

  return function (dispatch, getState) {
    return api.post('/editar_recette.php', data)
      .then(response => {
        dispatch(editData(data));

      }).catch(() =>
        dispatch(addError()))
  }
}

export function deleteRecette(id_recettes) {
  return function (dispatch) {
    return api.post("deletar_recettes.php?id=" + id_recettes)
      .then(response => {
        dispatch(deleteData(id_recettes))

      }).catch(() =>
        dispatch(addError()))
  }
};

export function addStarRecette(data) {
  console.log(data)
  return function (dispatch, getState) {
    return api.post('/add_estrela.php', data)
      .then(response => {
        dispatch(addStar(data));
        console.log(response.data)
      }).catch(() =>
        dispatch(addError()))
  }
}
export const { getData, addLoader, addData, addError, addPost, deleteData, editData, addStar } = recettesReducer.actions
export default recettesReducer.reducer