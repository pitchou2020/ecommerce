import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
   
    height:50px;
    background: #f5f8fa;
    border: 1px solid #ed2f59;
    border-radius: 5px;
    color: #5c8599;
    font-size:16px;
    text-align: center;
    :valid{
        border: 1px solid #ed2f59;
    }
    @media(max-width:600px){
        width:300px;
        }

`