import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import * as C from './styles';
import Button from "../../composant/Button"
import Input from "../../composant/Input"
import Textarea from "../../composant/Textarea"
import ButtonSelect from "../../composant/ButtonSelect"
import FormsEdit from '../../composant/Forms/FormsEdit';
import api from '../../config/configApi'


export default function EditarRecettes(props) {

    const [minhaEscolha, setminhaEscolha] = useState("");
    //console.log(minhaEscolha);
    const fooSim = () => {
        setminhaEscolha("vegan");
    }
    const fooNao = () => {
        setminhaEscolha("Não vegan")
    }

    const [dataCardapio, setDataCardapio] = useState([]);
    const params = useParams();
    const idcad = useState(params.id);
    const [titre, setTitre] = useState('');
    const [infos, setInfos] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [etapes, setEtapes] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const id_recettes = idcad[0];
    const [categorie, setCategorie]=useState('');
    const [vegan, setVegan]=useState('');
    const [sinopse, setSinopse]=useState('');
    const [isChecked,setIsChecked]= useState();
    

    const [recettes, setRecettes] = useState([
        { titre: '' },
        { infos: '' },
        { ingredients: '' },
        { etapes: '' },
        { url_images: '' },
        { url: '' },
        { categorie: '' }

    ]);

    const valorVegan = evt =>{
        if(evt.target.checked==true){
            setIsChecked("vegan");
        }
        else{setIsChecked("no vegan");}
        
    }

    const editTodo = async e => {
        e.preventDefault();
        console.log(titre);
       

        const newrecettes = [...recettes]
        const newCardapio = {};
        newCardapio.id_recettes = idcad[0];
        newCardapio.titre = titre;
        newCardapio.infos = infos;
        newCardapio.ingredients = ingredients;
        newCardapio.etapes = etapes;
        newCardapio.image = image;
        newCardapio.url = url;
        newCardapio.categorie = minhaEscolha;
        newrecettes.push(newCardapio);
        setRecettes(newrecettes);
        //console.log(newCardapio);
       

       /* const formData = new FormData();
        formData.append('image',image);
        formData.append('id_recettes' , idcad[0]);
        formData.append('titre' , titre);
        formData.append('infos' , infos);
        formData.append('ingredients' , ingredients);
        formData.append('etapes' , etapes);
        formData.append('vegan' , isChecked);
        formData.append('sinopse' , sinopse);
        formData.append('categorie' , categorie);*/
        const form ={
            id_recettes:idcad[0],
            image: image,
            titre: titre,
            categorie:categorie,
            ingredients: ingredients,
            etapes: etapes,
            infos: infos,
            sinopse:sinopse,
            vegan: isChecked
        }
      
        const headers = {
            'headers': {
              'Content-Type': 'application/json'
            }
          }
        await api.post("/editar_recette_cuisine_libre.php",form)
        .then((response)=>{
            console.log(response.data)
            
        }).catch((err)=>{
            
        })
       /* 
        await fetch('https://refugiadonacozinha.com.br/editar_recette.php', {
            method: 'POST',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_recettes, titre, infos, ingredients, etapes, image, url, categorie })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

            });*/

    }


    useEffect(() => {
        const getProduto = async () => {
            await fetch("https://refugiadonacozinha.com.br/single_recette_cuisine_libre.php?id=" + idcad)
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);
                    setDataCardapio(responseJson.produto);
                    setTitre(responseJson.produto.titre);
                    setInfos(responseJson.produto.infos);
                    setIngredients(responseJson.produto.ingredients);
                    setEtapes(responseJson.produto.etapes);
                    setImage(responseJson.produto.url_images);
                    setCategorie(responseJson.produto.categorie);
                    
                })
        }
        getProduto();
    }, []);

    const navigate = useNavigate()
    const goHome = () => { navigate("/") }

    return (
        <div>

            <div className="animate-appear with-sidebar">

                <C.Container>
                    <C.ButtonPrimary onClick={goHome}>LISTAR</C.ButtonPrimary>
                    <C.Content>

                        <form onSubmit={editTodo} >

                            <legend>Editar recettes </legend>

                            
                            {idcad[0]}
                           
                        
                            <div className="map-container">
                            <div id="mapid">
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Titúlo</label>
                            <input id="name" name="pratos"value ={titre} onChange={e=>setTitre(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Categorie</label>
                            <input id="name" name="pratos"value ={categorie} onChange={e=>setCategorie(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Sinopse </label>
                            <textarea id="about" name="sinopse"value ={sinopse} onChange={e=>setSinopse(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Ingredients <span>Separe por virgula os ingredientes</span></label>
                            <textarea id="about" name="ingredients"value ={ingredients} onChange={e=>setIngredients(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Modo de preparo <span>Separe por virgula as etapas</span></label>
                            <textarea id="about" name="etapes"value ={etapes} onChange={e=>setEtapes(e.target.value)}></textarea>
                        </div>
                        <div className="input-block">
                            <label htmlFor="whatsapp">Infos <span>Methode de cuisson, temps de cuisson,mode de cuisson</span></label>
                            <input id="preco" name="infos" value ={infos} onChange={e=>setInfos(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="whatsapp">Url_images </label>
                            <input id="images" name="images" value ={image} onChange={e=>setImage(e.target.value)} />
                        </div>
                            <div className="input-block">
                            <label htmlFor='vegan'>É vegano?</label>
                            <input type="checkbox" value={isChecked} onChange={valorVegan}/>
                            <button ></button>
                        </div>
                        
                            <Button type="submit" className="primary-button" Text="Editar"></Button>


                        </form>
                    </C.Content>
                </C.Container>

            </div>
        </div>
    )
}
