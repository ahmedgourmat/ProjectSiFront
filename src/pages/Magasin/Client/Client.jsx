import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import ClientUpdate from '../../../components/ClientUpdate/ClientUpdate';
import { toast, Toaster } from 'react-hot-toast';

function Client() {
  const [searchCode, setSearchCode] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [searchPrenom, setSearchPrenom] = useState('');
  const [token, setToken] = useState('');

  const [values, setValues] = useState({
    codeCl: '',
    nomCl: '',
    prenomCl: '',
    adrCl: '',
    telCl: '',
  });

  const [data, setData] = useState([]);
  const [bool, setBool] = useState(true);
  const [id, setId] = useState('');

  const fetchingData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/client', {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const filteredData = response.data
          .filter(
            (elem) =>
              (searchCode === '' || elem.codeCl.toLowerCase().includes(searchCode.toLowerCase())) &&
              (searchNom === '' || elem.nomCl.toLowerCase().includes(searchNom.toLowerCase())) &&
              (searchPrenom === '' || elem.prenomCl.toLowerCase().includes(searchPrenom.toLowerCase()))
          );
        setData(filteredData.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    fetchingData();
  }, [data, token, searchCode, searchNom, searchPrenom]);

  const createHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const changeHandler = (e) => {
    setSearchCode('');
    setSearchNom('');
    setSearchPrenom('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:8080/api/v1/client',
        {
          codeCl: values.codeCl,
          nomCl: values.nomCl,
          prenomCl: values.prenomCl,
          adrCl: values.adrCl,
          telCl: values.telCl,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setValues({
          codeCl: '',
          nomCl: '',
          prenomCl: '',
          adrCl: '',
          telCl: '',
        });
        toast.success('Done');
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const deleteHandler = async (codeCl) => {
    await axios
      .delete(`http://localhost:8080/api/v1/client/${codeCl}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateHandler = async (codeCl) => {
    setId(codeCl);
    setBool(false);
  };

  return (
    <div className='app__product'>
      <div className='app__product-search'>
        <input type='text' name='searchCode' placeholder='Search CodeCl' value={searchCode} onChange={(e) => setSearchCode(e.target.value)} />
        <input type='text' name='searchNom' placeholder='Search Nom' value={searchNom} onChange={(e) => setSearchNom(e.target.value)} />
        <input type='text' name='searchPrenom' placeholder='Search Prenom' value={searchPrenom} onChange={(e) => setSearchPrenom(e.target.value)} />
        <button onClick={fetchingData}>Search</button>
      </div>
      <form className='app__product-add' onSubmit={(e) => submitHandler(e)}>
        <h1>Add A Client</h1>
        <input type='text' placeholder='CodeCl(must be unique)' name='codeCl' value={values.codeCl} onChange={(e) => createHandler(e)} />
        <input type='text' placeholder='nom' name='nomCl' value={values.nomCl} onChange={(e) => createHandler(e)} />
        <input type='text' placeholder='prenom' name='prenomCl' value={values.prenomCl} onChange={(e) => createHandler(e)} />
        <input type='text' placeholder='adresse' name='adrCl' value={values.adrCl} onChange={(e) => createHandler(e)} />
        <input type='text' placeholder='telephone' name='telCl' value={values.telCl} onChange={(e) => createHandler(e)} />
        <button>ADD</button>
      </form>
      <div className='app__product-products'>
        {data.map((elem) => (
          <div className='oneProduct' key={elem.codeCl}>
            <div>
              <h3>CodeCl : {elem.codeCl}</h3>
              <h3>nomCl : {elem.nomCl}</h3>
              <h3>prenomCl : {elem.prenomCl}</h3>
              <h3>adrCl : {elem.adrCl}</h3>
              <h3>telCl : {elem.telCl}</h3>
              <h3>credit : {elem.credit}</h3>
            </div>
            <div className='btns'>
              <button onClick={() => updateHandler(elem.codeCl)}>Update</button>
              <button className='delete' onClick={() => deleteHandler(elem.codeCl)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <ClientUpdate bool={bool} codeCl={id} setBool={setBool} />
      </div>
      {!bool && <div className='shadow' onClick={() => setBool(!bool)}></div>}
      <Toaster position='bottom-left' reverseOrder={false} />
    </div>
  );
}

export default Client;
