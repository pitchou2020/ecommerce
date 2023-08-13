
import React, { useState, useEffect } from 'react'

import logo from './../../assets/images/logo_Refugiado_na_cozinha.png'
import Button from "../../composant/Button"
import Input from "../../composant/Input"
import { useNavigate } from 'react-router-dom'

import * as C from './styles';
import ButtonError from '../../composant/ButtonError'
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components'

const FacebookLoginButton = {
  backgroundColor: "#37549A",
  color: "#fff",
  borderRadius: "30px",
  fontSize: "15px",

  fontWeight: "bold",
  cursor: "pointer"
}
export default function LoginAdmin(props) {
  console.log(props)
  

  return (
    <>
      <C.ContainerLogin>

        <C.ContentForm>
          <C.CloseButton onClick={props.func}>x</C.CloseButton>
          <form onSubmit={e => props.funcAddTodo(e)} >

            <C.LogoLogin>
              <img src={logo} alt="" width={100} />

            </C.LogoLogin>

            <C.FormLogin >

              {props.statusLogin.type === 'error' ? <C.AlertDanger> {props.statusLogin.mensagem} </C.AlertDanger> : ""}
              {props.statusLogin.type === 'success' ? <C.AlertSucess> {props.statusLogin.mensagem}  </C.AlertSucess> : ""}
              {console.log(props.isLogin)}

              <Input type="text" placeholder="e_mail" className="usuario" name="email" value={props.stateInputEmail} onChange={e => props.valorEmail(e.target.value)} />
              <Input type="password" placeholder="criar uma senha" className="senha" name="senha" value={props.stateInputSenha} onChange={e => props.valorSenha(e.target.value)} />


              <Button type="submit" name="entrar" Text="Entrar"></Button>


              <ButtonError Text="Não tem uma conta? Registre-se" onClick={props.funcRegister}> </ButtonError>

            </C.FormLogin>
          </form>
        </C.ContentForm>

      </C.ContainerLogin>

    </>
  )
}
