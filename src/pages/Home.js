import React, { useEffect, useState } from 'react'
import InputGroup from '../components/InputGroup'
import RowDetails from '../components/RowDetails'
import axios from 'axios'
import Alert from '../components/Alert';

function Home() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [submited, setSubmited] = useState(false);


    /* Create Customer */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            
        });

    };
    const onSubmitHandler = (e) => {
        
        e.preventDefault();
        axios.post('/api/users', form)
            .then(res => {
                setSubmited(true)
                setErrors({})
                retrieveUser()
                setMessage(res.data.message)
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 4000);
            })
            .catch(err => setErrors(err.response.data))
    }


    /* Delete Customer */
    const OnDelete = (id__) => {
        if (window.confirm("Are you sure to DELETE this Customer")) {
            axios.delete(`/api/users/${id__}`)
                .then(res => {
                    retrieveUser()
                    setMessage(res.data.message)
                    setShow(true)
                    setTimeout(() => {
                        setShow(false)
                    }, 4000);
                })
        }
    }

    /* find all customer */
    const retrieveUser = () => {
        axios.get('/api/users')
            .then(res => {
                setUsers(res.data)
                setSubmited(false)
            })
    }

    useEffect(() => {
        retrieveUser();
    }, [])

    return (
        <div className="row p-4">
            <Alert message={message} show={show} />
            <div className="mt-4">
                <h2>Crud Customer</h2>
            </div>
            <div className="col-12 col-lg-4">
                <form onSubmit={onSubmitHandler}>
                    <InputGroup label="Customer Name" type="text" name="customerName" onChangeHandler={onChangeHandler} errors={errors.customerName} submited={submited} />
                    <InputGroup label="Customer Adress" type="text" name="customerAdress" onChangeHandler={onChangeHandler} errors={errors.customerAdress} submited={submited} />
                    <InputGroup label="Customer Mobile Number" type="text" name="customerMobileNumber" onChangeHandler={onChangeHandler} errors={errors.customerMobileNumber} submited={submited} placeholder="(XXX)-PHONE NUMBER"/>
                    <button className="btn btn-primary" type='submit'>Add Customer</button>
                </form>
            </div>
            <div className="col-12 col-lg-7">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope='col'>Customer Name</th>
                            <th scope='col'>Customer Adress</th>
                            <th scope='col'>Customer Mobile Number</th>
                            <th scope='col'>Customer Country Code</th>
                            <th scope='col'>Customer Country Name</th>
                            <th scope='col'>Customer Carrier</th>
                            <th scope='col'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({ customerName, customerAdress, customerMobileNumber, _id, countryCode, countryName, operatorName}) => (
                                <RowDetails 
                                    customerName={customerName}
                                    customerAdress={customerAdress}
                                    customerMobileNumber={customerMobileNumber}
                                    countryCode={countryCode}
                                    countryName={countryName}
                                    operatorName={operatorName}
                                    Id={_id}
                                    OnDelete={OnDelete} />
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home