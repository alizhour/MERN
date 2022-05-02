import React from 'react'
import classnames from 'classnames'

function InputGroup({label, type, name, onChangeHandler, errors, value, submited, placeholder}) {
  return (
    <div className="mb-3">
    <label for="Email" className="form-label">
      {label}
    </label>
    <input type={type} value={ submited == true ? "" : value } className={(classnames("form-control", {"is-invalid": errors}))}  name={name} onChange={onChangeHandler} Placeholder={placeholder}/>
    {                                                           
      errors && (<div class="invalid-feedback">
      {errors}
    </div>)
    }
  </div>
  )
}

export default InputGroup