import React, {useCallback,useEffect, useState } from 'react';

import './forms.css';
import './buttons.css';
import './main.css'
import { ButtonPrimary } from './styles';
import { useNavigate } from 'react-router-dom'

import {useDropzone} from 'react-dropzone';
//import Upload from './Upload/Upload';
import Upload from './Upload/UploadClass'

//import Buttons from './Buttons';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
function FormsEdit(props) {
    
    const [minhaImages, setMinhaImages]= useState([]);
    const file = (props.images).map((item) => item);
    const minhaImage = (props.images).map((item) => item.name);
    //const minhaCaminho = (props.images).map((item) => item.name);

    const [menu, setMenu] = useState([
       { titre: ''},
       { categorie: ''},
        {ingredients: ''},
        {etapes: ''},
        {infos: ''},
        {imagem: ''},


    ]);
    const [stateInputTitre, setStateInputTitre] = useState();
    const [stateInputCategorie, setStateInputCategorie] = useState();
    const [stateInputIngredients, setStateInputIngredients] = useState();
    const [stateInputEtapes, setStateInputEtapes] = useState();
    const [stateInputInfos, setStateInputInfos] = useState();
    const [stateInputSinopse, setStateInputSinopse] = useState();
    const [stateImages, setStateImages] = useState("");
    const [isChecked,setIsChecked]= useState();
    //const [stateFile, setStateFile]= useState();
    
/*
    const [status, setStatus]=useState({
        codigo:'',
        type : '',
        mensagem : ''
    })*/

    //const valorInput = e => setMenu({ ...menu, [e.target.name]: e.target.value });
    
    const navigate = useNavigate()
    const goHome = () => { navigate("/") }
    
const valorTitre = e => {setStateInputTitre(e);}
const valorCategorie = e => {setStateInputCategorie(e);}
const valorIngredients = e => {setStateInputIngredients(e);}
const valorEtapes = e => {setStateInputEtapes(e);}
const valorInfos = e => {setStateInputInfos(e);}
const valorSinopse = e => {setStateInputSinopse(e);}
/*const valorVegan = useCallback((evt) => {
    setIsChecked(evt.target.checked);
}, [])*/


const valorVegan = evt =>{
    if(evt.target.checked==true){
        setIsChecked("vegan");
    }
    else{setIsChecked("no vegan");}
    
}

    const addTodo = async e => {
        e.preventDefault();
       /* const formData = new FormData();
        formData.append('image',stateImages)
        const newMenu = [...menu]
        const newCardapio = {};
        newCardapio.titre = stateInputTitre;
        newCardapio.categorie = stateInputCategorie;
        newCardapio.ingredients = stateInputIngredients;
        newCardapio.etapes =  stateInputEtapes;
        newCardapio.infos =  stateInputInfos;
        newCardapio.imagem = file;
        newMenu.push(newCardapio);
        setMenu(newMenu);
        console.log(newCardapio);
        console.log(stateImages['image_path']);

         await fetch('http://localhost/RestoAfrica/src/views/add_recette.php', {
            method: 'POST',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCardapio)

        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
               
            }).catch(()=>{
                
              });*/
                
    }
    return (
        <div className="animate-appear with-sidebar">

            <main >
                <form onSubmit={e => addTodo(e)} className ="form-cadastro">
                    <fieldset>
                        <legend>cadastrar recette</legend>
                        <div className="map-container">
                            <div id="mapid">
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Titúlo</label>
                            <input id="name" name="pratos"value ={stateInputTitre} onChange={e=>valorTitre(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Categorie</label>
                            <input id="name" name="pratos"value ={stateInputCategorie} onChange={e=>valorCategorie(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Sinopse </label>
                            <textarea id="about" name="sinopse"value ={stateInputSinopse} onChange={e=>valorSinopse(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Ingredients <span>Separe por virgula os ingredientes</span></label>
                            <textarea id="about" name="ingredients"value ={stateInputIngredients} onChange={e=>valorIngredients(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Modo de preparo <span>Separe por virgula as etapas</span></label>
                            <textarea id="about" name="etapes"value ={stateInputEtapes} onChange={e=>valorEtapes(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="whatsapp">Infos <span>Methode de cuisson, temps de cuisson,mode de cuisson</span></label>
                            <input id="preco" name="infos" value ={stateInputInfos} onChange={e=>valorInfos(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor='vegan'>É vegano?</label>
                            <input type="checkbox" value={isChecked} onChange={valorVegan}/>
                            <button ></button>
                        </div>
                        <div className="input-block">
<Upload
titre={stateInputTitre}
categorie={stateInputCategorie}
ingredients={stateInputIngredients}
etapes={stateInputEtapes}
infos={stateInputInfos}
sinopse={stateInputSinopse}
vegan={isChecked}
/> 
                        </div>
                 
          
                        
                    </fieldset>
                </form>
            </main>

        </div>
    )
}
export default FormsEdit;