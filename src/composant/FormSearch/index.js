import React from 'react'
import * as C from './styles';
import './FormSearch.css'

const FormSearch = (props) => {
  
  return (
    <>
    <form className='FormPesquisa'>

            <input className="InputPesquisa"
              type="search"
              name="pesquisa"
              placeholder="pesquisar no congolinaria"
              value={props.search}
              onChange={e=>props.funcSearch(e.target.value)} />
            <button className='PesquisaButton' ><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
          </>
  )
}

export default FormSearch

