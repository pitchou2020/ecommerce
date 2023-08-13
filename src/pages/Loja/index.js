import { useEffect } from 'react';
import { useState } from 'react';
import { Table, Titulo, ButtonPrimary, AlertSucess, AlertDanger } from './styles'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';
import People from './../Admin/img/people.png';
import NavBarAdmin from './../../composant/NavBarAdmin'
import SidebarAdmin from './../../composant/sidebarAdmin'


//import './App.css';

//import Forms from '../Forms/Forms';
//import Sidebar from '../Sidebar/Sidebar';

export default function Home(props) {
  console.log(useParams());

  const [dataCardapio, setDataCardapio] = useState([]);
  const [statusEnvio, setEnvioStatus] = useState({
    type: '',
    mensagem: ''
  })

  const url = "https://refugiadonacozinha.com.br/"
  const getMenu = async () => {
    fetch(url + 'recettes.php')
      .then(response => response.json())
      .then(data => {
        setDataCardapio(data);
      })

  }
  /*
  const getRecette = async () => {
    fetch('/pilafs_et_risottos.json',{ 
    headers: {
      Accept: "application/json"}
    })     
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setDataCardapio(data);
      
    })
  }*/
  const deletarRecettes = async (id_recettes) => {

    await fetch(url + "deletar_recettes.php?id=" + id_recettes)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setEnvioStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });

        } else {
          setEnvioStatus({
            type: 'sucess',
            mensagem: responseJson.mensagem
          });
          getMenu();
        }
        console.log(responseJson);
      }).catch(() => {
        setEnvioStatus({
          type: 'erro',
          mensagem: "Erro: Produto não apagado com sucesso tente mais tarde "

        });

      });
  };

  useEffect(() => {
    //getRecette();
    getMenu();
  }, [])

  return (

    <>
      <SidebarAdmin wind={props.win} modal = {props.func2}/>
      <section id='content'>

        <NavBarAdmin sidebar={props.sidebar} func={props.func}/>

        <span>RECETTES</span> <a href='/cadastro/'>adicionar novo</a>
        {statusEnvio.type === 'erro' ? <AlertDanger>{statusEnvio.mensagem}</AlertDanger> : ""}
        {statusEnvio.type === 'sucess' ? <AlertSucess>{statusEnvio.mensagem}</AlertSucess> : ""}
        <Table>
          <thead>
            <tr>

              <th>TITRE</th>
              <th>INFOS</th>
              <th>INGREDIENTS</th>
              <th>ETAPES</th>
              <th>IMAGES</th>

              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {
              (Object.values(dataCardapio).map(receita => (
                <tr key={receita.id_recettes}>
                  <td>{receita.titre}</td>
                  <td> {receita.infos}</td>
                  <td> {receita.ingredients}</td>
                  <td> {receita.etapes}</td>
                  <td>
                    <img id="logo" src={url + 'img_upload/' + receita.imagem} width={'300'} alt="Refugiado na cozinha" /></td>

                  <td>
                    <Link to={"/visualizar/" + receita.id_recettes}><ButtonPrimary><i class="fa-regular fa-eye"></i>Visualizar</ButtonPrimary></Link>
                    <Link to={"/editarRecettes/" + receita.id_recettes}><ButtonPrimary><i class="fa-solid fa-pen"></i> Editar</ButtonPrimary></Link>
                    <ButtonPrimary onClick={() => deletarRecettes(receita.id_recettes)}><i class="fa-solid fa-trash"></i>Apagar</ButtonPrimary>
                  </td>
                </tr>
              )))
            }
          </tbody>
        </Table>
      </section>
    </>


  );
}


