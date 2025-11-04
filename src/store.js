import { configureStore } from "@reduxjs/toolkit";

import products from "./pages/Loja/products";
import cart from "./pages/Loja/cart";
import articleReducer from './redux/articles/articleReducer';
import recettesReducer from './pages/Recettes/recettesReducer';
import CommentsReducer from "./composant/FormComment/CommentsReducer";
import produtosReducer from "./pages/Loja/produtosReducer";
import cartReducer from "./redux/cartReducer";
import carrinhoReducer from "./redux/carrinhoReducer";
import notes from "./pages/Notes/notes";
import productReducer from "./redux/productReducer";
import loginReducer from "./redux/loginReducer";
//import userReducer from "./redux/userReducer";
//import blogReducer from "./redux/blogReducer";
//import sliderReducer from "./redux/sliderReducer";

const store = configureStore({
  reducer: {
    articles: articleReducer,
    products,
    cart,
    notes,
    recettes: recettesReducer,
    comments: CommentsReducer,
    produtos: produtosReducer,
    cartItems: cartReducer,
    carrinho: carrinhoReducer,
    product: productReducer,
    login: loginReducer
    //users: userReducer,
    //blog: blogReducer,
   // slider: sliderReducer
  },
  devTools: true
});

export default store;
