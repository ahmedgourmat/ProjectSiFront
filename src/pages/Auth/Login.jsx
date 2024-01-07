import axios from 'axios'
import React,  {useState} from 'react'
import './Auth.scss'
import { useNavigate } from 'react-router-dom'
import {toast , Toaster} from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()

    const [info , setInfo] = useState({
        email : 'admin@gmail.com' ,
        password : ''
    })

    const changeHandler = (e)=>{
        setInfo({...info , [e.target.name] : e.target.value})
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/login' , {email : info.email , password : info.password})
        .then((res)=>{
            localStorage.setItem('token' , res.data.token)
            setInfo({
                email : 'admin@gmail.com' ,
                password : ''
            })
            console.log('hahahaha')
            toast.success('Done')
            navigate('/magasin/products')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })

    }


    return (
        <form className="form" onSubmit={(e)=>{submitHandler(e)}}>
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
                <input type="email" placeholder="Enter email" value={info.email} readOnly/>
                <span>
                </span>
            </div>
            <div className="input-container">
                <input type="password" name='password' placeholder="Enter password" value={info.password} onChange={(e) => { changeHandler(e) }}/>
            </div>
            <button type="submit" className="submit">
                Sign in
            </button>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </form>
    )
}

export default Login
