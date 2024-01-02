import React, { useState } from 'react'
import '../ProductUpdate/ProductUpdate.scss'
import axios from 'axios'
import {toast , Toaster} from 'react-hot-toast'


function FournisseurUpdate({bool , setBool , codeF}) {

    const [values , setValues] = useState({
        codeF : '',
        nomF : '',
        prenomF : '',
        adrF : '',
        telF : '',
        solde : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/fournisseur/${codeF}`,{nomF : values.nomF,prenomF : values.prenomF,adrF : values.adrF,telF : values.telF , solde : Number.parseInt(values.solde)})
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
        <input type="text" placeholder='nom' name='nomF' value={values.nomF} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='prenom' name='prenomF' value={values.prenomF} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='adresse' name='adrF' value={values.adrF} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='telephone' name='telF' value={values.telF} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='solde' name='solde' value={values.solde} onChange={(e)=>{changeHandler(e)}} />
        <button>Done</button>
        <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </form>
  )
}

export default FournisseurUpdate
