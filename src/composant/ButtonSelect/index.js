import React from 'react'
import * as C from "./styles"
const ButtonSelect = ({Text, onClick, Type = "button"}) => {
    return (
     <C.ButtonSelect type={Type} onClick={onClick}>
  {Text}
     </C.ButtonSelect>
    );
  };

export default ButtonSelect
