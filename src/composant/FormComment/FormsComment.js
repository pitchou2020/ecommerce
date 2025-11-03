import React, { useState, useEffect } from 'react';


import './forms.css';
import './buttons.css';
import './main.css'
import { ButtonPrimary } from './styles';
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from "react-router-dom";


import { useDropzone } from 'react-dropzone';
import Login from '../../pages/Login/Login';



//import Buttons from './Buttons';


const FormsComment=({
    handleSubmit,
    submitLabel,
    initialText = "",
}) =>{
    const [usuario, setUsuario] = useState([
        { nome: '' },
        { Email: '' },
        { message: '' },


    ]);
    console.log(initialText)
    const [stateInputNome, setStateInputNome] = useState();
    const [stateInputEmail, setStateInputEmail] = useState();
    const [stateInputMessage, setStateInputMessage] = useState(initialText);
    const [activeComment, setActiveComment] = useState(null);
    const params = useParams();
    const idcad = useState(params.id);
  

    const navigate = useNavigate()
    const goHome = () => { navigate("/") }
    const goRegister = () => { navigate("/register/") }
    const currentUser = localStorage.getItem('idUser')

    const isTextareaDisabled = stateInputMessage.length === 0;
    const [hasCancelButton, setHasCancelButton] = useState(false)
    const handleCancel = () => {
        setActiveComment(null);
    }
    
    const UrlBase = 'http://localhost/RestoAfrica/src/views/';

    const onSubmit=(e)=>{
        e.preventDefault();
        handleSubmit(stateInputMessage);
        setStateInputMessage("")
            
        

    }    
    
    return (
        <>
            <main >
                <form onSubmit={onSubmit} className="">
                    <fieldset>

                        <div className="input-block-coment">
                            <button  className="profile-user">
                                <i class="fa-solid fa-user">
                                    </i></button>
                            <textarea id="message" 
                            value= {stateInputMessage}
                            className="comment-form-textarea" 
                            placeholder='Comentarios, sugestão , receitas?' 
                            name="message"
                             onChange={e => setStateInputMessage(e.target.value)}></textarea>
                             
                            <button   type="submit" disabled={isTextareaDisabled} ><i class="fa-solid fa-send"></i>
                            {submitLabel}
                            </button>
                            
                            {hasCancelButton && (<button
                                type="button"
                                className="comment-form-button comment-form-cancel-button"

                            >
                                Cancel
                            </button>)}
                        </div>
                        

                    </fieldset>


                </form>
            </main>


        </>
    )
}
export default FormsComment;