import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import AchatUpdate from '../../components/AchatUpdate/AchatUpdate'



function Achat() {
    const [product, setProduct] = useState('')
    const [saved, setSaved] = useState({
        dateA: '',
        codeF: '',
        codeP: ''
    })
    const [values, setValues] = useState({
        dateA: '',
        codeF: '',
        codeP: '',
        qteA: ''
    })
    const [data, setData] = useState([])
    const [fournisseur, setFournisseur] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const [bool, setBool] = useState(true)

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/achat')
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse())
            }
            const responseFournisseur = await axios.get('http://localhost:8080/api/v1/fournisseur')
            if (responseFournisseur.status >= 200 && responseFournisseur.status < 300) {
                setFournisseur(responseFournisseur.data)
            }
            const responseProduct = await axios.get('http://localhost:8080/api/v1/product')
            if (responseProduct.status >= 200 && responseProduct.status < 300) {
                setProductInfo(responseProduct.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchingData()
    }, [data , productInfo , fournisseur])


    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const changeHandler = (e) => {
        setProduct(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/achat', { dateA: values.dateA, codeF: values.codeF, codeP: values.codeP, qteA: Number.parseInt(values.qteA)})
            .then((res) => {
                console.log(res)
                setValues({
                    dateA: '',
                    codeF: '',
                    codeP: '',
                    qteA: ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    const deleteHandler = async ({ dateA, codeF, codeP }) => {
        await axios.delete(`http://localhost:8080/api/v1/achat/${dateA}/${codeF}/${codeP}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const updateHandler = async ({date , codeFou , codePro}) => {
        setSaved({
            dateA: date,
            codeF: codeFou,
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
                <h1>Add An Achat</h1>
                <input type="date" placeholder='Date' name='dateA' value={values.dateA} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='quantite' name='qteA' value={values.qteA} onChange={(e) => { createHandler(e) }} />
                <input
                    list="fournisseurOption"
                    placeholder="Select a fournisseur"
                    name="codeF"
                    value={values.codeF}
                    onChange={(e) => { createHandler(e) }}
                />
                <datalist id="fournisseurOption">
                    {fournisseur.map((elem) => (
                        <option key={elem.codeF} value={elem.codeF} />
                    ))}
                </datalist>
                <p>Want to create a fournisseur ? <a href="http://localhost:5173/fournisseur" target="_blank"> Create one</a></p>
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
                                    <h3>CodeF : {elem.dateA.split('T')[0]}</h3>
                                    <h3>qteA : {elem.qteA}</h3>
                                    <h3>montant : {elem.montant}</h3>
                                    <h3>codeF : <a href={`http://localhost:5173/fournisseur/#${elem.codeF}`}>{elem.codeF}</a> </h3>
                                    <h3>codeP : <a href={`http://localhost:5173/products/#${elem.codeF}`}>{elem.codeP}</a> </h3>
                                </div>
                                <div className="btns">
                                    <button onClick={() => { updateHandler({ date: elem.dateA, codeFou: elem.codeF, codePro: elem.codeP }) }}>Update</button>
                                    <button className='delete' onClick={() => { deleteHandler({ dateA: elem.dateA, codeF: elem.codeF, codeP: elem.codeP }) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <AchatUpdate bool={bool} data={saved} setBool={setBool} />
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

export default Achat
