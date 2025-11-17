import React from 'react';
import './sidebarProfile.css'
import { MenuData } from './MenuData';
import favicon from './../../assets/images/logo_rouge.png'
import { useNavigate } from 'react-router-dom'
import People from './../../pages/Admin/img/people.png'



function SidebarProfile({toggleModal,showModal}){
    const navigate = useNavigate()
    const goHome = () => {navigate ("/")}
     
    return(
   
           
      <div className="animate-right sidebar-profile ">
       
          <div className='menu-sidebar-profile'>
       <div className='profile'>
        <img src={People} alt="people" />
        <span>Pitchou luhata luambo</span>
        </div>
          
              {MenuData.map((item,index)=>{
               
                return(
                  <div class= "menu-profile"key ={index}>
                    <a  href={item.url} className = {item.cName}>
                    
                    <i className={item.icone}></i>
                    <span>{item.title}</span>
                      </a>
                      </div>
                      
                );
              })}
              
           
         

          </div>
          
          
          


        </div>
        

    
      
    )
}
export default SidebarProfile;

