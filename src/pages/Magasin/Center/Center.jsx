import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import CenterUpdate from '../../../components/CenterUpdate/CenterUpdate';
import { toast, Toaster } from 'react-hot-toast';

function Center() {
    const [token, setToken] = useState('');

    const [codeSearch, setCodeSearch] = useState('');
    const [product, setProduct] = useState('');
    const [values, setValues] = useState({
        codeCt: '',
        designCt: ''
    });
    const [data, setData] = useState([]);
    const [bool, setBool] = useState(true);
    const [id, setId] = useState('');

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/center', {
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
        setProduct('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/center', {
                codeCt: values.codeCt,
                designCt: values.designCt
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status >= 200 && response.status < 300) {
                setValues({
                    codeCt: '',
                    designCt: ''
                });
                toast.success('Done');
                // Refetch data after successful addition
                fetchingData();
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    const deleteHandler = async (codeCt) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/center/${codeCt}`, {
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

    const updateHandler = async (codeCt) => {
        setId(codeCt);
        setBool(false);
    };

    const filterCenters = (centers, code) => {
        return centers.filter((center) => {
            const codeMatches = code ? center.codeCt.toLowerCase().includes(code.toLowerCase()) : true;
            return codeMatches;
        });
    };

    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input
                    type="text"
                    name='codeSearch'
                    placeholder='Search by CodeCt'
                    value={codeSearch}
                    onChange={(e) => { setCodeSearch(e.target.value) }}
                />
                <button disabled>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Center</h1>
                <input type="text" placeholder='CodeCt(must be unique)' name='codeCt' value={values.codeCt} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='designCt' name='designCt' value={values.designCt} onChange={(e) => { createHandler(e) }} />
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {filterCenters(data, codeSearch).map((elem) => (
                    <div className='oneProduct' key={elem.codeCt}>
                        <div>
                            <h3>CodeCt : {elem.codeCt}</h3>
                            <h3>designCt : {elem.designCt}</h3>
                        </div>
                        <div className="btns">
                            <button onClick={() => { updateHandler(elem.codeCt) }}>Update</button>
                            <button className='delete' onClick={() => { deleteHandler(elem.codeCt) }}>Delete</button>
                        </div>
                    </div>
                ))}
                <CenterUpdate bool={bool} codeCt={id} setBool={setBool} />
            </div>
            {!bool && <div className='shadow' onClick={() => { setBool(!bool) }}></div>}
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </div>
    );
}

export default Center;
