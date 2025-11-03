import { createSlice } from "@reduxjs/toolkit";
import api from "../config/configApi";

// Estado inicial
const initialState = {
  cartItems: [],
  loading: false,
  error: false
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    adicionarItem: (state, action) => {
      const data = action.payload;
      const exists = state.cartItems.find(item => item.id_produto === data.id_produto);
      if (!exists) {
        state.cartItems.push({ ...data, quantity: 1 });
      }
    },
    atualizarQuantidadeItem: (state, action) => {
      const item = state.cartItems.find(el => el.id_produto === action.payload.id_produto);
      if (item) {
        item.quantity = Number(action.payload.value);
      }
    },
    deleteFromCart: (state, action) => {
      const index = state.cartItems.findIndex(el => el.id_produto === action.payload);
      if (index !== -1) state.cartItems.splice(index, 1);
    },
    limparCarrinho: (state) => {
      state.cartItems = [];
    },
    addLoader: (state) => {
      state.loading = true;
    },
    addError: (state) => {
      state.error = true;
      state.loading = false;
    },
    addData: (state, action) => {
      state.cartItems = action.payload;
    }
  }
});

// Ações assíncronas (thunks)
export function getCarrinho() {
  return async function (dispatch) {
    dispatch(addLoader());
    try {
      const response = await api.get('/carrinho.php');
      dispatch(addData(response.data));
    } catch {
      dispatch(addError());
    }
  };
}

export function adicionarAoCarrinho(id_produto) {
  return async function (dispatch, getState) {
    const storeState = getState();
    const produto = storeState.products.items.find(p => p.id_produto === id_produto);

    if (!produto) return;

    const itemExistente = storeState.cart.cartItems.find(p => p.id_produto === id_produto);
    if (!itemExistente) {
      dispatch(adicionarItem(produto));
      try {
        await api.post('/carrinho.php', produto);
      } catch {
        dispatch(addError());
      }
    }
  };
}

export function editarQuantidade(data) {
  return async function (dispatch) {
    try {
      await api.post('/editar_comment.php', data);
      dispatch(atualizarQuantidadeItem(data));
    } catch {
      dispatch(addError());
    }
  };
}

export function deletarItemCarrinho(id_produto) {
  return async function (dispatch) {
    try {
      await api.post(`deletar_carrinho.php?id=${id_produto}`);
      dispatch(deleteFromCart(id_produto));
    } catch {
      dispatch(addError());
    }
  };
}

// Exportações das ações e reducer
export const {
  adicionarItem,
  atualizarQuantidadeItem,
  deleteFromCart,
  limparCarrinho,
  addError,
  addLoader,
  addData
} = cart.actions;

export default cart.reducer;
