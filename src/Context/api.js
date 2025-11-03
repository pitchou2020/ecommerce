import axios from 'axios';

export const Api = axios.create({
    baseURL: "https://refugiadonacozinha.com.br/",
    //baseURL:"http://localhost/RestoAfrica/src/views/"
});