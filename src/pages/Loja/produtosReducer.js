import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

export const produtosReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    addPost: (state, action) => {
      state.data.push(action.payload);
    },
    addStar: (state, action) => {
      state.data.push(action.payload);
    },
    editData: (state, action) => {
      const index = state.data.findIndex(el => el.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    deleteData: (state, action) => {
      const index = state.data.findIndex(el => el.id === action.payload);
      if (index !== -1) state.data.splice(index, 1);
    },
    addLoader: (state) => {
      state.loading = true;
    },
    addError: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

// 🧠 Funções sem backend (100% locais)
export function getProduto() {
  return async function (dispatch) {
    dispatch(addLoader());
    try {
      // Simula carregamento local (você pode adicionar produtos padrão aqui)
      const produtosExemplo = [
        { id: 1, nome: "Feijoada AfroVeg", preco: 39.9, categoria: "Prato Principal" },
        { id: 2, nome: "Moqueca de Banana", preco: 34.9, categoria: "Prato Principal" },
      ];
      dispatch(addData(produtosExemplo));
      console.info("✅ Produtos carregados localmente (sem API).");
    } catch {
      dispatch(addError());
    }
  };
}

export function addProduto(data) {
  return async function (dispatch) {
    dispatch(addPost(data));
    console.info("🆕 Produto adicionado localmente:", data);
  };
}

export function editProduto(data) {
  return async function (dispatch) {
    dispatch(editData(data));
    console.info("✏️ Produto editado localmente:", data);
  };
}

export function deleteProduto(id) {
  return async function (dispatch) {
    dispatch(deleteData(id));
    console.info("🗑️ Produto removido localmente:", id);
  };
}

export const {
  addLoader,
  addData,
  addError,
  addPost,
  deleteData,
  editData,
} = produtosReducer.actions;

export default produtosReducer.reducer;
