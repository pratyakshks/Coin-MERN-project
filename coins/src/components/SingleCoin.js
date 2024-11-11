import React from 'react'
import axios from 'axios'
import Loader from './Loader'
// https://github.com/LucasBassetti/react-css-loaders'
import GraphSingle from './GraphChange'
import NewsFeedSingle from './newsFeedSingle'


class SingleCoin extends React.Component {
  // https://api.coingecko.com/api/v3/coins/ethereum?tickers=true

  constructor() {
    super()
    this.state = {
      coin: null,
      news: null,
      error: false,
      error_news: false
    }
  }

  newsHook = (data) => {
    const symbol = data.symbol
    axios
    .get(`https://data.messari.io/api/v1/news/${symbol}`)
    .then(response => this.setState({ news: response.data.data }))
    .catch(err => this.setState({ error_news: err.response.status }))

}

  

  componentDidMount() {
    const id = (this.props.match.params.id)
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true`)
      .then(response => {
        this.newsHook(response.data)
        this.setState({ coin: response.data })})
      // .then(response => this.newsHook(response.data))
      .catch(err => this.setState({ error: err }))

  }
// .name - .symbol - .block_time_in_minutes .links.homepage[0]
// .image.small or .large .genesis_date .market_data.current_price.usd // .eur // .gbp
// .market_cap.usd .high_24h.usd  .low_24h.usd .price_change_24h

  render() {

    if (!this.state.coin || !this.state.news) {
      return (
        <Loader color = "#000" background = "background-white"/>
      )
    } else {
      const { coin } = this.state;
      // console.log(this.state.news)
      // console.log(this.state.err)
      return (
        <section className="section is-fullheight background-white">
          <div className="container">
            <div className="columns">
              <div className="column">
              <div className="title2">Coin Overview</div>
                <div className = "has-text-centered">
                  <img src={coin.image.large} alt="Logo" />
                </div>
                <p>Name : <span className="align-right">{coin.name}</span></p>
                <p>Symbol : <span className="align-right">{coin.symbol}</span></p>
                <p>Homepage : <span className="align-right">{coin.links.homepage[0]}</span></p>
                <p>Block Time (min) : <span className="align-right">{coin.block_time_in_minutes}</span></p>
                {/* <p>Genesis Date : {coin.genesis_date}</p> */}
              </div>
              <div className="column">
              <div className="title2">Market Data</div>
              <p>Current Price in :</p>
              <p>USD : <span className="align-right">{coin.market_data.current_price.usd}</span></p>
              <p>EUR : <span className="align-right">{coin.market_data.current_price.eur}</span></p>
              <p>GBP : <span className="align-right">{coin.market_data.current_price.gbp}</span></p>
              <br></br>
              <p>Percentage Change in 24hr : <span className="align-right">{coin.market_data.price_change_percentage_24h}</span></p>
              <p>24hr Price Change : <span className="align-right">{coin.market_data.price_change_24h}%</span></p>
              <br />
              <p>24hr High : <span className="align-right">{coin.market_data.high_24h.usd}</span></p>
              <p>24hr Low : <span className="align-right">{coin.market_data.low_24h.usd}</span></p>
             </div>
              <div className="column">
                <div className="title2">% Price change over time</div>
                <div className="graph-div">
                  <GraphSingle  data={coin.market_data}/>
                </div>
               </div>
            </div>
          </div>
          <div className="section">
          <div className="title2">News Feed</div>

            <NewsFeedSingle data={this.state.news} />
          </div>
        </section>


      )
    }
  }



}
export default SingleCoin