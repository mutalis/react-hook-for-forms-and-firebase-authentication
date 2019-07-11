import { useState, useEffect } from 'react'

export const useFormValidation = (initialState, validate, formCallback) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isDataSubmitting, setIsDataSubmitting] = useState(false)

  // as a result (side effect) of [value] changing, do this.
  // as a side effect of the value of errors changing,
  // check if there are not errors and if so, call the callback function.
  useEffect(() => {
    if (isDataSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) formCallback('No errors, submit callback called!')
      setIsDataSubmitting(false)
    }
  }, [errors, isDataSubmitting, formCallback])

  const handleChange = event => {
    if (event) {
      event.persist()
      setValues({
        ...values,
        [event.target.name]: event.target.value
      })
    }
  }

  const handleBlur = () => setErrors(validate(values))

  const handleSubmit = event => {
    if (event) event.preventDefault()
    setIsDataSubmitting(true)
    setErrors(validate(values))
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isDataSubmitting,
  }
}
