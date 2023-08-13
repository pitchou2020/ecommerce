import styled from 'styled-components';

export const Titulo = styled.h1`
    color: #3e3e3e;
    font-size:23px;
`;
export const ButtonPrimary = styled.button`
    background-color:#fff;
    color: #3e3e3e;
    padding: 5px 8px;
    border-radius:4px;
    cursor: pointer;
    font-size:14px;
    :hover{
        background-color:#0d6efd;
        color:#fff;
    }
`;
export const Table = styled.table`
    width: 100%;
    margin-top:60px;
   

    th{
        background-color : #ffd219;
        color: #3e3e3e;
        padding : 10px;
    }
    td{
        background-color : #f6f6f6;
        color : #3e3e3e;
        padding: 8px;
        text-align: justify;
    }
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