import React from 'react'
import './ButtonError.css'

const ButtonError = ({Text, onClick, Type = "button"}) => {
  return (
   < button className='ButtonError' type={Type} onClick={onClick}>
{Text}
   </button>
  );
};

export default ButtonError;
