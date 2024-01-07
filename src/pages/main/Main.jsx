import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Main.scss'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Product from '../Magasin/Product/Product'
import Fournisseur from '../Magasin/Fournisseur/Fournisseur'
import Client from '../Magasin/Client/Client'
import Center from '../Magasin/Center/Center'
import Employee from '../Magasin/Employee/Employee'
import Achat from '../Magasin/Achat/Achat'
import Vent from '../Magasin/Vent/VentMagasin'
import Transfert from '../Magasin/Transfert/Transfert'


function Main() {

  return (
    <div className='app__main'>
      <NavBar/>
      <SideBar />
      <BrowserRouter>
        <Routes>
          
          <Route path='/magasin/products' element={<Product />} />
          <Route path='/magasin/fournisseur' element={<Fournisseur />} />
          <Route path='/magasin/client' element={<Client />} />
          <Route path='/magasin/center' element={<Center />} />
          <Route path='/center/employee' element={<Employee />} />
          <Route path='/magasin/achat' element={<Achat />} />
          <Route path='/magasin/vent' element={<Vent />} />
          <Route path='/magasin/transfert' element={<Transfert />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main
