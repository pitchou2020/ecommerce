import React from 'react'
import api from '../../config/configApi'
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  data: undefined,
  error: false
}

export const CommentsReducer = createSlice({
  name: "comments",
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

export function getComment(action) {
  return function (dispatch, getState) {
    dispatch(addLoader())

    api.get('/comments.php')
      .then(response => {
        dispatch(addData(response.data))
        console.log(response.data)
      }).catch(() =>
        dispatch(addError()))
  }
}
export function addComment(data) {
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
export function addCommentReply(data) {
    console.log(data)
    return function (dispatch, getState) {
      return api.post('/add_comments.php', data)
        .then(response => {
          dispatch(addPostReply(data));
          console.log(response.data)
        }).catch(() =>
          dispatch(addError()))
    }
  }
export function editComments(data) {

  return function (dispatch, getState) {
    return api.post('/editar_comment.php', data)
      .then(response => {
        dispatch(editData(data));

      }).catch(() =>
        dispatch(addError()))
  }
}

export function deleteComments(id_comments) {
  return function (dispatch) {
    return api.post("deletar_comment.php?id=" + id_comments)
      .then(response => {
        dispatch(deleteData(id_comments))

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
export const { getData, addLoader, addData, addError, addPost, deleteData, editData, addStar,addPostReply } = CommentsReducer.actions
export default CommentsReducer.reducer