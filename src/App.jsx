import { useEffect , useState } from 'react'
import './App.css'
import Login from './pages/Auth/Login'
import Main from './pages/main/Main'
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom'

function App() {

  const [token , setToken] = useState('')

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[token])

  return (
    <div className={!token && `app`}>
      <BrowserRouter>
        <Routes>
          {!token && <Route path='/' element={<Login/>} /> } 
        </Routes>
      </BrowserRouter>
      {token && <Main/>}
    </div>
  )
}

export default App
