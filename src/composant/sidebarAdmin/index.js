import React,{useContext,useEffect} from 'react'
import {ThemeContext} from "./../../Context/ThemeContext"

function Index() {
	const{resize} = useContext(ThemeContext);
	const logOut = () => { 
		localStorage.setItem('isLoggedIn',false);
		 };
		 useEffect(() => {
			resize()
		  }, [resize]);
  return (
    <>
      <section id="sidebar">
		<a href="profile" class="brand">
			<i class='bx bxs-smile'></i>
			<span class="text">Admin</span>
		</a>
		<ul class="side-menu top">
			<li class="active">
				<a href="/admin/">
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="profile">
					<i class='bx bxs-shopping-bag-alt' ></i>
					<span class="text">Posts</span>
				</a>
			</li>
			<li>
				<a href="/listarRecettes/">
					<i class='bx bxs-doughnut-chart' ></i>
					<span class="text">Recettes</span>
				</a>
			</li>
			<li>
				<a href="profile">
					<i class='bx bxs-message-dots' ></i>
					<span class="text">Messages</span>
				</a>
			</li>
			<li>
				<a href="/usuarios/">
					<i class='bx bxs-group' ></i>
					<span class="text">User</span>
				</a>
			</li>
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
