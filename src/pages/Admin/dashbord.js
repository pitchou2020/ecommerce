import React from 'react'
import People from './img/people.png'
import ListarRecette from './../ListarRecettesCuisineLibre'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function Dashbord(props){
	console.log(props)

	const [dataCardapio, setDataCardapio] = useState([]);
  const [statusEnvio, setEnvioStatus]= useState({
    type: '',
    mensagem:''
  })
	 const deletarRecettes = async (id_usuario) =>{

    await fetch("https://refugiadonacozinha.com.br/deletar_usuarios.php?id="+ id_usuario)
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
        
              }
                console.log(responseJson);                
            }).catch(()=>{
              setEnvioStatus({
                type: 'erro',
                mensagem:"Erro: Produto não apagado com sucesso tente mais tarde "

              });
              
            });
  };

  return (
    <>
      <main>
			<div class="head-title">
				<div class="left">
					<h1>Dashboard</h1>
					<ul class="breadcrumb">
						<li>
							<a href="/admin/">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="/admin/">Home</a>
						</li>
					</ul>
				</div>
				<a href="btn-download" class="btn-download">
					<i class='bx bxs-cloud-download' ></i>
					<span class="text">Download PDF</span>
				</a>
			</div>

			<ul class="box-info">
				<li>
					<i class='bx bxs-calendar-check' ></i>
					<span class="text">
						<h3>{props.numRecettes}</h3>
						<p>Recettes</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-group' ></i>
					<span class="text">
						<h3>2834</h3>
						<p>Posts</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-dollar-circle' ></i>
					<span class="text">
						<h3>$2543</h3>
						<p>Total Sales</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>Usuarios Recentes</h3>
						<i class='bx bx-search' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>e-mail</th>
								<th>Data de cadastro</th>
								<th>Funcão</th>
							</tr>
						</thead>
						<tbody>
						{
          (Object.values(props.usuarios).map(user=>(
            <tr key={user.id_usuario}>
              <td>
			  <img  id="logo" src={People} width ={'300'} alt="Refugiado na cozinha" />
				<p>{user.nome}</p></td>
              <td> {user.email}</td>
              <td> {user.data_cadastro}</td>
              <td> {user.nivel}</td>             
              
            </tr>
          )))
        }					
							
						</tbody>
					</table>
				</div>
				<div class="todo">
					<div class="head">
						<h3>Todos</h3>
						<i class='bx bx-plus' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<ul class="todo-list">
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
					</ul>
				</div>
			</div>
		</main>
    </>
  )
}

export default Dashbord
