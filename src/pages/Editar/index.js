import React from 'react'
import { useEffect,useState} from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {Container,ButtonPrimary} from './styles';


export default function Editar(props) {

  const [minhaEscolha, setminhaEscolha] = useState("");
    console.log(minhaEscolha);
    const fooSim = () => {
        setminhaEscolha("sim");
    }
    const fooNao = () => {
        setminhaEscolha("Não")
    }

   const[dataCardapio, setDataCardapio] = useState([]);
    const params = useParams();
   const idcad = useState(params.id);
   const [pratos, setPratos]= useState('');
   const [descricao, setDescricao]= useState('');
   const [preco, setPreco]= useState('');

   const [menu, setMenu] = useState([
    { pratos: ''},
    { descricao: ''},
     {preco: ''},
     {status: ''}

 ]);
   
   

    useEffect(()=>{
        const getProduto = async ()=>{
            await fetch("http://refugiadonacozinha.com.br/visualizar.php?id="+ idcad)
            .then((response)=> response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                setDataCardapio(responseJson.produto);
                setPratos(responseJson.produto.pratos);
                setDescricao(responseJson.produto.descricao);
                setPreco(responseJson.produto.preco);
            })
        }
        getProduto();
    },[idcad]);

    const navigate = useNavigate()
   const goHome = () => {navigate ("/")}

   const editTodo = async e => {
    e.preventDefault();
    console.log(pratos);
    /*
    const newMenu = [...menu]
    const newCardapio = {};
    newCardapio.pratos = pratos;
    newCardapio.descricao = descricao;
    newCardapio.preco = preco;
    newCardapio.status = minhaEscolha;
    newMenu.push(newCardapio);
    setMenu(newMenu);
    console.log(newCardapio);

     await fetch('http://localhost/RestoAfrica/src/views/cadastrarCardapio.php', {
        method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menu)

    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
           
        }).catch(()=>{
            
          });*/
            
}
  return (
    <div>    
    
      <div className="animate-appear with-sidebar">

            <Container> 
            <ButtonPrimary onClick={goHome}>LISTAR</ButtonPrimary>
                <form onSubmit={editTodo} >
                    <fieldset>

                        <legend>Editar menu </legend>
                       
                       
                        <div className="map-container">
                            <div id="mapid">


                            </div>
                        </div>

                        <div className="input-block">
                            <label htmlFor="name">Prato</label>
                            <input id="name" name="pratos"value ={pratos} onChange={e=>setPratos(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
                            <textarea id="about" name="descricao" value ={descricao} onChange={e=>setDescricao(e.target.value)}  ></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="whatsapp">Preço</label>
                            <input id="preco" name="preco" value={preco} onChange={e=>setPreco(e.target.value)}/>
                        </div>
                    </fieldset>
                    <fieldset>
                      
                        <div className="input-block">
                            <label htmlFor="opening_on_weekends">Vegano?</label>
                            <input type="hidden" id="opening_on_weekends" name="opening_on_weekends" value="1" required />
                            <div className="button-select">
                                <button onClick={fooSim} type="button" className="active">Sim</button>
                                <button onClick={fooNao} type="button">Não</button>
                            </div>
                            <button type="submit" className="primary-button">Editar</button>
                        </div>
                    </fieldset>
                </form>
                </Container>

        </div>
    </div>
  )
}
