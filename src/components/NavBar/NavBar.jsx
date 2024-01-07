import React from 'react'
import './NavBar.scss'

function NavBar() {

  return (
    <div className='app__navBar'>
      <h1>Dash Board</h1>
      <a href='http://localhost:5173' onClick={()=>{localStorage.removeItem('token')}}>LOGOUT</a>
    </div>
  )
}

export default NavBar
