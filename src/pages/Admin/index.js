import { useEffect } from 'react';
import { useState } from 'react';
import {Table,Titulo,ButtonPrimary,AlertSucess,AlertDanger} from './styles'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';


//import './App.css';

//import Forms from '../Forms/Forms';
//import Sidebar from '../Sidebar/Sidebar';

export default function  Home () {
  console.log(useParams());

  const [dataCardapio, setDataCardapio] = useState([]);
  const [statusEnvio, setEnvioStatus]= useState({
    type: '',
    mensagem:''
  })
  

  const getMenu = async () => {
    fetch('http://refugiadonacozinha.com.br/cardapio.php')     
    .then(response => response.json())
    .then(data => {
      setDataCardapio(data.menu);
    })

  }
  const deletarMenu = async (id_cardapio) =>{

    await fetch("http://refugiadonacozinha.com.br/deletar?id="+ id_cardapio)
            .then((response)=> response.json())
            .then((responseJson)=>{
              if(responseJson.erro) {
                setEnvioStatus({
                  type: 'erro',
                  mensagem:responseJson.mensagem
                });
                
              }else{
                setEnvioStatus({
                  type: 'sucess',
                  mensagem:responseJson.mensagem
                });
                getMenu(); 
              }
                console.log(responseJson);                
            }).catch(()=>{
              setEnvioStatus({
                type: 'erro',
                mensagem:"Erro: Produto não apagado com sucesso tente mais tarde "

              });
              
            });
  };

  useEffect(() => {
    getMenu(); 
     }, [])

  return (

    <div id='page-create-congolinaria'>
      <Titulo>CARDAPIO</Titulo>
      {statusEnvio.type==='erro' ?<AlertDanger>{statusEnvio.mensagem}</AlertDanger> :""}
                    {statusEnvio.type=== 'sucess' ? <AlertSucess>{statusEnvio.mensagem}</AlertSucess> :""}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>PRATO</th>
            <th>DESCRIÇÃO</th>
            <th>PREÇO</th>
            <th>VEGANO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {(Object.values(dataCardapio).map(receita=>(
            <tr key={receita.id_cardapio}>
              <td>{receita.id_cardapio}</td>
              <td> {receita.pratos}</td>
              <td> {receita.descricao}</td>
              <td> {receita.preco}</td>
              <td> {receita.status}</td>
              <td> 
                <Link to={"/visualizar/"+ receita.id_cardapio}><ButtonPrimary>Visualizar</ButtonPrimary></Link>
                <Link to={"/Editar/"+ receita.id_cardapio}><ButtonPrimary> Editar</ButtonPrimary></Link> <ButtonPrimary onClick={()=>deletarMenu(receita.id_cardapio)}>Apagar</ButtonPrimary>
                </td>
            </tr>
          )))}
        </tbody>
      </Table>    
      
    </div>


  );
}


