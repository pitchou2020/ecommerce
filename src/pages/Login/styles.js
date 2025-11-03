import styled from "styled-components";

export const ContainerLogin = styled.div`
    background-color: rgba(0, 0, 0, .9);
    
    width: 100%;
    height: 100%;
    position: absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-shrink: 0;
    z-index:5000;
    
@media(max-width:600px){
    background-color: rgba(0, 0, 0, .9);
    height: 100%;
    position: absolute;
    display:flex;
    justify-content:center;
    align-items:center
    flex-direction:column;
    }
`;

export const ContentForm = styled.div`
position: absolute;
width: 350px;
    height: 520px;
    flex-shrink: 0;
    display: flex;
    background: #ffffff;  
    border-radius: 5px;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    top: 50%;
 left: 50%;
    margin-top:-320px;
    margin-left:-260px;
    @media(max-width:600px){

    }
`;
export const LogoLogin = styled.div`
    img{padding: 10px;
        margin : 10px;}
    
`;

export const TxtFim = styled.a`
text-align: center;
text-decoration: none;
    color: red;
    cursor: pointer;
`;

export const LabelLogin = styled.label`
        color: #8fa7b3;
        line-height: 1.5;
        font-weight:600;
        font-size: 18px;
    
`;


export const AlertSucess = styled.p`
    background-color:#d1e7dd;
    color: #0f5132;
    margin: 20px 0;
    border: 1px solid #badbcc;
    border-radius:4px;
    padding: 7px;   
`;
export const AlertDanger  = styled.p`
    background-color:#f8d7da;
    color: #842029;
    margin: 20px 0;
    border: 1px solid #badbcc;
    border-radius:4px;
    padding: 7px;   
`;

export const FormLogin = styled.div`
    width: 100%;
    background: white;
    display:flex;
    flex-direction: column;
    gap:15px;

`;
export const CloseButton = styled.button`
        position: absolute;
        top:10px;
        right:10px;
        padding:5px 7px;
`;