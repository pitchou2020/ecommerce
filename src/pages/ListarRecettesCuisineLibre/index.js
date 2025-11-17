import { useEffect } from 'react';
import { useState } from 'react';
import {Table,Titulo,ButtonPrimary,AlertSucess,AlertDanger} from './styles'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';
import api from '../../config/configApi';


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
  
  const url = "http://localhost/RestoAfrica/src/views/"
  const getMenu = async () => {
    fetch('https://refugiadonacozinha.com.br/recettes_cuisine_libre_pt.php')     
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setDataCardapio(data.recettes);
    })

  }
 
  const deletarRecettes = async (id_recettes) =>{
    
    await api.delete("/recettes.php?id="+ id_recettes)
    .then((response)=>{
        console.log(response.data)
        
        if(response.data.erro) {
          setEnvioStatus({
            type: 'erro',
            mensagem:response.data.mensagem
          });
          
        }else{
          setEnvioStatus({
            type: 'sucess',
            mensagem:response.data.mensagem
          });
          getMenu(); 
        }
          console.log(response.data);                
      }).catch(()=>{
        setEnvioStatus({
          type: 'erro',
          mensagem:"Erro: Produto não apagado com sucesso tente mais tarde "

        });
        
      });

  };

  useEffect(() => {
    //getRecette();
    getMenu(); 
     }, [])

  return (

    <div id='page-create-congolinaria'>
      <Titulo>RECETTES</Titulo>
      {statusEnvio.type==='erro' ?<AlertDanger>{statusEnvio.mensagem}</AlertDanger> :""}
                    {statusEnvio.type=== 'sucess' ? <AlertSucess>{statusEnvio.mensagem}</AlertSucess> :""}
      <table>
        <thead>
          <tr>
            
            <th>TITRE</th>
           
            
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {
          (Object.values(dataCardapio).map(receita=>(
            <tr key={receita.id_recettes}>
              <td>
              <img  id="logo" src={'https://refugiadonacozinha.com.br/img_upload/'+receita.imagem} alt="Refugiado na cozinha" />
                <p>{receita.titre}</p>
              </td>
              <td> 
                <Link to={"/visualizar/"+ receita.id_recettes}><ButtonPrimary><i class="fa-regular fa-eye"></i>Visualizar</ButtonPrimary></Link>
                <Link to={"/editarRecettesCuisineLibre/"+ receita.id_recettes}><ButtonPrimary><i class="fa-solid fa-pen"></i> Editar</ButtonPrimary></Link> 
                <ButtonPrimary onClick={()=>deletarRecettes(receita.id_recettes)}><i class="fa-solid fa-trash"></i>Apagar</ButtonPrimary>
                </td>
            </tr>
          )))
        }
        </tbody>
      </table>    
      
    </div>


  );
}


