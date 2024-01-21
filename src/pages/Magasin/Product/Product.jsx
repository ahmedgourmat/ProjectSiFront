import React, { useEffect, useState } from 'react';
import './Product.scss';
import axios from 'axios';
import ProductUpdate from '../../../components/ProductUpdate/ProductUpdate';
import { toast, Toaster } from 'react-hot-toast';

function Product() {
    const [token, setToken] = useState('');

    const [codeSearch, setCodeSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [values, setValues] = useState({
        codeP: '',
        nameP: '',
        designP: '',
        price: ''
    });
    const [data, setData] = useState([]);
    const [bool, setBool] = useState(true);
    const [id, setId] = useState('');

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/products', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        fetchingData();
    }, [data, token]);

    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const changeHandler = (e) => {
        setCodeSearch('');
        setNameSearch('');
        setProduct('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/products', {
                codeP: values.codeP,
                nameP: values.nameP,
                designP: values.designP,
                price: Number.parseInt(values.price)
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status >= 200 && response.status < 300) {
                setValues({
                    codeP: '',
                    nameP: '',
                    designP: '',
                    price: ''
                });
                toast.success('Done');
                // Refetch data after successful addition
                fetchingData();
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    const deleteHandler = async (codeP) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/products/${codeP}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            // Refetch data after successful deletion
            fetchingData();
            toast.success('Done');
        } catch (err) {
            toast.error('There is an error');
            console.log(err);
        }
    };

    const updateHandler = async (codeP) => {
        setId(codeP);
        setBool(false);
    };

    const filterProducts = (products, code, name) => {
        return products.filter((product) => {
            const codeMatches = code ? product.codeP.toLowerCase().includes(code.toLowerCase()) : true;
            const nameMatches = name ? product.nameP.toLowerCase().includes(name.toLowerCase()) : true;

            return codeMatches && nameMatches;
        });
    };

    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input
                    type="text"
                    name='codeSearch'
                    placeholder='Search by Code'
                    value={codeSearch}
                    onChange={(e) => { setCodeSearch(e.target.value) }}
                />
                <input
                    type="text"
                    name='nameSearch'
                    placeholder='Search by Name'
                    value={nameSearch}
                    onChange={(e) => { setNameSearch(e.target.value) }}
                />
                <button disabled>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Product</h1>
                <input type="text" placeholder='CodeP(must be unique)' name='codeP' value={values.codeP} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='nameP' name='nameP' value={values.nameP} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='designP' name='designP' value={values.designP} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='price' name='price' value={values.price} onChange={(e) => { createHandler(e) }} />
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {filterProducts(data, codeSearch, nameSearch).map((elem) => (
                    <div className='oneProduct' id={elem.codeP} key={elem.codeP}>
                        <div>
                            <h3>CodeP : {elem.codeP}</h3>
                            <h3>nameP : {elem.nameP}</h3>
                            <h3>designP : {elem.designP}</h3>
                            <h3>qteStock : {elem.qteStock}</h3>
                            <h3>price : {elem.price} DA</h3>
                        </div>
                        <div className="btns">
                            <button onClick={() => { updateHandler(elem.codeP) }}>Update</button>
                            <button className='delete' onClick={() => { deleteHandler(elem.codeP) }}>Delete</button>
                        </div>
                    </div>
                ))}
                <ProductUpdate bool={bool} codeP={id} setBool={setBool} />
            </div>
            {!bool && <div className='shadow' onClick={() => { setBool(!bool) }}></div>}
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </div>
    );
}

export default Product;
