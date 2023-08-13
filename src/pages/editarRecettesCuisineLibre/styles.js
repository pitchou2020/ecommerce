import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex direction: column;
    gap: 10px
    height: 100vh
    
`;
export const Content = styled.div`
width: 100%;
   display: flex;
   justify-content:center;
   align-items:center;
   gap:15px;
    background-color: white;
    border: 1px solid#d3e2e5;
    border-radius: 2rem;
    padding:20px;
    overflow: hidden;
    padding: 8rem;
`

export const ContentButton = styled.div`
display: flex;
flex-direction: row;
gap:20px;
align-items:center;
justify-content: center;
margin:50px;

`

export const ButtonPrimary = styled.button`
    background-color:#fff;
    color: #3e3e3e;
    padding: 5px 8px;
    border-radius:4px;
    cursor: pointer;
    font-size:14px;
    :hover{
        background-color:#0d6efd;
        color:#fff;}

`;
export const Label = styled.label`
color: #8fa7b3;
        margin-bottom: .8rem;
        line-height: 1.5;
        font-weight:600;
        font-size: 18px
    
`;

export const ConteudoProd = styled.p`
    color: #3e3e3e;
    font-size: 16px
`
