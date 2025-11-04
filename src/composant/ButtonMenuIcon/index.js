import React from 'react'
import './ButtonMenuIcon.css'
const ButtonMenuIcon = (props) => {
  return (
    <div>
       <button className='mobile-menu-icon' onClick={props.func}>
       {props.modal ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
       </button>
    </div>
  )
}

export default ButtonMenuIcon
