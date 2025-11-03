import { createSlice } from "@reduxjs/toolkit";
import api from '../config/configApi';

const initialState = {
  usuario: {
    email: '',
    senha: ''
  },
  items: [],
  loading: false,
  error: false,
  mensagem: '',
  dados: undefined,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  idUser: localStorage.getItem('idUser') || null,
  nivel: localStorage.getItem('nivel') || null
};

export const loginReducer = createSlice({
  name: "loginReducer",
  initialState,

  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = false;
      state.mensagem = '';
    },

    loginSuccess: (state, action) => {
      const { logado, id_usuario, nivel, mensagem } = action.payload;
      state.loading = false;
      state.error = false;
      state.items = action.payload;
      state.isLoggedIn = !!logado;
      state.idUser = id_usuario ?? null;
      state.nivel = nivel ?? null;
      state.mensagem = mensagem ?? 'Login realizado com sucesso.';
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.mensagem = action.payload || 'Erro ao realizar login.';
    },

    logout: (state) => {
      state.usuario = { email: '', senha: '' };
      state.isLoggedIn = false;
      state.idUser = null;
      state.nivel = null;
      state.items = [];
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('idUser');
      localStorage.removeItem('nivel');
    }
  },
});

// Thunk para login com API
export function getUser(data) {
  return async function (dispatch) {
    dispatch(loginRequest());

    try {
      const response = await api.post('/login.php', data, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      let resRaw = response.data;
      let resData = resRaw;

      // ⚠️ Corrige se o retorno vier como string com HTML/erro
      if (typeof resRaw === 'string') {
        try {
          const match = resRaw.match(/{.*}/s); // captura o primeiro objeto JSON
          if (match) {
            resData = JSON.parse(match[0]);
          } else {
            throw new Error('Resposta não contém JSON válido.');
          }
        } catch (e) {
          console.error('Erro ao interpretar resposta do servidor:', e);
          dispatch(loginFailure('Resposta do servidor inválida.'));
          return;
        }
      }

      // ✅ Agora resData é um objeto JSON válido
      if (resData.logado) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('idUser', resData.id_usuario ?? '');
        localStorage.setItem('nivel', resData.nivel ?? '');

        dispatch(loginSuccess({
          ...resData,
          id_usuario: resData.id_usuario ?? '',
          nivel: resData.nivel ?? ''
        }));
      } else {
        dispatch(loginFailure('Credenciais inválidas.'));
      }
    } catch (error) {
      console.error("Erro no login:", error);
      dispatch(loginFailure(error?.response?.data?.mensagem || "Erro ao tentar login."));
    }
  };
}


export const { loginRequest, loginSuccess, loginFailure, logout } = loginReducer.actions;
export default loginReducer.reducer;
