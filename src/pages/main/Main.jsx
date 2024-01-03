import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './Main.scss'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Product from '../Product/Product'
import Fournisseur from '../Fournisseur/Fournisseur'
import Client from '../Client/Client'
import Center from '../Center/Center'
import Employee from '../Employee/Employee'
import Achat from '../Achat/Achat'
import Vent from '../Vent/Vent'


function Main() {
  return (
    <div className='app__main'>
        <NavBar/>
        <SideBar/>
        <BrowserRouter>
            <Routes>
                <Route path='/products' element={<Product/>} />
                <Route path='/fournisseur' element={<Fournisseur/>} />
                <Route path='/client' element={<Client/>} />
                <Route path='/center' element={<Center/>} />
                <Route path='/employee' element={<Employee/>} />
                <Route path='/achat' element={<Achat/>} />
                <Route path='/vent' element={<Vent/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Main
