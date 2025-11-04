import React from 'react'
import { useRef,useEffect,useContext } from 'react';
import { MenuData } from './MenuData';
import logo from './../../assets/images/logo_rouge.png' ;
import {ThemeContext} from "./../../Context/ThemeContext"

function Index() {
	const{resize} = useContext(ThemeContext);
	
	const logOut = () => { 
		localStorage.setItem('isLoggedIn',false);
		 };

	const removeSelectMenu = () => {
		//ativar o item do menu selecionado
		const buttons = document.querySelectorAll(".nav-links")

		let url = window.location.href;

		buttons.forEach((button) => {
			button.classList.remove("active")

			if (button.href === url) {
				button.classList.add("active")
			}
			else if (button.href != url) {
				button.classList.remove("active")

			}
		})
	}
	useEffect(() => {
		resize()
		removeSelectMenu()
	}, [resize]);

	
  return (
    <>
	
      <section id="sidebar">
		<a href="profile" class="brand">
			<i><img src={logo}  alt="iCuisine" /></i>
			<span className="text">Icuisine</span>
		</a>
		<ul class="side-menu top">
		<li  >
				<a href="/">
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Início</span>
				</a>
			</li>
		{MenuData.map((item,index)=>{
               
			   return(
				<li key ={index}>
				   	<a  href={item.url} className = {item.cName}  >
				   		<i class= {item.icone}></i>
					 <span class="text">{item.title}</span>
					 </a>
						</li>
					 
			   );
			 })}

		</ul>
		<ul class="side-menu">
			<li>
				<a href="profile">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li>
			<li>
				<button onClick={logOut}>
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</button>
			</li>
		</ul>
	</section>
    </>
  )
}
export default Index;
