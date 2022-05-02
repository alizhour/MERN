import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import axios from 'axios'


function Details() {
  const [form, setForm] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
    /* Create Customer */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`/api/users/${id}`, form)
            .then(res => {
                navigate('/')
            })
            .catch(err => setErrors(err.response.data))
    }


    useEffect(() => {
      axios.get(`/api/users/${id}`).then((res) => {
              setForm(res.data);
          });
    }, []);
  return (
    <div className="container mt-5 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup label="Customer Name" type="text" name="customerName" onChangeHandler={onChangeHandler} errors={errors.customerName} value={form.customerName}/>
        <InputGroup label="Customer Adress" type="text" name="customerAdress" onChangeHandler={onChangeHandler} errors={errors.customerAdress} value={form.customerAdress}/>
        <InputGroup label="Customer Mobile Number" type="text" name="customerMobileNumber" onChangeHandler={onChangeHandler} errors={errors.customerMobileNumber} value={form.customerMobileNumber}/>
        <button className="btn btn-primary" type='submit'>Update Customer</button>
      </form>
    </div>
  )
}

export default Details