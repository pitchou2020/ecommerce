import styled from "styled-components";

export const ContainerPesquisaMobile = styled.div`
display:none;

@media(max-width:600px){
    background-color: rgba(0, 0, 0, 1);
    width: 100vw;
    height: auto;
    position: absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:60px;    
}
`;

export const ContentPesquisaMobile = styled.div`
  display:none;

  @media(max-width:600px){
    
    width: 100vw;
    height: auto;
    flex-shrink: 0;
    display: flex;
    background: #ffffff;  
    border-radius: 5px;
    
    flex-direction: column;
    
  }

`;

export const NavPesquisaMobile = styled.div`
display:none;
@media(max-width:600px){
    display:flex;
    flex-direction: row;
    top: 10px;
};
`;

export const ContentResultMobile=styled.div`
    display:none;

@media(max-width:600px){    
    display:flex;
    width: 90%;
    margin-left: 10px;

    ul{
        width: 80%;
        list-style-type:none;
        
    }
     
    li{
        background-color:#f1f1f1;
    }
    
    a{
        text-decoration:none;
        color:#555;
    }
}
`;
