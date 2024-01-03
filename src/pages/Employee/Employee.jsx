import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import axios from 'axios'
import EmployeeUpdate from '../../components/EmployeeUpdate/EmployeeUpdate'
import { toast, Toaster } from 'react-hot-toast'

function Employee() {
    const [product, setProduct] = useState('')
    const [values, setValues] = useState({
        codeE: '',
        nomE: '',
        prenomE: '',
        adrE: '',
        telE: '',
        salaire: '',
        codeCt: ''
    })
    const [data, setData] = useState([])
    const [center, setCenter] = useState([])
    const [bool, setBool] = useState(true)
    const [id, setId] = useState('')

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/employee')
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse())
            }
            const responseCenter = await axios.get('http://localhost:8080/api/v1/center')
            if (responseCenter.status >= 200 && responseCenter.status < 300) {
                setCenter(responseCenter.data)
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
        await axios.post('http://localhost:8080/api/v1/employee', { codeE: values.codeE, nomE: values.nomE, prenomE: values.prenomE, adrE: values.adrE, telE: values.telE, salaire: Number.parseInt(values.salaire), codeCt: values.codeCt })
            .then((res) => {
                console.log(res)
                setValues({
                    codeE: '',
                    nomE: '',
                    prenomE: '',
                    adrE: '',
                    telE: '',
                    salaire: '',
                    codeCt: ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    const deleteHandler = async (codeE) => {
        await axios.delete(`http://localhost:8080/api/v1/employee/${codeE}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const updateHandler = async (codeE) => {
        setId(codeE)
        setBool(false)
    }



    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input type="text" name='product' placeholder='Search' value={product} onChange={(e) => { changeHandler(e) }} />
                <button>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add An Employee</h1>
                <input type="text" placeholder='CodeE(must be unique)' name='codeE' value={values.codeE} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='nom' name='nomE' value={values.nomE} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='prenom' name='prenomE' value={values.prenomE} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='adresse' name='adrE' value={values.adrE} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='telephone' name='telE' value={values.telE} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='salaire' name='salaire' value={values.salaire} onChange={(e) => { createHandler(e) }} />
                <input
                    list="centerOptions"
                    placeholder="Select a center"
                    name="codeCt"
                    value={values.codeCt}
                    onChange={(e) => { createHandler(e) }}
                />
                <datalist id="centerOptions">
                    {center.map((elem) => (
                        <option key={elem.codeCt} value={elem.codeCt} />
                    ))}
                </datalist>
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {
                    data.map((elem) => {
                        return (
                            <div className='oneProduct'>
                                <div>
                                    <h3>CodeF : {elem.codeE}</h3>
                                    <h3>nomE : {elem.nomE}</h3>
                                    <h3>prenomE : {elem.prenomE}</h3>
                                    <h3>adrE : {elem.adrE}</h3>
                                    <h3>telE : {elem.telE}</h3>
                                    <h3>salaire : {elem.salaire}</h3>
                                    <h3>codeCt : <a href={`http://localhost:5173/center/#${elem.codeCt}`}>{elem.codeCt}</a> </h3>
                                </div>
                                <div className="btns">
                                    <button onClick={() => { updateHandler(elem.codeE) }}>Update</button>
                                    <button className='delete' onClick={() => { deleteHandler(elem.codeE) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <EmployeeUpdate bool={bool} codeE={id} setBool={setBool} />
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

export default Employee
