import styled from "styled-components";

export const ContainerPerfil = styled.div`
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    position: absolute;
    display:flex;
    justify-content:right;
    align-items:center;   
    z-index:1;
`;

export const ContentPerfil = styled.div`
position: absolute;
    width: 350px;
    height: auto;
    min-height:250px;
    flex-shrink: 0;
    display: flex;
    background: #ffffff;  
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 1em #6c757d;
    top:62px;
    right:150px;
`;
export const LogoPerfil = styled.div`
position : absolute;

        top:10px;
        left:10px;
        padding:5px 7px;
    img{border-radius:50%;
    margin-left:1px;
}
   
    
`;

export const TxtFim = styled.a`
text-align: center;
text-decoration: none;
    color: red;
    cursor: pointer;
`;

export const LabelPerfil = styled.label`
color: #8fa7b3;
       
        line-height: 1.5;
        font-weight:600;
        font-size: 18px;
    
`;

export const FormPerfil = styled.div`
    width: 80%;
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