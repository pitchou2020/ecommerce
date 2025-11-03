import React from 'react'
import { useEffect, useState,useCallback } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getRecette } from './../Recettes/recettesReducer';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as C from './styles';
import Button from "./../../composant/Button"
import Input from "./../../composant/Input"
import Textarea from "./../../composant/Textarea"
import ButtonSelect from "./../../composant/ButtonSelect"
import FormsEdit from '../../composant/Forms/FormsEdit';
import api from '../../config/configApi'
import NavMenuAdmin from '../../composant/navMenu/NavMenuAdmin'
import Sidebar from '../../composant/Sidebar/Sidebar';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { editRecette } from './../Recettes/recettesReducer';
import "./../../composant/Forms/forms.css"

const ContainerDrop = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;
	border-width: 2px;
	border-radius: 10px;
	border-style: dashed;
	background-color: #fafafa;
	color: black;
	font-weight: bold;
	font-size: 1.4rem;
	outline: none;
	transition: border 0.24s ease-in-out;
`;

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

export default function EditarRecettes(props) {

    const dataRecettes = useSelector(state => state.recettesReducer)
   
    const dispatch = useDispatch()

    const [minhaEscolha, setminhaEscolha] = useState("");
    const [ingredientes, setIngrendientes] = useState([]);
    const ingredient = [...ingredientes];
    const [etapas,setEtapas] = useState([]);
    const [counter, setCounter] = useState(0)
    //console.log(minhaEscolha);
    const fooSim = () => {
        setminhaEscolha("vegan");
    }
    const fooNao = () => {
        setminhaEscolha("Não vegan")
    }
    const [stateInputIngredients, setStateInputIngredients] = useState([]);
    const [stateInputEtapes, setStateInputEtapes] = useState();
    const [dataCardapio, setDataCardapio] = useState([]);

    
    const valorIngredients = e => {
        setStateInputIngredients([e]);
        

    }
    
    const valorEtapes = e => { setStateInputEtapes(e); }
  
    const params = useParams();
    const idcad = useState(params.id);
    const [titre, setTitre] = useState('');
    const [infos, setInfos] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [etapes, setEtapes] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const id_recettes = idcad[0];
    const [categorie, setCategorie] = useState('');
    const [vegan, setVegan] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [isChecked, setIsChecked] = useState();


    const [recettes, setRecettes] = useState([
        { titre: '' },
        { infos: '' },
        { ingredients: '' },
        { etapes: '' },
        { url_images: '' },
        { url: '' },
        { categorie: '' }

    ]);
    
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [imageG, setImageG] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
      
        acceptedFiles.map((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                setImageG(binaryStr)
            }
            reader.readAsDataURL(file)
        })

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop , multiple: false })
    const { getRootPropsMult, getInputPropsMult } = useDropzone({ onDrop })
    const valorVegan = evt => {
        if (evt.target.checked == true) {
            setIsChecked("vegan");
        }
        else { setIsChecked("no vegan"); }

    }

    function base64(file) {
        var coolFile = {};
        function readerOnload(e) {
            var base64 = btoa(e.target.result);
            coolFile.base64 = base64;
            return coolFile
        };

        var reader = new FileReader();
        reader.onload = readerOnload;

        var file = file[0].files[0];
        coolFile.filetype = file.type;
        coolFile.size = file.size;
        coolFile.filename = file.name;
        reader.readAsBinaryString(file);
    }
    const onFileChange = (e) => {

        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (event) => {
            setImage(event.target.result)
        }
    }

    const fileImage = files.map(file => <li key={file.path}>{file.path}</li>);
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));
    const editTodo = async e => {

        e.preventDefault();

        for (var i = 0; i < files.length; i++) {
            let file = files[i];            
           
        const form = {
            id_recettes: location.state.id_recette,
            image: imageG,
            titre: titre,
            categorie: categorie,
            ingredients: newIngredients.toString(),
            etapes: newEtapes.toString(),
            infos: infos,
            sinopse: sinopse,
            vegan: isChecked
        }
        
        await dispatch(editRecette(form))

    }
}


    const location = useLocation()
    useEffect(() => {

        if (dataRecettes.length === 0) {
            dispatch(getRecette());
          }

    }, []);
    console.log(location.state.ingredients)
    let newIngredientes = location.state.ingredients.split(',');
   
   const newIngredients = [...newIngredientes]
   
   console.log(newIngredients)
   
  
    
    let newEtapes = location.state.etapes.split(',');
   

    const navigate = useNavigate()
    const goHome = () => { navigate("/") }

    const addPhotoField = () => {
        //pegar o container de fotos #images
        const container = document.querySelector('#ingrendientes')
        //pegar o container para duplicar .new-images
        const fieldsContainer = document.querySelectorAll('.new-ingrendient')
        //realizar o clone da última imagem adicionada
        const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        //verificar se o campo está vazio, se sim não adicionar ao container de images
        console.log(newFieldContainer)
        const input = newFieldContainer.children[1];



        if (input.value == "") {
            return
        }
        else {
            console.log(input.value)
            console.log(newIngredients)
            newIngredients.push(input.value)
            setIngrendientes(newIngredients)
            setCounter(counter + 1)
        }
       
        //limpar o campo antes adicionar ao container de images
       
        input.value = " "
        //adicionar o clone 
        container.appendChild(newFieldContainer)

      
       
       


    }
   
    const addPhotoFieldEtapes = () => {
        //pegar o container de fotos #images

        //pegar o container de fotos #images
        const container = document.querySelector('#etapes')
        //pegar o container para duplicar .new-images
        const fieldsContainer = document.querySelectorAll('.new-etapes')
        //realizar o clone da última imagem adicionada
        const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        //verificar se o campo está vazio, se sim não adicionar ao container de images
        console.log(newFieldContainer.children[1])
        const input = newFieldContainer.children[0];



        if (input.value == "") {
            return
        }
        else {
            newEtapes.push(input.value)
            setEtapas(newEtapes)
            setCounter(counter + 1)
        }

        //limpar o campo antes adicionar ao container de images
        input.value = ""
        //adicionar o clone 
        container.appendChild(newFieldContainer)


    }

    return (
        <>

            <Sidebar />
            <section id="content">
            <NavMenuAdmin />

            
<main>
                

                  

                            <form onSubmit={editTodo} >
                            <div class="head-title">
                               
                                <div class="left">
                                <h1>Editar recettes </h1>
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
				
					<button class="btn-download" type='submit'>Editar</button>

</div>
<div className='product-form-edit'>
                                {location.state.id_recette}


                                <div className="map-container">
                                    <div id="mapid">
                                    </div>
                                </div>
                                <div className="input-block">
                                    <label htmlFor="name">Titúlo</label>
                                    <input id="name" name="pratos" value={titre} onChange={e => setTitre(e.target.value)} />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="name">Categorie</label>
                                    <input id="name" name="pratos" value={categorie} onChange={e => setCategorie(e.target.value)} />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="about">Sinopse </label>
                                    <textarea id="about" name="sinopse" value={sinopse} onChange={e => setSinopse(e.target.value)}></textarea>
                                </div>
                                <div className="input-block ingrendientes">
                                   
                                    <div className='n-ingrendients' id="ingrendientes">
                                        {newIngredientes.map(ingr =>
                                        
                                            <div className='new-ingrendient'>
                                                 <label htmlFor="about">Ingredients </label>
                                                <input id="ingrendientes" name="ingredientes[]" value={ingr} onChange={e => valorIngredients(e.target.value)}></input>
                                            </div>
                                        )}
                                    </div>
                                    <button type="button" onClick={addPhotoField}> <i class="fa fa-plus"></i>Adicionar ingrediente</button>
                                </div>
                                <div className="input-block ingrendientes">
                                    <label htmlFor="about">Modo de preparo</label>
                                    <div className='n-etapes' id="etapes">
                                    {newEtapes.map(etape =>
                                        <div className='new-etapes'>
                                        <input id="etapes" name="etapes[]" value={etape} onChange={e => setEtapes(e.target.value)}></input>
                                    </div>
                                    )}
                                    </div>
                                    <button type="button" onClick={addPhotoFieldEtapes}> <i class="fa fa-plus"></i>Adicionar etapes de preparo</button></div>

                                <div className="input-block">
                                    <label htmlFor="whatsapp">Infos <span>Methode de cuisson, temps de cuisson,mode de cuisson</span></label>
                                    <input id="preco" name="infos" value={infos} onChange={e => setInfos(e.target.value)} />
                                </div>
                                <div className='input-block'>
                            <label htmlFor='vegan'>É vegano?</label>
                            <input type="checkbox" id="switch-mode2"   value={isChecked} onChange={valorVegan} />
                            <label for="switch-mode2" class="switch-mode2"></label>
                           
                        </div>
                        <div className="input-block">
                            <ContainerDrop   {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Solte arquivos aqui para enviar, ou Selecionar arquivos</p>
                            </ContainerDrop>
                            <div style={thumbsContainer}>
                                {thumbs}
                            </div>

                        </div>

                               </div>


                            </form>
                      

                
                </main>
            </section>
        </>
    )
}
