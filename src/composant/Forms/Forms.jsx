import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import api from './../../config/configApi'
import { addRecette} from './../../pages/Recettes/recettesReducer';
import { addPost} from './../../pages/Recettes/recettesReducer';


import './forms.css';
import './buttons.css';


import { useNavigate } from 'react-router-dom'

import { useDropzone } from 'react-dropzone';
//import Upload from './Upload/Upload';
import Upload from './Upload/UploadClass'

//import Buttons from './Buttons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';


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
function Forms(props) {

    const [stateInputTitre, setStateInputTitre] = useState();
    const [stateInputCategorie, setStateInputCategorie] = useState();
    const [stateInputIngredients, setStateInputIngredients] = useState([]);
    const [stateInputEtapes, setStateInputEtapes] = useState();
    const [stateInputInfos, setStateInputInfos] = useState();
    const [stateInputSinopse, setStateInputSinopse] = useState();
    const [stateImages, setStateImages] = useState("");
    const [isChecked, setIsChecked] = useState();
    const form = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const goHome = () => { navigate("/") }

    const valorTitre = e => { setStateInputTitre(e); }
    const valorCategorie = e => { setStateInputCategorie(e); }
    const valorIngredients = e => {
        setStateInputIngredients([e]);

    }

    const valorEtapes = e => { setStateInputEtapes(e); }
    const valorInfos = e => { setStateInputInfos(e); }
    const valorSinopse = e => { setStateInputSinopse(e); }



    const valorVegan = evt => {
        if (evt.target.checked == true) {
            setIsChecked("vegan");
        }
        else { setIsChecked("no vegan"); }

    }
    
    
    //adicionar o campo de fotos
    const [ingredientes, setIngrendientes] = useState([]);
    const newIngredientes = [...ingredientes]
    const [etapes, setEtapes]=useState([]);
    const newEtapes = [...etapes];
    const [numRecette, setNumRecette] = useState([])
    const newNumIngredientes = [...numRecette]
    const [counter, setCounter] = useState(0)
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

    const addPhotoField = () => {
        //pegar o container de fotos #images
        const container = document.querySelector('#ingrendientes')
        //pegar o container para duplicar .new-images
        const fieldsContainer = document.querySelectorAll('.new-ingrendient')
        //realizar o clone da última imagem adicionada
        const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        console.log(newFieldContainer)
        //verificar se o campo está vazio, se sim não adicionar ao container de images
        const input = newFieldContainer.children[1];
       

        if (input.value == "") {
            return
        }
        else {
            
            newIngredientes.push(input.value)
            setIngrendientes(newIngredientes)
            setCounter(counter + 1)
        }
     
        //limpar o campo antes adicionar ao container de images
        input.value = ""
        //adicionar o clone 
        container.appendChild(newFieldContainer)
      
       

    }

    const addPhotoFieldEtapes = () => {
        //pegar o container de fotos #images
        const container = document.querySelector('#etapes')
        //pegar o container para duplicar .new-images
        const fieldsContainer = document.querySelectorAll('.new-etapes')
        //realizar o clone da última imagem adicionada
        const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        //verificar se o campo está vazio, se sim não adicionar ao container de images
        const input = newFieldContainer.children[1];
       

        if (input.value == "") {
            return
        }
        else {
            newEtapes.push(input.value)
            setEtapes(newEtapes)
          
        }
        
        //limpar o campo antes adicionar ao container de images
        input.value = ""
        //adicionar o clone 
        container.appendChild(newFieldContainer)
        

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
   

    const addTodo = async e => {
        e.preventDefault();
        let formData = new FormData();
      

        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            
            formData.append("file", file);
            console.log(file)
      
        const form ={
            image:imageG,
            titre: stateInputTitre,
            categorie:stateInputCategorie,
            ingredients: ingredientes.toString(),
            etapes: etapes.toString(),
            infos: stateInputInfos,
            sinopse: stateInputSinopse,
            vegan: isChecked,
        }
        console.log(form)
        await dispatch(addRecette(form))
    }
    }
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));

    }, []);


    return (
        <>

            <section >
                <form onSubmit={e => addTodo(e)} className="form-cadastro" id="form-cad-congo" ref={form}>
                    <fieldset>
                        <legend>cadastrar recette</legend>
                        <div className="map-container">
                            <div id="mapid">
                            </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Titúlo</label>
                            <input id="name" name="pratos" value={stateInputTitre} onChange={e => valorTitre(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Categorie</label>
                            <input id="name" name="pratos" value={stateInputCategorie} onChange={e => valorCategorie(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Sinopse </label>
                            <textarea id="about" name="sinopse" value={stateInputSinopse} onChange={e => valorSinopse(e.target.value)}></textarea>
                        </div>
                        <div className="input-block ingrendientes" >
                            <div className='n-ingrendients' id="ingrendientes">
                                <div className='new-ingrendient'>
                                    <label htmlFor="ingrendientes">Ingredients </label>

                                    <input id="ingrendientes" name="ingredientes[]" value={stateInputIngredients} onChange={e => valorIngredients(e.target.value)} />

                                </div>

                            </div>
                            <button type="button" onClick={addPhotoField}> <i class="fa fa-plus"></i>Adicionar ingrediente</button>
                        </div>

                        <div className="input-block ingrendientes" >
                            <div className='n-etapes' id="etapes">
                                <div className='new-etapes'>
                                    <label htmlFor="etapes">Modo de preparo </label>

                                    <input id="etapes" name="etapes[]" value={stateInputEtapes} onChange={e => valorEtapes(e.target.value)}/>

                                </div>

                            </div>
                            <button type="button" onClick={addPhotoFieldEtapes}> <i class="fa fa-plus"></i>Adicionar etapes de preparo</button>
                        </div>

        
                        <div className="input-block">
                            <label htmlFor="whatsapp">Infos <span>Methode de cuisson, temps de cuisson,mode de cuisson</span></label>
                            <input id="preco" name="infos"  value={stateInputInfos} onChange={e => valorInfos(e.target.value)} />
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

                        

                    </fieldset>
             <div className="input-block">
                <button type="submit" className="primary-button" >Enviar</button>
            </div>
                </form>
            </section>

        </>
    )
}
export default Forms;