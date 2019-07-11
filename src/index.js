import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

import {useFormValidation} from './useFormValidation'
import {validationRules} from './LoginFormValidationRules'

const INITIAL_STATE = {email: '', password: ''}

const Register = () => {
  const [authenticationError, setauthenticationError] = useState(null)

  const authenticateUser = () => {
    const {email, password} = values
    console.log(email, password)
    setauthenticationError('Invalid user')
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isDataSubmitting,
  } = useFormValidation(INITIAL_STATE, validationRules, authenticateUser)
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  return (
    <div className="container">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={errors.email && "error-input"}
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Your email address"
          required
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          type="password"
          name="password"
          autoComplete="off"
          placeholder="Choose a safe password"
          required
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {authenticationError && <p className="error-text">{authenticationError}</p>}
        <div>
          <button disabled={isDataSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<Register />, rootElement)
