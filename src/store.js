import { configureStore } from "@reduxjs/toolkit";
import products from "./pages/Loja/products";
import cart from "./pages/Loja/cart";
import articleReducer from './redux/articles/articleReducer';
import recettesReducer from './pages/Recettes/recettesReducer'
import CommentsReducer from "./composant/FormComment/CommentsReducer";
import produtosReducer from "./pages/Loja/produtosReducer";
import cartReducer from "./redux/cartReducer";
import carrinhoReducer from "./redux/carrinhoReducer"
import notes from "./pages/Notes/notes";
import productReducer from "./redux/productReducer";
import loginReducer  from "./redux/loginReducer";
const store = configureStore({
  reducer: {
    articleReducer,
    products,
    cart,
    notes,
    recettesReducer,
    CommentsReducer,
    produtosReducer,
    cartReducer,
    carrinhoReducer,
    productReducer,
    loginReducer,
    devTools:true
  }
})
export default store