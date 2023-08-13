
import React, { useState, useEffect, useContext } from 'react'

import logo from './../../assets/images/chapado.png'
import Button from "./../../composant/Button"
import Input from "./../../composant/Input"

import { useNavigate } from 'react-router-dom'

import * as C from './styles';
import ButtonError from '../../composant/ButtonError'

import styled from 'styled-components'
import './Login.css'
import { ThemeContext } from "./../../Context/ThemeContext"


export default function Login({ onClose }) {
  const [showModalRegister, setShowModalRegister] = useState(false);
  const { LoginRequest } = useContext(ThemeContext);

  const toggleModalRegister = () => {
    setShowModalRegister(!showModalRegister);
   
  };
  const AddTodo = () => {

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

              <input type="text" placeholder="e_mail" className="usuario" name="email" />
              <input type="password" placeholder="criar uma senha" className="senha" name="senha" />


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
