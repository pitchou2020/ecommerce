import React from 'react';
import './sidebar.css'
import { MenuData } from './MenuData';
import favicon from './../../assets/images/logo_rouge.png'
import { useNavigate } from 'react-router-dom'



function Sidebar(){
    const navigate = useNavigate()
    const goHome = () => {navigate ("/")}
     
    return(
   
           
      <div className=" sidebar ">
       
          <div className='menu-sidebar'>
       
             <ul>
              {MenuData.map((item,index)=>{
               
                return(
                  <div className= "menu" key ={index}>
                    <li>
                    <a  href={item.url} className = {item.cName}>
                    <i className={item.icone}></i>
                      <span>{item.title}</span></a>
                      </li>
                      </div>
                      
                );
              })}
              
              </ul>
         

          </div>
          
          
          

      
    

            <footer>
                
                <button onClick={goHome}>
                    Voltar
                </button>
            </footer>
        </div>
        

    
      
    )
}
export default Sidebar;

