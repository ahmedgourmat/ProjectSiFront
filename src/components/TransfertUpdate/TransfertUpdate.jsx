import React, { useState } from 'react'
import '../ProductUpdate/ProductUpdate.scss'
import axios from 'axios'
import {toast , Toaster} from 'react-hot-toast'


function TransfertUpdate({bool , setBool , data}) {
    const {dateT , codeCt, codeP }= data
    const [values , setValues] = useState({
        qteV : '',
        payed : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/transfert/${dateT}/${codeCt}/${codeP}`,{qteV: Number.parseInt(values.qteV) , payed: Number.parseInt(values.payed) })
        .then((res)=>{
            console.log(res)
            setBool(true)
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }


  return (
    <form onSubmit={(e)=>{submitHandler(e)}} className={`app__productUpdate ${bool && 'visibility'}`}>
        <input type="text" placeholder='quantite' name='qteV' value={values.qteV} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='payed' name='payed' value={values.payed} onChange={(e)=>{changeHandler(e)}} />
      <button>Done</button>
      <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </form>
  )
}

export default TransfertUpdate
