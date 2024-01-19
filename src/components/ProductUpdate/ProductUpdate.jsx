import React, { useState } from 'react'
import './ProductUpdate.scss'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

function ProductUpdate({ bool, setBool, codeP }) {

    const [token , setToken] = useState('')

    const [values, setValues] = useState({
        designP: '',
        qteStock: '', 
        price : ''
    })

    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/products/${codeP}`, { designP: values.designP, qteStock: Number.parseInt(values.qteStock) , price: Number.parseInt(values.price) },{
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(res)
                setBool(true)
                setValues({
                    designP: '',
                    qteStock: '', 
                    price : ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[])


    return (
        <form onSubmit={(e) => { submitHandler(e) }} className={`app__productUpdate ${bool && 'visibility'}`}>
            <input type="text" name='designP' placeholder='designP' value={values.designP} onChange={(e) => { changeHandler(e) }} />
            <input type="text" name='qteStock' placeholder='qteStock' value={values.qteStock} onChange={(e) => { changeHandler(e) }} />
            <input type="text" name='price' placeholder='price' value={values.price} onChange={(e) => { changeHandler(e) }} />
            <button>Done</button>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </form>
    )
}

export default ProductUpdate
