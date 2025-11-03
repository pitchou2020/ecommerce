// src/redux/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { info: null },
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    clearUser: (state) => {
      state.info = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUser = () => async (dispatch) => {
  // Exemplo de busca de usuário autenticado
  const response = await fetch('https://congolinaria.com.br/api/user.php', { credentials: 'include' });
  const data = await response.json();
  dispatch(setUser(data));
};

export default userSlice.reducer;
