import React, { useState } from 'react'
import './ProductUpdate.scss'
import axios from 'axios'

function ProductUpdate({bool , setBool , codeP}) {

    const [values , setValues] = useState({
        designP : '',
        qteStock : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/products/${codeP}`,{designP : values.designP , qteStock : values.qteStock})
        .then((res)=>{
            console.log()
            setBool(true)
            setValues({
                designP : '',
                qteStock : ''
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }


  return (
    <form onSubmit={(e)=>{submitHandler(e)}} className={`app__productUpdate ${bool && 'visibility'}`}>
      <input type="text" name='designP' placeholder='designP' value={values.designP} onChange={(e)=>{changeHandler(e)}}/>
      <input type="text" name='qteStock' placeholder='qteStock' value={values.qteStock} onChange={(e)=>{changeHandler(e)}}/>
      <button>Done</button>
    </form>
  )
}

export default ProductUpdate
