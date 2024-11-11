
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

const SinglePortfolio = (props) => {

  const [portfolioInfo, setPortfolioInfo] = useState({})
  const [errors, setErrors] = useState([])
  const [modelState, setModelState] = useState(false)
  const [inputCoin, setInputCoin] = useState({})
  const [coins, setCoins] = useState([])

  const portfolioHook = () => {
    const portID = props.match.params.portID
    axios.get(`http://localhost:8000/api/portfolio/single/${portID}`)
      .then(response => {
        setPortfolioInfo(response.data)
        setCoins(response.data.coins)
      }) //this will only return list with a status of active
      .catch(err => setErrors(err))
  }

  const modelOpen = () => {
    setModelState(true)
  }
  const modelClose = () => {
    setModelState(false)
    setInputCoin({})
  }

  const handleChangeNewCoin = (e) => {
    setInputCoin({ ...inputCoin, [e.target.name]: e.target.value })
    console.log(inputCoin)
  }

  const handleSubmitNewCoin = (e) => {
    setModelState(false)
    const portID = props.match.params.portID
    e.preventDefault()
    axios.post(`http://localhost:8000/api/portfolio/${portID}/coins`, inputCoin)
      .then(() => portfolioHook())
      .catch((err) => {
        setErrors (err.response.data.errors)
      })
  }

  useEffect(portfolioHook, [])

  console.log(coins)

  if (portfolioInfo === {}) return <div>Loading</div>
  return (
    <section className="hero is-fullheight background-white">
      <section className="section">
        <div className="container">
          <div className="register-title">{portfolioInfo.portfolioname}</div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className='button link'
              label="Portfolio"
              onClick={modelOpen}
            >
              Add a coin
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
                    <div className="register-title">New Coin</div>
                    <FormControl
                      className='coindropdown'
                    // fullwidth
                    >
                      <InputLabel id="demo-simple-select-label">Select your coin</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="coin_name"
                        required
                        onChange={(e) => handleChangeNewCoin(e)}
                      >
                        <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                        <MenuItem value='ethereum'>Ethereum</MenuItem>
                        <MenuItem value='ripple'>Ripple</MenuItem>
                      </Select>

                      <TextField
                        variant="outlined"
                        margin="normal"
                        // className="background-white"
                        required
                        fullWidth
                        // id="email"
                        label="Holding amount"
                        name="number"
                        autoComplete="Holding amount"
                        autoFocus
                        color="white"
                        onChange={(e) => handleChangeNewCoin(e)}
                        type="number"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='button link'
                        label="create"
                      onClick={(e) => handleSubmitNewCoin(e)}
                      >
                        Add Coin
                  </Button>
                    </FormControl>
                  </Container>
                </section>
              </Fade>
            </Modal>
            {coins.map((ele, i) => {
            return (
              <div key={i}>{ele.coin_name}
              </div>
            )

          })}
           
          </div>

        </div>
      </section>
    </section>
  )

}



export default SinglePortfolio