import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import VentUpdate from '../../../components/VentUpdate/VentUpdate'

function Vent() {
    const [token , setToken] = useState('')

    const [product, setProduct] = useState('')
    const [saved, setSaved] = useState({
        dateV: '',
        codeCl: '',
        codeP: ''
    })
    const [values, setValues] = useState({
        dateV: '',
        codeCl: '',
        codeP: '',
        qteV: '',
        payed : ''
    })
    const [data, setData] = useState([])
    const [client, setClient] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const [bool, setBool] = useState(true)

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/vente',{
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse())
            }
            const responseClient = await axios.get('http://localhost:8080/api/v1/client',{
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if (responseClient.status >= 200 && responseClient.status < 300) {
                setClient(responseClient.data)
            }
            const responseProduct = await axios.get('http://localhost:8080/api/v1/products',{
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if (responseProduct.status >= 200 && responseProduct.status < 300) {
                setProductInfo(responseProduct.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        fetchingData()
    }, [token])


    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const changeHandler = (e) => {
        setProduct(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/vente', { dateV: values.dateV, codeCl: values.codeCl, codeP: values.codeP, qteV: Number.parseInt(values.qteV),payed: Number.parseInt(values.payed)  },{
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
            .then((res) => {
                console.log(res)
                setValues({
                    dateV: '',
                    codeCl: '',
                    codeP: '',
                    qteV: '',
                    payed : ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    const deleteHandler = async ({ dateV, codeCl, codeP }) => {
        await axios.delete(`http://localhost:8080/api/v1/vente/${dateV}/${codeCl}/${codeP}`,{
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
            .then((res) => {
                console.log(res)
                toast.success('Done')
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.error)
            })
    }


    const updateHandler = async ({ date, codeClient, codePro }) => {
        setSaved({
            dateV: date,
            codeCl: codeClient,
            codeP: codePro
        })
        setBool(false)
    }



    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input type="text" name='product' placeholder='Search' value={product} onChange={(e) => { changeHandler(e) }} />
                <button>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Vente </h1>
                <input type="date" placeholder='Date' name='dateV' value={values.dateV} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='quantite' name='qteV' value={values.qteV} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='payed' name='payed' value={values.payed} onChange={(e) => { createHandler(e) }} />
                <input
                    list="fournisseurOption"
                    placeholder="Select a client"
                    name="codeCl"
                    value={values.codeCl}
                    onChange={(e) => { createHandler(e) }}
                />
                <datalist id="fournisseurOption">
                    {client.map((elem) => (
                        <option key={elem.codeCl} value={elem.codeCl} />
                    ))}
                </datalist>
                <p>Want to create a client ? <a href="http://localhost:5173/client" target="_blank"> Create one</a></p>
                <input
                    list="productOption"
                    placeholder="Select a product"
                    name="codeP"
                    value={values.codeP}
                    onChange={(e) => { createHandler(e) }}
                />
                <datalist id="productOption">
                    {productInfo.map((elem) => (
                        <option key={elem.codeP} value={elem.codeP} />
                    ))}
                </datalist>
                <p>Want to create a product ? <a href="http://localhost:5173/products" target="_blank"> Create One</a></p>
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {
                    data.map((elem) => {
                        return (
                            <div className='oneProduct'>
                                <div>
                                    <h3>date : {elem.dateV.split('T')[0]}</h3>
                                    <h3>quantity : {elem.qteV}</h3>
                                    <h3>montant : {elem.montantV}</h3>
                                    <h3>rest : {elem.rest}</h3>
                                    <h3>codeCl : <a href={`http://localhost:5173/client/#${elem.codeCl}`}>{elem.codeCl}</a> </h3>
                                    <h3>codeP : <a href={`http://localhost:5173/products/#${elem.codeCl}`}>{elem.codeP}</a> </h3>
                                </div>
                                <div className="btns">
                                    <button onClick={() => { updateHandler({ date: elem.dateV, codeClient: elem.codeCl, codePro: elem.codeP }) }}>Update</button>
                                    <button className='delete' onClick={() => { deleteHandler({ dateV: elem.dateV, codeCl: elem.codeCl, codeP: elem.codeP }) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <VentUpdate bool={bool} data={saved} setBool={setBool} />
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

export default Vent
