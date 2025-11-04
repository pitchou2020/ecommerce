import React from 'react'
import * as C from "./styles"
import './Button.css'

const Button = ({Text, onClick, Type = "submit"}) => {
  return (
   <button className='btn' type={Type} onClick={onClick}>
{Text}
   </button>
  );
};

export default Button;
