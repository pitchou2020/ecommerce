import styled from "styled-components";

export const ButtonError = styled.button`
    display: flex;
    width: 100%;
    height: 6.4rem;
    border: 0;
    cursor: pointer;
    background : #f5f8fa;
    border-radius: 2rem;
    color: #000;
    display: flex;
    align-items:center;
    justify-content: center;
    width-max: 350px;
   

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