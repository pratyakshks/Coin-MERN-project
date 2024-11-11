import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'



const registerform = {
  firstname: '',
  surname:'',
  email: '',
  password: '',
  passwordConfirmation: ''

}


const Register = ( props ) => {

  const [registerInfo, setRegisterInfo] = useState(registerform)
  const [error, setErrors] = useState({})

  


  const handleChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    setErrors({})
    console.log(registerInfo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', registerInfo)
      .then(() => props.history.push('/login'))
      .catch((err) => {
        // if (err.response.data.error.includes('email')) return setErrors({ message: 'Your email is already in use' })
        // if (err.response.data.error.includes('password')) return setErrors({ message: 'Passwords do not match' })
        setErrors (err.response.data.errors )
      })
  }
  //this deals with the main 2 erros of duplicate email / incorrect email confirmation
  //need to add a regex function to check if email is valid input!
  //need to check if blank fields are before 
  // const errors1 = error.errors.email
  
  // console.log(error.email)
  // console.log(error)
  return (
    
    <section className="section is-fullheight background-white">
      <Container component="main" maxWidth="xs">
        <div className="register-title">Register</div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="field">
            {/* <label htmlFor="" className="label">
              Email
            </label>
            <div className="control">
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                name="email"
                className="input"
              />
            </div> */}
            <TextField
            variant="outlined"
            margin="normal"
            // className="background-white"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="white"
            onChange={(e) => handleChange(e)}
            type="text"
          />
            {error.email && <small className="help is-danger">
              {error.email}
            </small>}
          </div>
          <div className="field">
            {/* <label htmlFor="" className="label">
              Firstname
            </label>
            <div className="control">
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                name="firstname"
                className="input"
              />
            </div> */}
            <TextField
            variant="outlined"
            margin="normal"
            // className="background-white"
            required
            fullWidth
            id="Firstname"
            label="First Name"
            name="firstname"
            autoComplete="First name"
            autoFocus
            color="white"
            onChange={(e) => handleChange(e)}
            type="text"
          />
            {error.firstname && <small className="help is-danger">
              {error.firstname}
            </small>}
          </div>
          <div className="field">
            {/* <label htmlFor="" className="label">
              Surname
            </label>
            <div className="control">
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                name="surname"
                className="input"
              />
            </div> */}
            <TextField
            variant="outlined"
            margin="normal"
            // className="background-white"
            required
            fullWidth
            id="Surname"
            label="Surname"
            name="surname"
            autoComplete="Surname"
            autoFocus
            color="white"
            onChange={(e) => handleChange(e)}
            type="text"
          />
            {error.surname && <small className="help is-danger">
              {error.surname}
            </small>}
          </div>
          <div className="field">
            {/* <label htmlFor="" className="label">
              Password
            </label>
            <div className="control">
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                name="password"
                className="input"
              />
            </div> */}
            <TextField
            variant="outlined"
            margin="normal"
            // className="background-white"
            required
            fullWidth
            id="Password"
            label="Password"
            name="password"
            autoComplete="Password"
            autoFocus
            color="white"
            onChange={(e) => handleChange(e)}
            type="text"
          />
          </div>
          <div className="field">
            {/* <label htmlFor="" className="label">
              Confirm password
            </label>
            <div className="control">
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                name="passwordConfirmation"
                className="input"
              />
            </div> */}
            <TextField
            variant="outlined"
            margin="normal"
            // className="background-white"
            required
            fullWidth
            id="passwordConfirmation"
            label="Password Confirmation"
            name="passwordConfirmation"
            autoComplete="Password Confirmation"
            autoFocus
            color="white"
            onChange={(e) => handleChange(e)}
            type="text"
          />
            {error.password && <small className="help is-danger">
              {error.password}
            </small>}
          </div>
          {/* <button className="button link">
            Register
          </button> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='button link'
            label="Register"
          >
            Register
          </Button>
        </form>
        </Container>
    </section>

  )

}
export default Register