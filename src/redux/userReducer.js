// src/redux/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
    loading: false,
    error: null,  // ← adiciona essa linha
  },
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.info = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const getUser = () => async (dispatch) => {
  try {
    // pode marcar início do loading se quiser
    // dispatch(setLoading(true));
    const response = await fetch('https://congolinaria.com.br/usuarios.php', {
      credentials: 'include',
    });
    const data = await response.json();
    dispatch(setUser(data));
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    dispatch(setUser(null)); // ou crie uma action setError
  }
};

export default userSlice.reducer;
