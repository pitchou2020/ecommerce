import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
  items: [],
  loading: false,
  error: false,
};

// Slice Redux
export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = false;
    },
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    editData: (state, action) => {
      const index = state.items.findIndex(el => el.id_produto === action.payload.id_produto);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteData: (state, action) => {
      const indexOfItemToRemove = state.items.findIndex(el => el.id_produto === action.payload);
      if (indexOfItemToRemove !== -1) state.items.splice(indexOfItemToRemove, 1);
    },
    addError: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
  extraReducers: {
    ["cart/createCartItem"]: (state, action) => {
      const produto = state.items.find(el => el.id_produto === action.payload.id_produto);
      if (produto) produto.picked = "1";
    },
    ["cart/deleteFromCart"]: (state, action) => {
      const produto = state.items.find(el => el.id_produto === action.payload);
      if (produto) produto.picked = "0";
    },
  },
});

export const { addProducts, addPost, addError, deleteData, editData } = products.actions;

// ✅ Simulação local (sem API)
export function getProductsLists() {
  return async function (dispatch) {
    dispatch(addProducts([])); // reseta antes de carregar
    try {
      // Dados locais de exemplo (sem chamada a produto.php)
      const produtosLocais = [
        { id_produto: 1, nome: "Feijoada AfroVeg", preco: 39.9, categoria: "Prato Principal" },
        { id_produto: 2, nome: "Moqueca de Banana", preco: 34.9, categoria: "Prato Principal" },
        { id_produto: 3, nome: "Sambusas Veganas", preco: 24.9, categoria: "Entrada" },
        { id_produto: 4, nome: "Mafé de Jaca", preco: 32.9, categoria: "Especial" },
      ];
      dispatch(addProducts(produtosLocais));
      console.info("🍛 Produtos carregados localmente (sem API).");
    } catch {
      dispatch(addError());
    }
  };
}

// Funções locais (sem chamadas HTTP)
export function addProduct(data) {
  return async function (dispatch) {
    dispatch(addPost(data));
    console.info("🆕 Produto adicionado localmente:", data);
  };
}

export function editProduct(data) {
  return async function (dispatch) {
    dispatch(editData(data));
    console.info("✏️ Produto editado localmente:", data);
  };
}

export function deleteProduct(id_produto) {
  return async function (dispatch) {
    dispatch(deleteData(id_produto));
    console.info("🗑️ Produto removido localmente:", id_produto);
  };
}

export default products.reducer;
