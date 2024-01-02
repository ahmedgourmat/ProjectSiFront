import React, { useState } from 'react'
import '../ProductUpdate/ProductUpdate.scss'
import axios from 'axios'
import {toast , Toaster} from 'react-hot-toast'


function ClientUpdate({bool , setBool , codeCl}) {
    const [values , setValues] = useState({
        codeCl : '',
        nomCl : '',
        prenomCl : '',
        adrCl : '',
        telCl : '',
        credit : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/client/${codeCl}`,{nomCl : values.nomCl,prenomCl : values.prenomCl,adrCl : values.adrCl,telCl : values.telCl , credit : Number.parseInt(values.credit)})
        .then((res)=>{
            console.log()
            setBool(true)
            setValues({
                designP : '',
                qteStock : ''
            })
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }


  return (
    <form onSubmit={(e)=>{submitHandler(e)}} className={`app__productUpdate ${bool && 'visibility'}`}>
        <input type="text" placeholder='nom' name='nomCl' value={values.nomCl} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='prenom' name='prenomCl' value={values.prenomCl} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='adresse' name='adrCl' value={values.adrCl} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='telephone' name='telCl' value={values.telCl} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='credit' name='credit' value={values.credit} onChange={(e)=>{changeHandler(e)}} />
      <button>Done</button>
      <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </form>
  )
}

export default ClientUpdate
