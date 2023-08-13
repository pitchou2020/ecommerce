import styled from "styled-components";

export const InputPesquisa = styled.input`
    width: 100%;
    max-width:350px;
    height:36px;
    background: #f5f8fa;
    flex-shrink:0;
    border: 1px solid #ed2f59;
    border-radius: 15px 0px 0px 15px;
    color: #5c8599;
    font-size:16px;
    text-align: center;
    :valid{
        border: 1px solid #ed2f59;
    }`;

    export const FormPesquisa = styled.form`
display: flex;
margin-left:30px;


`;

export const PesquisaButton = styled.button`
display:flex;      
    align-items: center;
    justify-content: center;
    width:55px;
    height:36px;
    
    
    
    border-radius: 0px 15px 15px 0px;
    background-color:#ed2f59;
    z-index:1;}
    i{
        font-size: 25px;
        color : white;
    }


@media(max-width:600px){
    display:flex;      
    align-items: center;
    justify-content: center;
    width:55px;
    height:36px;
    
    
    border-radius: 0px 15px 15px 0px;
    background-color:#ed2f59;
    z-index:1;}
    i{
        font-size: 25px;
        color : white;
    }
`;