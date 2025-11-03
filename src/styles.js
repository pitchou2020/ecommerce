import styled from "styled-components";

export const BtnFacebook = styled.button`
position:absolute;

    width: 165px;
    height:35px;  
    border-radius: 4px;
    background: #3b5998;
    color:white;
    border:0px transparent;  
    text-align: center;
    margin:5px;
    display: inline-block;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
  
`;

export const contentNav = styled.div`

position:fixed;
display: flex;
flex-direction: row;
justify-content:space-around;
top:0px;
width: 100%;
height:60px;  
background:#f1f1f1;
box-shadow: 0 10px 10px -10px #000;


img{
    border-radius: 50%;
    padding:2px;
}
input {
    width: 500px;
   
   margin-top:5px;
   
}
.pesquisar i{
    display:none;
    
}


    @media(max-width:600px){
        width:100%;
       
        display: flex;
        flex-direction: row;
        justify-content:space-evenly;
        align-itens:center;
       z-index:99;
       

        .pesquisar{
            border-radius: 2rem;
            display:flex;
            align-content:center;
            
            
        }
        .pesquisar i{
            display:flex;
            font-size: 16px;
            
        }
        img{
            border-radius: 50%;
            padding:2px;
        }
        .pesquisar button{
            display:flex;
            
            align-items: center;
            justify-content: center;
            width:55px;
            height:45px;
            
           
            border-radius:2rem;
            margin-top:5px;
            background-color:#ed2f59;
            
            z-index:1;}
            
            .pesquisar i{
                font-size: 25px;
                color : white;
            }
        
    }

`;
export const mobileMenuIcon = styled.button`
display:none;

@media(max-width:600){
    display: block;
    position: absolute;
    font-size: 16px;
    color: white;
    background-color: #ed2f59;
    outline: none;
    top: 12px;
    left: 25px;
   
    
    padding: 10px;
}

`;
export const mobileSearchIcon = styled.button`
display:none;

@media(max-width:600px){
    display:flex;
            
            align-items: center;
            justify-content: center;
            width:55px;
            height:45px;

           
            border-radius:2rem;
            margin-top:5px;
            background-color:#ed2f59;
            
            z-index:1;}
            
           & i{
                font-size: 25px;
                color : white;
            }
}


`;

export const fbbutton = styled.button`
position: absolute;
right:10px;
z-index:2;
img{
    
    top:10px;
    float:right;
    border-radius:50%;
    
};
`;