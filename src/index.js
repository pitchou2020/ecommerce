import React from 'react';

import App from './App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//import store from './redux/store'
import store from './store'
import ThemeContextProvider from "./Context/ThemeContext";
import { getCarrinho } from './redux/cartReducer';
import { getProductsLists } from './pages/Loja/products';

store.dispatch(getCarrinho())
store.dispatch(getProductsLists())

ReactDOM.render(
  <BrowserRouter basename= {process.env.PUBLIC_URL}>
    <Provider store={store} >
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
