
import React, { useState, useEffect, useContext } from 'react'
import { getUser} from '../../redux/loginReducer'

import logo from './../../assets/images/chapado.png'
import Button from "./../../composant/Button"
import Input from "./../../composant/Input"

import { useNavigate } from 'react-router-dom'

import * as C from './styles';
import ButtonError from '../../composant/ButtonError'

import styled from 'styled-components'
import './Login.css'
import { ThemeContext } from "./../../Context/ThemeContext"
import { useSelector,useDispatch } from 'react-redux';


export default function Login({ onClose }) {
  const [showModalRegister, setShowModalRegister] = useState(false);
  const { LoginRequest } = useContext(ThemeContext);
  const dispatch = useDispatch()

const users = useSelector(state => state.loginReducer)


  const toggleModalRegister = () => {
    setShowModalRegister(!showModalRegister);
   
  };
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [stateInputEmail, setStateInputEmail] = useState("");
  const [stateInputSenha, setStateInputSenha] = useState("");
  const [usuario, setUsuario] = useState([

    { Email: '' },
    { senha: '' },
  ]);
  const [statusLogin, setStatusLogin] = useState({
    codigo: '',
    type: '',
    mensagem: ''
  })

  const valorEmail = e => {
    setStateInputEmail(e);
}
const valorSenha = e => {
    setStateInputSenha(e);
}

  const AddTodo = async (e) => {
    e.preventDefault();
    const newUsuario = [...usuario]
    const newUser = {};
    //newUser.nome = stateInputNome;
    newUser.email = stateInputEmail;
    newUser.senha = stateInputSenha;
    newUsuario.push(newUser);
    setUsuario(newUsuario);
    
    await dispatch(getUser(newUser))
console.log(users)
    if (users.items.erro) {
      setStatusLogin({
        codigo: 400,
        type: "error",
        mensagem: users.items.mensagem
      })
    }
    else {

      setStatusLogin({
        codigo: 200,
        type: "success",
        mensagem: users.items.mensagem
      })
      
      setIsLogin(true)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('idUser',users.items.id_usuario)
      localStorage.setItem('nivel',users.items.nivel)
      setisLoggedIn(true)
      setStateInputEmail(" ");
      setStateInputSenha(" ");
  }
}
  const navigate = useNavigate()
  const goRegister = () => {navigate ("/register/")}

  return (
    <>
      <div className='content-login'>

        <div className='ContentForm'>
          <button className="btn-close" onClick={onClose}>x</button>
          <form onSubmit={AddTodo} >

            <div className='img-logo'>
              <img src={logo} alt="" width={100} />

            </div>

            <div>

              {/*  {props.statusLogin.type === 'error' ? <C.AlertDanger> {props.statusLogin.mensagem} </C.AlertDanger> : ""}
              {props.statusLogin.type === 'success' ? <C.AlertSucess> {props.statusLogin.mensagem}  </C.AlertSucess> : ""}
  {console.log(props.isLogin)}*/}

              <input type="text" placeholder="e_mail" className="usuario" name="email" value ={stateInputEmail} onChange={e=>valorEmail(e.target.value)} />
              <input type="password" placeholder="criar uma senha" className="senha" name="senha" value ={stateInputSenha} onChange={e=>valorSenha(e.target.value)}  />


              <button className="btn-entrar" type="submit" name="entrar" >Entrar</button>

              <div className='txtFim'>
                <span onClick={goRegister} > Não tem uma conta? Registre-se</span>
              </div>

            </div>
          </form>
        </div>


      </div>

    </>
  )
}
