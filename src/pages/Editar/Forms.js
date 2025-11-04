import React, { useState } from 'react';

import './forms.css';
import './buttons.css';
import './main.css'
import { ButtonPrimary } from './styles';
import { useNavigate } from 'react-router-dom'


//import Buttons from './Buttons';


function Forms() {
    const [minhaEscolha, setminhaEscolha] = useState("");
    console.log(minhaEscolha);
    const fooSim = () => {
        setminhaEscolha("sim");
    }
    const fooNao = () => {
        setminhaEscolha("Não")
    }

    const [menu, setMenu] = useState([
       { pratos: ''},
       { descricao: ''},
        {preco: ''},
        {status: ''}

    ]);
    const [stateInputPratos, setStateInputPratos] = useState();
    const [stateInputDescricao, setStateInputDescricao] = useState();
    const [stateInputPreco, setStateInputPreco] = useState();
/*
    const [status, setStatus]=useState({
        codigo:'',
        type : '',
        mensagem : ''
    })*/

    //const valorInput = e => setMenu({ ...menu, [e.target.name]: e.target.value });
    
    const navigate = useNavigate()
    const goHome = () => { navigate("/") }
    const valorPratos = e => {
        setStateInputPratos(e);
    }
    const valorDescricao = e => {
        setStateInputDescricao(e);
    }
    const valorPreco = e => {
        setStateInputPreco(e);
    }



    const addTodo = async e => {
        e.preventDefault();
        const newMenu = [...menu]
        const newCardapio = {};
        newCardapio.pratos = stateInputPratos;
        newCardapio.descricao = stateInputDescricao;
        newCardapio.preco = stateInputPreco;
        newCardapio.status = minhaEscolha;
        newMenu.push(newCardapio);
        setMenu(newMenu);
        console.log(newCardapio);

         await fetch('http://refugiadonacozinha.com.br/cadastrarCardapio.php', {
            method: 'POST',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCardapio)

        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
               
            }).catch(()=>{
                
              });
                
    }



    

    return (
        <div className="animate-appear with-sidebar">

            <main className='main-form' >
                <form onSubmit={e => addTodo(e)}>
                    <fieldset>

                        <legend>Dados</legend>
                        <h1> cadastrar menu</h1>
                        <p></p>
                        <ButtonPrimary onClick={goHome}>LISTAR</ButtonPrimary>
                        <div className="map-container">
                            <div id="mapid">


                            </div>
                        </div>

                        <div className="input-block">
                            <label htmlFor="name">Prato</label>
                            <input id="name" name="pratos"value ={stateInputPratos} onChange={e=>valorPratos(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
                            <textarea id="about" name="descricao"value ={stateInputDescricao} onChange={e=>valorDescricao(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="whatsapp">Preço</label>
                            <input id="preco" name="preco" value ={stateInputPreco} onChange={e=>valorPreco(e.target.value)} />
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
                            <button type="submit" className="primary-button">Confirmar</button>
                        </div>
                    </fieldset>
                </form>
            </main>

        </div>
    )
}
export default Forms;