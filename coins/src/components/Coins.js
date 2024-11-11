import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'

import CoinTable from './CoinTable'


const Coins = () => {

  const [coins20, setCoins20] = useState([])
  const [filtercoins, setFilterCoins] = useState([])


  const hook = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C%2024hr%2C%207d')
      .then(response => {
        setCoins20(response.data)
        setFilterCoins(response.data)
      })
      .catch(err => console.log(err))
  }


  // const marketCap = () =>{
  //   hook()
  //   console.log('updated')
  // }
  const filter = () => {
    const filter = coins20.sort((a, b) => (b.current_price) - (a.current_price))
    // console.log(filter)
    setFilterCoins('')
    setFilterCoins(filter)
    setCoins20(filter)
    console.log(filtercoins)
    console.log('done')
    // Want to improve this function

  }
 
  useEffect(hook, [])




  


  if (filtercoins === []) {
    console.log('loading')
    return <Loader color="#FFF" backgound="background-dark" />
  }

  return (
    <section className="section is-fullheight" id="coin-body">
      <div className="container">
        <div className="container">
          <h1 className="coin-title">coin overview</h1>
          <h2 className="coin-subtitle">by market cap</h2>
          {/* <div className="navbar1">
            <ul>
              <li className="link2" onClick={()=> marketCap()}>MARKET CAP</li>
              <li className="link2" onClick={() => filter()}>CURRENT PRICE</li>
            </ul>
          </div> */}
        </div>
        <div className="container">
          <CoinTable data={filtercoins} />
        </div>
      </div>
    </section>

  )

}
export default Coins