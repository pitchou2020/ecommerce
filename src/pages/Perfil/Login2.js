import React from 'react'
import { useEffect, useState } from 'react';

import FacebookLogin from 'react-facebook-login';

import './login.css'
import jwt_decode from "jwt-decode";

export default function Login() {

  const [user, setUser] = useState({});
  function handleCallbackResponse(response){
    console.log("encoded JWT ID token:"+ response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject)
    window.document.getElementById("buttonDiv").hidden = true;
  }
  function handleSignOut(){
    setUser({});
    window.document.getElementById("buttonDiv").hidden = false;
  }

  useEffect(()=>{
    window.google.accounts.id.initialize({
      client_id: "83394884129-avvcloivvprg1e2r632es5evb6ecemtq.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  },[]);

  // if we have no user : sign in button
  // if we have a user show the log button

  /*  const responseFacebook = (response) => {
        console.log(response);
      }*/
      
  return (
    <div>
    <div className='login'>
     
      <FacebookLogin
   
    appId = "546291564053757"
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />
  </div>
  <div id="buttonDiv"></div> 
  <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
      {user &&
      <div>
        <img src={user.picture} alt="sem foto" />
        <h3>{user.name}</h3>

      </div> }
     
    </div>
  )
}
