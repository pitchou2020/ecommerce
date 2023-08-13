import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Table, Titulo, ButtonPrimary, AlertSucess, AlertDanger } from './styles'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';
import People from './../Admin/img/people.png';
import NavBarAdmin from './../../composant/NavBarAdmin'
import SidebarAdmin from './../../composant/sidebarAdmin'

//import './App.css';

//import Forms from '../Forms/Forms';
//import Sidebar from '../Sidebar/Sidebar';

export default function Home() {
  const [dataRestaurantes, setDataRestaurantes] = useState([]);
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [titre, setTitre] = useState();
  const [categorie, setCategorie] = useState()
  const [numRecettes, setNumRecettes] = useState()
  const carousel = useRef(null);
  const UrlBase = 'https://refugiadonacozinha.com.br/';

  const [dataCardapio, setDataCardapio] = useState([]);
  const [statusEnvio, setEnvioStatus] = useState({
    type: '',
    mensagem: ''
  })

  const getusuarios = async () => {
    fetch(UrlBase + 'usuarios.php')
      .then(response => response.json())
      .then(data => {
        console.log(data.length)

        setDataUsuarios(data);
      })

  }
  useEffect(() => {
    getusuarios();

  }, []);
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

    await fetch(UrlBase + "deletar_recettes.php?id=" + id_recettes)
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
          //getMenu(); 
        }
        console.log(responseJson);
      }).catch(() => {
        setEnvioStatus({
          type: 'erro',
          mensagem: "Erro: Produto não apagado com sucesso tente mais tarde "

        });

      });
  };



  return (

    <>
      <SidebarAdmin />
      <section id='content'>

        <NavBarAdmin />
        <Titulo>RECETTES</Titulo>
        {statusEnvio.type === 'erro' ? <AlertDanger>{statusEnvio.mensagem}</AlertDanger> : ""}
        {statusEnvio.type === 'sucess' ? <AlertSucess>{statusEnvio.mensagem}</AlertSucess> : ""}
        <Table>
          <thead>
            <tr>

              <th>User</th>
              <th>e-mail</th>
              <th>Data de cadastro</th>
              <th>Funcão</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              (Object.values(dataUsuarios).map(user => (
                <tr key={user.id_usuario}>
                  <td>
                    <img id="logo" src={People} alt="Refugiado na cozinha" />
                    {user.nome}</td>
                  <td> {user.email}</td>
                  <td> {user.data_cadastro}</td>
                  <td> {user.nivel}</td>
                  <td>
                    <Link to={"/visualizar/" + user.id_usuario}><button><i class="fa-regular fa-eye"></i>Visualizar</button></Link>
                    <Link to={"/editarRecettes/" + user.id_usuario}><button><i class="fa-solid fa-pen"></i> Editar</button></Link>
                    <button onClick={() => deletarRecettes(user.id_usuario)}><i class="fa-solid fa-trash"></i>Apagar</button>
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


