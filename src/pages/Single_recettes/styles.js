import styled from "styled-components";
import { device } from '../../device';


export const ContainerRecette = styled.div`
background-color: white;
margin: 70px 8px 40px 8px;
padding: 0px 8px 20px 8px;
box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.1);
overflow: visible;
text-align:center;
display: flex;
flex-direction:column;

 @media(min-width:768px) { 
        margin-top:100px;
        margin:auto;
        padding: 0px 30px 30px 30px;
        min-width: 350px;
     }
`;

export const Categorie = styled.div`
text-align:center;
margin-bottom: 0px;
margin-top: 0px;
overflow: visible;

p.categorie{
    background-color: black;
    color: white;
    display: inline-block;
    margin-top: -20px;
    padding: 10px 20px;
    margin-bottom: 0px;
    font-weight: bold;
    font-size: 16px;  
    
}
@media(min-width:768px) { 
    text-align:center;
}
`;
export const Colonne = styled.div`
display :flex;


flex-direction:column;
@media(min-width:768px) { 
    flex-direction:row;
    gap:20px;
}
`;
export const ContainerRecetteSingle = styled.div`
    display: flex;
    padding: 20px;
    flex-direction:column;    
    @media(max-width:600px){
        display: flex;
        flex-direction:column;
       
        width: 100%;
        margin-left:0px;
        padding: 5px;
        flex-shrink:0;
    }    
`;

export const ColumnRecettes=styled.div`
display:flex;

flex-direction:row;
width:100%;

@media(max-width:600px){
    display:flex;
    flex-direction:column;
}

`;
export const ImagemRecette = styled.img`
display: block;
margin-left:0
max-height: 400px;
object-fit: cover;
min-height: 200px;
width:100%;
background-color: lightgray;
@media(max-width:600px){
width: 100%; 
height: auto;  }

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
export const ConteudoProd = styled.div`
width: 100%;
margin-top: 20px; 
& .ingredients p {
    text-align: center;
    font-size: 12px;
    border: 1px solid lightgray;
    padding: 8px 0px;
    margin-top: 4px;
    margin-bottom: 0;
    margin-top: 10px;
    font: 400 1.2rem/1.5 'nunito', sans-serif;
}

& table.preparation p.numero {
    background-color: #6C829D;
    color: white;
    width: 15px;
    height: 15px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    padding-top: 4px;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0px;
}
table.preparation td {
    vertical-align: top;
}

table.preparation td.preparation_etape {
    font-size: 14px;
    padding-left: 10px;
    padding-bottom: 10px;
    margin-top: 2.4rem;
    text-align: left;
    font: 400 1.2rem/1.5 'nunito', sans-serif;
}

table.preparation tr {
    height: 40px;
}


@media(min-width:768px) { 
    width:45%;
}
`;
export const Sinopse = styled.p`
font-size: 16px;
    padding:10px;
    text-align:left;
    margin-top: 2.4rem;
    font: 400 1.6rem/1.5 'nunito', sans-serif;
    width:100%;
    @media(min-width:768px) { 
   
    }
    `;   

export const TituloRecette = styled.h1`
    text-align: center;
    margin-bottom: 12px;
    margin-top: 10px;
    color: #000;
    font: 700 1.8rem/1.5 'nunito', sans-serif;
    height: 25px;
`;
export const SugesRecette = styled.div`
display:flex;
flex-direction:column;
margin-top:70px;
& h2{
    font-size:14px;
}

& a{
    text-decoration:none;
    color :#555;
}
@media(max-width:600px){
    display:flex;
    margin-top:10px;
    flex-direction:column;

& img{
    width: 100%;
}
}
`;
export const SubRecette = styled.h3`
text-align: center;
    text-transform: uppercase;
    font-size: 15px;
    border-bottom: 5px solid #6C829D;
    padding-bottom: 5px;
font: 400 1.6rem/1.5 'nunito', sans-serif;
font-size: 22px;
`;
