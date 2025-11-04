import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { getProductsLists } from './pages/Loja/products';
import { BrowserRouter } from 'react-router-dom';
import ThemeContextProvider from "./Context/ThemeContext";

store.dispatch(getProductsLists());

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
