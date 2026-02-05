import { createSlice } from "@reduxjs/toolkit";

// ==============================
// LOCALSTORAGE KEYS
// ==============================
const LS_KEYS = {
  cop30: "carrinhoCOP30",
  hortifruti: "carrinhoHortifruti",
};

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

// ✅ carrega carrinhos do localStorage (sem quebrar se não existir)
const loadCartFromLocalStorage = (canal) => {
  const key = LS_KEYS[canal] || LS_KEYS.cop30;
  const raw = localStorage.getItem(key);
  return safeParse(raw, []);
};

// ==============================
// ESTADO INICIAL (2 carrinhos)
// ==============================
const initialState = {
  cartItemsByCanal: {
    cop30: loadCartFromLocalStorage("cop30"),
    hortifruti: loadCartFromLocalStorage("hortifruti"),
  },
  loading: false,
  error: false,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ----------------------------
    // ADD ITEM (por canal)
    // payload: { canal, item }
    // ----------------------------
    adicionarItem: (state, action) => {
      const { canal = "cop30", item } = action.payload || {};
      if (!item?.id_produto) return;

      const lista = state.cartItemsByCanal[canal] || [];
      const exists = lista.find((i) => i.id_produto === item.id_produto);

      if (!exists) {
        lista.push({
          ...item,
          preco: Number(item.preco) || 0,
          quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        });
      } else {
        // se já existir, soma quantidade (opcional / mais natural)
        exists.quantity = Number(exists.quantity || 1) + (Number(item.quantity) > 0 ? Number(item.quantity) : 1);
      }

      state.cartItemsByCanal[canal] = lista;
    },

    // ----------------------------
    // UPDATE QUANTITY (por canal)
    // payload: { canal, id_produto, value }
    // ----------------------------
    atualizarQuantidadeItem: (state, action) => {
      const { canal = "cop30", id_produto, value } = action.payload || {};
      const lista = state.cartItemsByCanal[canal] || [];

      const item = lista.find((el) => el.id_produto === id_produto);
      if (item) {
        item.quantity = Math.max(1, Number(value) || 1);
      }

      state.cartItemsByCanal[canal] = lista;
    },

    // ----------------------------
    // DELETE ITEM (por canal)
    // payload: { canal, id_produto }
    // ----------------------------
    deleteFromCart: (state, action) => {
      const { canal = "cop30", id_produto } = action.payload || {};
      const lista = state.cartItemsByCanal[canal] || [];

      const index = lista.findIndex((el) => el.id_produto === id_produto);
      if (index !== -1) lista.splice(index, 1);

      state.cartItemsByCanal[canal] = lista;
    },

    // ----------------------------
    // CLEAR CART (por canal)
    // payload: { canal }
    // ----------------------------
    limparCarrinho: (state, action) => {
      const canal = action?.payload?.canal || "cop30";
      state.cartItemsByCanal[canal] = [];
    },

    // ----------------------------
    // SET CART (por canal)
    // payload: { canal, items }
    // ----------------------------
    setCarrinho: (state, action) => {
      const { canal = "cop30", items } = action.payload || {};
      state.cartItemsByCanal[canal] = Array.isArray(items) ? items : [];
    },

    addLoader: (state) => {
      state.loading = true;
    },
    addError: (state) => {
      state.error = true;
      state.loading = false;
    },
    stopLoader: (state) => {
      state.loading = false;
    },
  },
});

// ==============================
// SELECTORS (use no app)
// ==============================
export const selectCarrinhoPorCanal = (state, canal = "cop30") =>
  state.cart?.cartItemsByCanal?.[canal] || [];

// ==============================
// LOCALSTORAGE SAVE/LOAD
// ==============================
export function salvarCarrinhoNoLocalStorage(getState, canal = "cop30") {
  const state = getState();
  const key = LS_KEYS[canal] || LS_KEYS.cop30;
  const items = state.cart.cartItemsByCanal[canal] || [];
  localStorage.setItem(key, JSON.stringify(items));
}

export function carregarCarrinhoDoLocalStorageRedux(canal = "cop30") {
  return async function (dispatch) {
    dispatch(addLoader());
    try {
      const items = loadCartFromLocalStorage(canal);
      dispatch(setCarrinho({ canal, items }));
      dispatch(stopLoader());
    } catch {
      dispatch(addError());
    }
  };
}

// ==============================
// THUNKS (NOVOS - com CANAL)
// ==============================
export function adicionarAoCarrinhoRedux(produto, canal = "cop30") {
  return async function (dispatch, getState) {
    dispatch(
      adicionarItem({
        canal,
        item: {
          ...produto,
          preco: Number(produto.preco) || 0,
          quantity: Number(produto.quantity) > 0 ? Number(produto.quantity) : 1,
        },
      })
    );
    salvarCarrinhoNoLocalStorage(getState, canal);
  };
}

export function editarQuantidadeRedux(data, canal = "cop30") {
  return async function (dispatch, getState) {
    dispatch(atualizarQuantidadeItem({ canal, ...data }));
    salvarCarrinhoNoLocalStorage(getState, canal);
  };
}

export function deletarItemRedux(id_produto, canal = "cop30") {
  return async function (dispatch, getState) {
    dispatch(deleteFromCart({ canal, id_produto }));
    salvarCarrinhoNoLocalStorage(getState, canal);
  };
}

export function limparCarrinhoRedux(canal = "cop30") {
  return async function (dispatch, getState) {
    dispatch(limparCarrinho({ canal }));
    salvarCarrinhoNoLocalStorage(getState, canal);
  };
}

// ==============================
// ✅ COMPATIBILIDADE (seu código antigo)
// Mantém as funções antigas funcionando no COP30
// ==============================
export function getCarrinho() {
  return async function (dispatch) {
    dispatch(addLoader());
    try {
      // mantém comportamento: sem API, não faz nada
      dispatch(stopLoader());
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
  setCarrinho,
  addError,
  addLoader,
  stopLoader,
} = cart.actions;

export default cart.reducer;
