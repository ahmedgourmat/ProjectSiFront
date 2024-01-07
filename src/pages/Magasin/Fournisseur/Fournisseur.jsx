import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import FournisseurUpdate from '../../../components/FournisseurUpdate/FournisseurUpdate'
import {toast , Toaster} from 'react-hot-toast'


function Fournisseur() {
    const [token , setToken] = useState('')

    const [product , setProduct] = useState('')
    const [values , setValues] = useState({
        codeF : '',
        nomF : '',
        prenomF : '',
        adrF : '',
        telF : ''
    })
    const [data , setData] = useState([])
    const [bool , setBool] = useState(true)
    const [id , setId] = useState('')

    const fetchingData = async()=>{
        try {
            const response =await axios.get('http://localhost:8080/api/v1/fournisseur',{
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if(response.status >= 200 && response.status < 300){
              setData(response.data.reverse())
            }
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
        fetchingData()
    },[data,token])


    const createHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }


    const changeHandler = (e)=>{
        setProduct(e.target.value)
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/fournisseur',{codeF : values.codeF , nomF : values.nomF,prenomF : values.prenomF,adrF : values.adrF,telF : values.telF},{
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
        .then((res)=>{
            console.log(res)
            setValues({
                codeF : '',
                nomF : '',
                prenomF : '',
                adrF : '',
                telF : ''
            })
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }

    const deleteHandler = async(codeF)=>{
        await axios.delete(`http://localhost:8080/api/v1/fournisseur/${codeF}`,{
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const updateHandler = async(codeF)=>{
        setId(codeF)
        setBool(false)
    }



  return (
    <div className='app__product'>
        <div className='app__product-search'>
            <input type="text" name='product' placeholder='Search' value={product} onChange={(e)=>{changeHandler(e)}} />
            <button>Search</button>
        </div>
            <form className='app__product-add' onSubmit={(e)=>{submitHandler(e)}}>
                <h1>Add A Fournisseur</h1>
                <input type="text" placeholder='CodeF(must be unique)' name='codeF' value={values.codeF} onChange={(e)=>{createHandler(e)}} />
                <input type="text" placeholder='nom' name='nomF' value={values.nomF} onChange={(e)=>{createHandler(e)}} />
                <input type="text" placeholder='prenom' name='prenomF' value={values.prenomF} onChange={(e)=>{createHandler(e)}} />
                <input type="text" placeholder='adresse' name='adrF' value={values.adrF} onChange={(e)=>{createHandler(e)}} />
                <input type="text" placeholder='telephone' name='telF' value={values.telF} onChange={(e)=>{createHandler(e)}} />
                <button>ADD</button>
            </form>
        <div className="app__product-products">
            {
                data.map((elem)=>{
                    return(
                        <div className='oneProduct'>
                            <div>
                                <h3>CodeF : {elem.codeF}</h3>
                                <h3>nomF : {elem.nomF}</h3>
                                <h3>prenomF : {elem.prenomF}</h3>
                                <h3>adrF : {elem.adrF}</h3>
                                <h3>telF : {elem.telF}</h3>
                                <h3>solde : {elem.solde}</h3>
                            </div>
                            <div className="btns">
                                <button onClick={()=>{updateHandler(elem.codeF)}}>Update</button>
                                <button className='delete' onClick={()=>{deleteHandler(elem.codeF)}}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            <FournisseurUpdate bool={bool} codeF={id} setBool={setBool}/>
        </div>
        {
            !bool && <div className='shadow' onClick={()=>{setBool(!bool)}}></div>
        }
        <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </div>
  )
}

export default Fournisseur
