import React from 'react'
import * as C from "./styles"

const Input = ({type,placeholder,value, onChange, name}) => {
  return (
    <C.Input
    value={value}
    name={name}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    />
  )
}

export default Input;
