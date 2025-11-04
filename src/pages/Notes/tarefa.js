import React from 'react'
import NotesList from '../../composant/NotesList'
import Sidebar from '../../composant/Sidebar';
import SideNotes from '../../composant/SideNotes'


function tarefa() {
  return (
    <>
     <Sidebar />
        <SideNotes />
    
    <NotesList/>
    </>
  )
}

export default tarefa