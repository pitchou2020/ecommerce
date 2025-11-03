import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFounds.css'

export default function NotFound() {

    const navigate = useNavigate()
   const goHome = () => {navigate ("/")}
  return (
    <div className='founds'>
      <h1>Wops, Está pagina não existe</h1>
      <button className='no-founds' onClick={goHome}>Voltar ao site</button>
    </div>
  )
}
