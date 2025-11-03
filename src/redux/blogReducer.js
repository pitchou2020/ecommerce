// src/redux/blogReducer.js
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: { items: [] },
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setPosts } = blogSlice.actions;
export const getPostsLists = () => async (dispatch) => {
  // Exemplo: buscar posts de uma API
  const response = await fetch('https://congolinaria.com.br/api/posts.php');
  const data = await response.json();
  dispatch(setPosts(data));
};

export default blogSlice.reducer;
