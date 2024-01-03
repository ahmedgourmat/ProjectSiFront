import React from 'react'
import './SideBar.scss'

function SideBar() {
  return (
    <div className='app__sideBar'>
        <a href="http://localhost:5173/products">Product</a>
        <a href="http://localhost:5173/fournisseur">Fournisseur</a>
        <a href="http://localhost:5173/client">Client</a>
        <a href="http://localhost:5173/center">Center</a>
        <a href="http://localhost:5173/employee">Employee</a>
        <a href="http://localhost:5173/achat">Achat</a>
        <a href="http://localhost:5173/vent">Vent</a>
    </div>
  )
}

export default SideBar
