import React from 'react'
import "./Product.css"
import Input from "../../composant/Input"
import Textarea from '../../composant/Textarea'
import Button from '../../composant/Button'
import { useDropzone } from 'react-dropzone';
import { useState,useCallback,useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import NavMenuAdmin from '../../composant/navMenu/NavMenuAdmin'
import Sidebar from '../../composant/Sidebar/Sidebar';
import { addProduto } from './produtosReducer'


const ContainerDrop = styled.div`
	flex: 1;
	display: flex;
	flex-direction: wrap;
    justify-content:center;
	align-items: center;
	padding: 15px;
	border-width: 2px;
	border-radius: 10px;
	border: blue 1px solid ;
	background-color: #fafafa;
	color: black;
	font-weight: bold;
	font-size: 1.4rem;
	outline: none;
	transition: border 0.24s ease-in-out;
    width:170px;
    height:5px;
    gap:10px;
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
    boxSizing: 'border-box',
    

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

export const AddProduct = () => {

    const [price, setPrice]=useState();
    const [ categorie, setCategorie]=useState();
    const [ nome, setNome]=useState();
    const [descricao, setDescricao]=useState();


    const [counter, setCounter] = useState(0)
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [imageG, setImageG] = useState([]);
    const dispatch = useDispatch();
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
        nome,
        categorie,
        price,
        descricao,
    }
    console.log(form)
    await dispatch(addProduto(form))
}
}
useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));

}, []);
  return (
    <>
     <Sidebar/>
     <section id='content'>
     <NavMenuAdmin/>
     
<main>
<form  onSubmit={e => addTodo(e)}>
<div class="head-title">
				<div class="left">
					<h1>Adicionar novo produto</h1>
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
				
					<button class="btn-download" type='submit'>Publicar</button>
				
			</div>
    <div className='product-form'>
   
   
    <div className='block-left-input'>
    <Input type="text"  className="usuario" name="nome" value={nome} onChange={e=>setNome(e.target.value)} />
   
   
    <Textarea value={descricao} onChange={e=>setDescricao(e.target.value)}/>
    <Input type="text" placeholder="Preço (R$)" className="usuario" name="produto" value={price}  onChange={e=>setPrice(e.target.value)} />
    <Input type="text" placeholder="Preço promocional (R$)" className="usuario" name="email"  />
    </div>
    
    

    <div className='block-right'>
    <div className="block-right-imagem">
        <h1>imagem do produto</h1>
                            <ContainerDrop   {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <i class="fa-solid fa-camera"></i>
                                <span>  Adicionar mídia</span>
                            </ContainerDrop>
                            <div style={thumbsContainer}>
                                {thumbs}
                            </div>

                        </div>

                        <div className='block-right-galeria'>
                            <h1>galeria de imagens do produto</h1>
                        </div>

                        <div className='block-right-categoria'> 
                            <h1>Categorias de produto</h1>
                            <div class= "pdt cat">
                            <label for="categoria">Escolha a categoria:</label>
                            <select name="categoria" id ="categoria"value={categorie} onChange={e=>setCategorie(e.target.value)}>
                                <option value="combos">combos</option>
                                <option value="cerveja">cerveja</option>
                                <option value="sucos">sucos</option>
                                <option value="pratos">pratos</option>
                                <option value="entrada">entrada</option>
                            </select>
                            
                        </div>
                        </div>
                        </div>
                      
    </div>
    </form>
    </main>
    </section>
    </>
  )
}
export default AddProduct

