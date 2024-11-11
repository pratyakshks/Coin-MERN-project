import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import auth from '../lib/auth'


const Portfolio = (props) => {

  const [portfolio, setPortfolio] = useState([])
  const [errors, setErrors] = useState([])
  const [modelState, setModelState] = useState(false)
  const [newPortfolio, setNewPortfolio] = useState({})

  const portfolioHook = () => {
    const userID = props.match.params.userID
    axios.get(`http://localhost:8000/api/portfolio/${userID}`)
      .then(response => setPortfolio(response.data)) //this will only return list with a status of active
      .catch(err => setErrors(err))
  }
  const handleChangePortfolio = (e) => {
    setNewPortfolio({ ...newPortfolio, [e.target.name]: e.target.value })
    console.log(newPortfolio)
  }
  const handleSubmitPortfolio = (e) => {
    setModelState(false)
    e.preventDefault()
    axios.post('http://localhost:8000/api/portfolio', newPortfolio, {
      headers: { Authorization: `Bearer ${auth.getToken()}` }
    })
      .then(() => portfolioHook())
      .catch((err) => {
        setErrors (err.response.data.errors )
      })
  }

  const modelOpen = () => {
    setModelState(true)
  }
  const modelClose = () => {
    setModelState(false)
    setNewPortfolio({})
  }

  const viewSinglePort = (ele) => {
    props.history.push(`/portfolio/${ele._id}`)

  }

  useEffect(portfolioHook, [])
  console.log(portfolio)

  return (
    <section className="hero is-fullheight background-white">
      <section className="section">
        <div className="container">
          <div className="register-title">Portfolio Dashboard</div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className='button link'
            label="Portfolio"
            onClick={modelOpen}
          >
            Create a Portfolio
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modalportfolio"
            open={modelState}
            onClose={modelClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modelState}>
              <section className="section background-white">
                <Container component="main" maxWidth="xs">
                  <div className="register-title">New Portfolio</div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // className="background-white"
                    required
                    fullWidth
                    id="email"
                    label="Portfolio Name"
                    name="portfolioname"
                    autoComplete="portfolioname"
                    autoFocus
                    color="white"
                    onChange={(e) => handleChangePortfolio(e)}
                    type="text"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className='button link'
                    label="create"
                    onClick={(e) => handleSubmitPortfolio(e)}
                  >
                    Create
                  </Button>
                </Container>
              </section>
            </Fade>
          </Modal>
          {portfolio.map((ele, i) => {
            return (
              <div key={i} onClick={()=>viewSinglePort(ele)}>{ele.portfolioname}
              </div>
            )

          })}



        </div>
      </section>
    </section>
  )



}

export default Portfolio