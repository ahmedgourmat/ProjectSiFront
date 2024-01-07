import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import CenterUpdate from '../../../components/CenterUpdate/CenterUpdate'
import {toast , Toaster} from 'react-hot-toast'


function Center() {
    const [token , setToken] = useState('')

    const [product, setProduct] = useState('')
    const [values, setValues] = useState({
        codeCt: '',
        designCt: ''
    })
    const [data, setData] = useState([])
    const [bool, setBool] = useState(true)
    const [id, setId] = useState('')

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/center' , {
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        fetchingData()
    }, [data,token])


    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const changeHandler = (e) => {
        setProduct(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/center', { codeCt: values.codeCt, designCt: values.designCt } , {
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
            .then((res) => {
                console.log(res)
                setValues({
                    codeCt: '',
                    designCt: ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    const deleteHandler = async (codeCt) => {
        await axios.delete(`http://localhost:8080/api/v1/center/${codeCt}` , {
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const updateHandler = async (codeCt) => {
        setId(codeCt)
        setBool(false)
    }



    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input type="text" name='product' placeholder='Search' value={product} onChange={(e) => { changeHandler(e) }} />
                <button>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Center</h1>
                <input type="text" placeholder='CodeCt(must be unique)' name='codeCt' value={values.codeCt} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='designCt' name='designCt' value={values.designCt} onChange={(e) => { createHandler(e) }} />
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {
                    data.map((elem) => {
                        return (
                            <div className='oneProduct' id={elem.codeCt}>
                                <div>
                                    <h3>CodeCt : {elem.codeCt}</h3>
                                    <h3>designCt : {elem.designCt}</h3>
                                </div>
                                <div className="btns">
                                    <button onClick={() => { updateHandler(elem.codeCt) }}>Update</button>
                                    <button className='delete' onClick={() => { deleteHandler(elem.codeCt) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <CenterUpdate bool={bool} codeCt={id} setBool={setBool} />
            </div>
            {
                !bool && <div className='shadow' onClick={() => { setBool(!bool) }}></div>
            }
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </div>
    )
}

export default Center
