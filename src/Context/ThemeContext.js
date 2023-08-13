import React, { createContext, useState, useRef } from 'react';
import { Navigate } from "react-router-dom";
import useDimension from "../useDimention";
import { useNavigate } from 'react-router-dom'


export const ThemeContext = createContext();

const ThemeContextProvider = props => {

    const withBrowser = useDimension();

    const [theme, setTheme] = useState('hello Context')
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLogin]=useState(localStorage.getItem('isLoggedIn'));

    const resize = () => {
        console.log(document.querySelector("#sidebar"))
        if (withBrowser < 768) {
            document.querySelector("#sidebar").classList.add('hide2');
        }

    }
    const toggleModal = () => {
        setShowModal(!showModal);

    };
    const LoginRequest = async(e, email,senha)=>{

        const [usuario, setUsuario] = useState([
    
            { Email: '' },
            { senha: '' },
        ]);
        const [statusLogin, setStatusLogin] = useState({
            codigo: '',
            type: '',
            mensagem: ''
        })
        const navigate = useNavigate()
        const [stateInputEmail, setStateInputEmail] = useState();
        const [stateInputSenha, setStateInputSenha] = useState();
        const [isLogin, setIsLogin] = useState(false);
        const goRegister = () => { navigate("/register") }
        const goRecette = () => { navigate("/recettes") }
        function goListarRecette () {
          //return <Navigate to="/" replace />
          navigate('./admin/', { replace: true })
          //toggleModalRegister()
        }
        
        e.preventDefault();
        const newUsuario = [...usuario]
        const newUser = {};
        //newUser.nome = stateInputNome;
        newUser.email = email;
        newUser.senha = senha;
        newUsuario.push(newUser);
        setUsuario(newUsuario);
       
    
        await fetch('https://refugiadonacozinha.com.br/loginUser.php', {
          method: 'POST',
          Headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.erro) {
              setStatusLogin({
                codigo: 400,
                type: "error",
                mensagem: responseJson.mensagem
              })
            }
            else {
    
             
              setStatusLogin({
                codigo: 200,
                type: "success",
                mensagem: responseJson.mensagem
              })
              
             
              setIsLogin(true)
              localStorage.setItem('isLoggedIn', true)
              localStorage.setItem('idUser',responseJson.id_usuario)
              localStorage.setItem('nivel',responseJson.nivel)
              //setisLoggedIn(true)
              if(responseJson.nivel=='administrador'){
                goListarRecette()
              }
              else{
                
                goRecette()
              }
              
            }
    
          }).catch(() => {
            setStatusLogin({
              codigo: 400,
              type: "error",
              mensagem: "usuario não cadastrado, tente mais tarde! "
            })
          });
    }


    return (
        <ThemeContext.Provider value={{ toggleModal, resize, showModal, theme, withBrowser,isLoggedIn,LoginRequest }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export default ThemeContextProvider;