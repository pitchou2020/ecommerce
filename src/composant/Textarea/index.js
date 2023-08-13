import React from 'react'
import * as C from "./styles"

const Textarea = ({type,placeholder,value, onChange}) => {
  return (
    <C.Textarea
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    />
  );
};

export default Textarea;
