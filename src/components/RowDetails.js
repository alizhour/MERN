import React from 'react'
import { Link } from 'react-router-dom'

function RowDetails({customerName, customerAdress, customerMobileNumber, Id, OnDelete, countryCode, countryName, operatorName}) {
    return (

        <tr>
            <th>{customerName}</th>
            <td>{customerAdress}</td>
            <td>{customerMobileNumber}</td>
            <th>{countryCode}</th>
            <td>{countryName}</td>
            <td>{operatorName}</td>
            <td className="gap__actions">

                <span className="badge bg-info">
                    <Link to={`/${Id}`} className="text-white"><i className="fas fa-edit"></i></Link>
                </span>

                <span className="badge bg-danger" onClick={()=>OnDelete(Id)}>
                    <i className="fas fa-trash-alt"></i></span>
            </td>
        </tr>
    )
}

export default RowDetails