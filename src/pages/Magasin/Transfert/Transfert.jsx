import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import TransfertUpdate from '../../../components/TransfertUpdate/TransfertUpdate'

function Transfert() {
    const [token , setToken] = useState('')

    const [product, setProduct] = useState('')
    const [saved, setSaved] = useState({
        dateT: '',
        codeCt: '',
        codeP: ''
    })
    const [values, setValues] = useState({
        dateT: '',
        codeCt: '',
        codeP: '',
        qteT: '',
        payed : ''
    })
    const [data, setData] = useState([])
    const [center, setCenter] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const [bool, setBool] = useState(true)

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/transfert' , {
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse())
            }
            const responseCenter = await axios.get('http://localhost:8080/api/v1/center',{
                headers : {
                    'Authorization' : 'Barear ' + token
                }
            })
            if (responseCenter.status >= 200 && responseCenter.status < 300) {
                setCenter(responseCenter.data)
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
        await axios.post('http://localhost:8080/api/v1/transfert', { dateT: values.dateT, codeCt: values.codeCt, codeP: values.codeP, qteT: Number.parseInt(values.qteT) , payed: Number.parseInt(values.payed) },{
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
            .then((res) => {
                console.log(res)
                setValues({
                    dateT: '',
                    codeCt: '',
                    codeP: '',
                    qteT: '',
                    payed : ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    const deleteHandler = async ({ dateT, codeCt, codeP }) => {
        await axios.delete(`http://localhost:8080/api/v1/transfert/${dateT}/${codeCt}/${codeP}`,{
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


    const updateHandler = async ({ date, codeCenter, codePro }) => {
        setSaved({
            dateT: date,
            codeCt: codeCenter,
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
                <h1>Add A Transfert </h1>
                <input type="date" placeholder='Date' name='dateT' value={values.dateT} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='quantite' name='qteT' value={values.qteT} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='payed' name='payed' value={values.payed} onChange={(e) => { createHandler(e) }} />
                <input
                    list="fournisseurOption"
                    placeholder="Select a center"
                    name="codeCt"
                    value={values.codeCt}
                    onChange={(e) => { createHandler(e) }}
                />
                <datalist id="fournisseurOption">
                    {center.map((elem) => (
                        <option key={elem.codeCt} value={elem.codeCt} />
                    ))}
                </datalist>
                <p>Want to create a center ? <a href="http://localhost:5173/center" target="_blank"> Create one</a></p>
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
                                    <h3>date : {elem.dateT.split('T')[0]}</h3>
                                    <h3>quantity : {elem.qteT}</h3>
                                    <h3>Cout : {elem.Cout}</h3>
                                    <h3>Payed : {elem.payed}</h3>
                                    <h3>rest : {elem.rest}</h3>
                                    <h3>codeCt : <a href={`http://localhost:5173/center/#${elem.codeCt}`}>{elem.codeCt}</a> </h3>
                                    <h3>codeP : <a href={`http://localhost:5173/products/#${elem.codeCt}`}>{elem.codeP}</a> </h3>
                                </div>
                                <div className="btns">
                                    <button onClick={() => { updateHandler({ date: elem.dateT, codeCenter: elem.codeCt, codePro: elem.codeP }) }}>Update</button>
                                    <button className='delete' onClick={() => { deleteHandler({ dateT: elem.dateT, codeCt: elem.codeCt, codeP: elem.codeP }) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <TransfertUpdate bool={bool} data={saved} setBool={setBool} />
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

export default Transfert
