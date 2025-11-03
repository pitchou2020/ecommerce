import React from 'react'
import "./ButtonSeachIcon.css"

const ButtonSeachIcon = (props) => {
  return (
    <div>
      <button className="mobile-seach-icon" onClick={props.func}>
         <i class="fa-solid fa-magnifying-glass"> </i>
          </button>
    </div>
  )
}

export default ButtonSeachIcon
