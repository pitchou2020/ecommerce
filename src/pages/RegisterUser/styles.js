import styled from "styled-components";

export const ContainerRegister = styled.div`
    background-color: rgba(0, 0, 0, .9);
    width: 100%;
    height: 100%;
    position: absolute;
    display:flex;
    justify-content:center;
    align-items:center
    @media(max-width:600px){
       
    }
`;
export const ContentRegister= styled.div`
    position:absolute;
    display:flex;
    width: 600px;
    height: 480px;
    flex-shrink: 0;
    display: flex;
    background: #ffffff;  
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top:-240px;
    
    top:50%;
    
    @media(max-width:600px){
       width:100%;
       max-width:600px;
    }
   
`;

export const ContentRegisterImages= styled.div`
width: 250px;
height: 480px;
background: #000;
background-image: url(${props => props.img});
@media(max-width:600px){
display:none;
}
& img{
    width:150px;
}
`;

export const ContentRegisterForm= styled.div`
width: 350px;
height: 480px;
flex-shrink: 0;
display: flex;
background: #ffffff;  
border-radius: 5px;
justify-content: center;
align-items: center;
flex-direction: column;

`;

export const LabelRegister = styled.label`
color: #8fa7b3;
       
        line-height: 1.5;
        font-weight:600;
        font-size: 18px;
    
`;

export const FormRegister = styled.div`
    width: 100%;
    background: white;
    display:flex;
    flex-direction: column;
    gap:15px;

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
export const CloseButton = styled.button`
        position: absolute;
        top:10px;
        right:10px;
        padding:5px 7px;
`;