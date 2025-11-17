import styled from "styled-components";

export const Button = styled.button`
display: block;
margin: 20px auto;
outline: 0;
background: var(--dark);
width: 80%;
border: 0;
padding: 15px;
border-radius: 3px;
box-sizing: border-box;
font-size: 16px;
cursor: pointer;
color: #ffffff;
   

    transition: background-color .2s;

    :active{
        background: #edfff6;
        border: 1px solid #a1e9c5;
        color :#37c77f;
    };
    :hover{
        background-color:#17d6eb;
        color:#fff;}

    
`