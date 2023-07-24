import React from 'react'
import Validation from '../Validation'
const LoginFormValidation = () => {
    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: ""
      })
      const [errors,setErrors] = React.useState({})
      function handleInput(event){
        const newObj = {...values,[event.target.name]:event.target.value}
        setValues(newObj)
      }
      function handleValidation(event){
        event.preventDefault()
        setErrors(Validation(values))
        
      } 
  return (
    
    <div className='container mt-5'>
    <form onSubmit={handleValidation}>
      <div class="mb-3">
        <label for="name" class="form-label">Enter Name</label>
        <input type="text" class="form-control" onchange={handleInput} name="name" />
        {errors.name && <p>{errors.name}</p> }
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" name="email" onchange={handleInput} 
        />
        {errors.email && <p>{errors.email}</p> }
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" onchange={handleInput} />
        {errors.password && <p>{errors.password}</p> }
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default LoginFormValidation
