import { createSlice } from "@reduxjs/toolkit";

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

// Ações locais (sem backend)
export function getCarrinho() {
  return async function (dispatch) {
    dispatch(addLoader());
    try {
      // Não existe API de carrinho, retorna vazio
      dispatch(addData([]));
    } catch {
      dispatch(addError());
    }
  };
}
export function salvarCarrinhoNoLocalStorage(getState) {
  const state = getState();
  localStorage.setItem("carrinhoCOP30", JSON.stringify(state.cart.cartItems));
}

export function adicionarAoCarrinhoRedux(produto) {
  return async function (dispatch, getState) {
   dispatch(
  adicionarItem({
    ...produto,
    preco: Number(produto.preco), // força número
    quantity: 1,
  })
);

    salvarCarrinhoNoLocalStorage(getState);
  };
}

export function editarQuantidadeRedux(data) {
  return async function (dispatch, getState) {
    dispatch(atualizarQuantidadeItem(data));
    salvarCarrinhoNoLocalStorage(getState);
  };
}

export function deletarItemRedux(id_produto) {
  return async function (dispatch, getState) {
    dispatch(deleteFromCart(id_produto));
    salvarCarrinhoNoLocalStorage(getState);
  };
}

export function limparCarrinhoRedux() {
  return async function (dispatch, getState) {
    dispatch(limparCarrinho());
    salvarCarrinhoNoLocalStorage(getState);
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
      // Nenhum POST ao backend é necessário
      console.warn("🛒 Item adicionado localmente ao carrinho (sem API).");
    }
  };
}

export function editarQuantidade(data) {
  return async function (dispatch) {
    // Atualiza apenas no estado local
    dispatch(atualizarQuantidadeItem(data));
    console.warn("🧮 Quantidade atualizada localmente (sem API).");
  };
}

export function deletarItemCarrinho(id_produto) {
  return async function (dispatch) {
    // Remove apenas no estado local
    dispatch(deleteFromCart(id_produto));
    console.warn("🗑️ Item removido localmente do carrinho (sem API).");
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
