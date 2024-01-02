import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import ClientUpdate from '../../components/ClientUpdate/ClientUpdate'
import {toast , Toaster} from 'react-hot-toast'


function Client() {
    const [product, setProduct] = useState('')
    const [values, setValues] = useState({
        codeCl: '',
        nomCl: '',
        prenomCl: '',
        adrCl: '',
        telCl: '',
        credit: ''
    })
    const [data, setData] = useState([])
    const [bool, setBool] = useState(true)
    const [id, setId] = useState('')

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/client')
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchingData()
    }, [data])


    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const changeHandler = (e) => {
        setProduct(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/client', { codeCl: values.codeCl, nomCl: values.nomCl, prenomCl: values.prenomCl, adrCl: values.adrCl, telCl: values.telCl, credit: Number.parseInt(values.credit) })
            .then((res) => {
                console.log(res)
                setValues({
                    codeCl: '',
                    nomCl: '',
                    prenomCl: '',
                    adrCl: '',
                    telCl: '',
                    credit: ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    const deleteHandler = async (codeCl) => {
        await axios.delete(`http://localhost:8080/api/v1/client/${codeCl}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const updateHandler = async (codeCl) => {
        setId(codeCl)
        setBool(false)
    }



    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input type="text" name='product' placeholder='Search' value={product} onChange={(e) => { changeHandler(e) }} />
                <button>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Client</h1>
                <input type="text" placeholder='CodeCl(must be unique)' name='codeCl' value={values.codeCl} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='nom' name='nomCl' value={values.nomCl} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='prenom' name='prenomCl' value={values.prenomCl} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='adresse' name='adrCl' value={values.adrCl} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='telephone' name='telCl' value={values.telCl} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='credit' name='credit' value={values.credit} onChange={(e) => { createHandler(e) }} />
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {
                    data.map((elem) => {
                        return (
                            <div className='oneProduct'>
                                <div>
                                    <h3>CodeCl : {elem.codeCl}</h3>
                                    <h3>nomCl : {elem.nomCl}</h3>
                                    <h3>prenomCl : {elem.prenomCl}</h3>
                                    <h3>adrCl : {elem.adrCl}</h3>
                                    <h3>telCl : {elem.telCl}</h3>
                                    <h3>credit : {elem.credit}</h3>
                                </div>
                                <div className="btns">
                                    <button onClick={() => { updateHandler(elem.codeCl) }}>Update</button>
                                    <button className='delete' onClick={() => { deleteHandler(elem.codeCl) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <ClientUpdate bool={bool} codeCl={id} setBool={setBool} />
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

export default Client
