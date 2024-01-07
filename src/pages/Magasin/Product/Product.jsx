import React, { useEffect, useState } from 'react'
import './Product.scss'
import axios from 'axios'
import ProductUpdate from '../../../components/ProductUpdate/ProductUpdate'
import {toast , Toaster} from 'react-hot-toast'

function Product() {

    const [token , setToken] = useState('')

    const [product , setProduct] = useState('')
    const [values , setValues] = useState({
        codeP : '',
        designP : '',
        price : '' ,
        qteStock : ''
    })
    const [data , setData] = useState([])
    const [bool , setBool] = useState(true)
    const [id , setId] = useState('')

    const fetchingData = async()=>{
        try {
            const response =await axios.get('http://localhost:8080/api/v1/products' , {
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
    },[data , token])


    const createHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }


    const changeHandler = (e)=>{
        setProduct(e.target.value)
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/products',{codeP : values.codeP , designP : values.designP , price : Number.parseInt(values.price)} , {
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
        .then((res)=>{
            console.log(res)
            setValues({
                codeP : '',
                designP : '',
                price : ''
            })
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }

    const deleteHandler = async(codeP)=>{
        await axios.delete(`http://localhost:8080/api/v1/products/${codeP}` , {
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


    const updateHandler = async(codeP)=>{
        setId(codeP)
        setBool(false)
    }



  return (
    <div className='app__product'>
        <div className='app__product-search'>
            <input type="text" name='product' placeholder='Search' value={product} onChange={(e)=>{changeHandler(e)}} />
            <button>Search</button>
        </div>
            <form className='app__product-add' onSubmit={(e)=>{submitHandler(e)}}>
                <h1>Add A Product</h1>
                <input type="text" placeholder='CodeP(must be unique)' name='codeP' value={values.codeP} onChange={(e)=>{createHandler(e)}} />
                <input type="text" placeholder='designP' name='designP' value={values.designP} onChange={(e)=>{createHandler(e)}} />
                <input type="text" placeholder='price' name='price' value={values.price} onChange={(e)=>{createHandler(e)}} />
                <button>ADD</button>
            </form>
        <div className="app__product-products">
            {
                data.map((elem)=>{
                    return(
                        <div className='oneProduct' id={elem.codeP}>
                            <div>
                                <h3>CodeP : {elem.codeP}</h3>
                                <h3>designP : {elem.designP}</h3>
                                <h3>qteStock : {elem.qteStock}</h3>
                                <h3>price : {elem.price} DA</h3>
                            </div>
                            <div className="btns">
                                <button onClick={()=>{updateHandler(elem.codeP)}}>Update</button>
                                <button className='delete' onClick={()=>{deleteHandler(elem.codeP)}}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            <ProductUpdate bool={bool} codeP={id} setBool={setBool}/>
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

export default Product