import React, { useState } from 'react'
import '../ProductUpdate/ProductUpdate.scss'
import axios from 'axios'
import {toast , Toaster} from 'react-hot-toast'



function AchatUpdate({bool , setBool , data}) {
    const {dateA , codeF, codeP }= data
    const [values , setValues] = useState({
        qteA : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/achat/${dateA}/${codeF}/${codeP}`,{qteA: Number.parseInt(values.qteA) })
        .then((res)=>{
            console.log()
            setBool(true)
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }


  return (
    <form onSubmit={(e)=>{submitHandler(e)}} className={`app__productUpdate ${bool && 'visibility'}`}>
        <input type="text" placeholder='quantite' name='qteA' value={values.qteA} onChange={(e)=>{changeHandler(e)}} />
      <button>Done</button>
      <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </form>
  )
}

export default AchatUpdate
