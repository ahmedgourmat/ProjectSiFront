import React from 'react'
import './SideBar.scss'

function SideBar() {
  return (
    <div className='app__sideBar'>
        <a href="http://localhost:5173/magasin/products">Product</a>
        <a href="http://localhost:5173/magasin/fournisseur">Fournisseur</a>
        <a href="http://localhost:5173/magasin/client">Client</a>
        <a href="http://localhost:5173/magasin/center">Center</a>
        <a href="http://localhost:5173/magasin/achat">Achat</a>
        <a href="http://localhost:5173/magasin/vent">Vent</a>
        <a href="http://localhost:5173/magasin/transfert">Transfert</a>
        <a href="http://localhost:5173/magasin/graphs">Graphs</a>
    </div>
  )
}

export default SideBar
