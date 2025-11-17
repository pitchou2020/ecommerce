import styled from "styled-components";

export const ContainerPesquisa = styled.div`
display:flex;

@media(max-width:600px){
    background-color: rgba(0, 0, 0, 1);
    width: 100vw;
    height: 100vh;
    position: absolute;
    display:none;
    justify-content:center;
    align-items:center
    flex-shrink:0;
    
}
`;

export const contentPesquisa = styled.div`
@media(max-width:600px){
    position: absolute;
    width: 70vw;
    height: auto;
    flex-shrink:0;
    display: flex;
    background: #ffffff;  
    border-radius: 5px;
    flex-direction: column;}
`;



export const CloseButtonP = styled.button`
display:none;

@media(max-width:600px){
    display:flex;
        position:absolute;
        color:white;
        color : #000;
        top:15px;
        right:10px;
        padding:5px 7px;
        z-index:1;
    }
`;

export const ContentResult = styled.div`
display : flex;
background-color:background-color:#f1f1f1;
color : #555;
@media(max-width:600px){
    display:flex;
    width: 90%;
    margin-left: auto;
}
ul{
    width: 200px;
    list-style-type:none;
    
}
 
li{
    background-color:#f1f1f1;
}

a{
    text-decoration:none;
    color:#555;
}

`;

export const NavPesquisa = styled.div`
@media(max-width:600px){
    display:flex;
    flex-direction: row;
    top: 10px;
}
`;


   


