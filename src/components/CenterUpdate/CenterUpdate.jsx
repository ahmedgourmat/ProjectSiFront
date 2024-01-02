import React, { useState } from 'react'
import '../ProductUpdate/ProductUpdate.scss'
import axios from 'axios'
import {toast , Toaster} from 'react-hot-toast'


function CenterUpdate({bool , setBool , codeCt}) {
    const [values , setValues] = useState({
        designCt : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/center/${codeCt}`,{designCt : values.designCt})
        .then((res)=>{
            console.log()
            setBool(true)
            setValues({
                designCt : ''
            })
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }


  return (
    <form onSubmit={(e)=>{submitHandler(e)}} className={`app__productUpdate ${bool && 'visibility'}`}>
      <input type="text" name='designCt' placeholder='designCt' value={values.designCt} onChange={(e)=>{changeHandler(e)}}/>
      <button>Done</button>
      <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </form>
  )
}

export default CenterUpdate
