import React from 'react'
import * as C from './styles';
import logo from './../../assets/images/chapado.png'
import Button from "./../../composant/Button"
import Input from "./../../composant/Input"
import ButtonError from '../../composant/ButtonError';
import { useNavigate } from 'react-router-dom'
import { useEffect,useState} from "react";
import "./Register.css"

const RegisterUser = (props) => {
  const [usuario, setUsuario] = useState([
    { nome: '' },
    { Email: '' },
    { senha: '' },


]);
const [statusEnvio, setEnvioStatus]= useState({
  type: '',
  mensagem:''
})
const [stateInputNome, setStateInputNome] = useState();
const [stateInputEmail, setStateInputEmail] = useState();
const [stateInputSenha, setStateInputSenha] = useState();
const valorNome = e => {
    setStateInputNome(e);
}
const valorEmail = e => {
    setStateInputEmail(e);
}
const valorSenha = e => {
    setStateInputSenha(e);
}

const addTodo = async e => {
    e.preventDefault();
   
    const newUsuario = [...usuario]
    const newUser = {};
    newUser.nome = stateInputNome;
    newUser.email = stateInputEmail;
    newUser.senha = stateInputSenha;
    newUsuario.push(newUser);
    setUsuario(newUsuario);
    console.log(newUser);
    

    await fetch('https://refugiadonacozinha.com.br/addUser.php', {
        method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)

    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.erro){
              setEnvioStatus({
                type:"error",
                mensagem:responseJson.mensagem
              })
            }
            else{
              setEnvioStatus({
                type:"success",
                mensagem:responseJson.mensagem

              })
            }
        }).catch(() => {
          setEnvioStatus({
            type:"error",
            mensagem:"usuario não cadastrado, tente mais tarde! "

          })
        });
}
  const navigate = useNavigate()
  const goLogin = () => {navigate ("/login/")}
  return (
    <>
    <div id='content-login'>
    < div className='container-register' >
      
      
      <div className='content-register'>
      <button className='close-button' onClick={props.funcRegister}>x</button>
      
        <div className='ContentRegisterImages' img={logo} width={100}></div>
        
        <div className='ContentRegisterForm'>
       
        {statusEnvio.type==='error'? <p className='AlertDanger'> {statusEnvio.mensagem}</p>:""}
          {statusEnvio.type==='success'? <p className='AlertSucess'> {statusEnvio.mensagem} </p>:""}
          <div className='FormRegister'>
          <form onSubmit={e => addTodo(e)} >  
                  
         
            <input type="text" placeholder="Nome" className="usuario" name="nome"value ={stateInputNome} onChange={e=>valorNome(e.target.value)}/>
            <input type="text" placeholder= "e_mail" className="usuario" name="email" value ={stateInputEmail} onChange={e=>valorEmail(e.target.value)}/>
            <input type="password" placeholder="criar uma senha" className="senha" name="senha" value ={stateInputSenha} onChange={e=>valorSenha(e.target.value)}  />
            
            <Button type="submit" name="entrar" Text="Cadastrar"></Button>
            <ButtonError onClick={goLogin} Text="Já tem cadastro? Entrar"></ButtonError>  
           
          
          </form>
          </div> 
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default RegisterUser
