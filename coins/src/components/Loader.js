import React from 'react'
import { BarLoader } from 'react-css-loaders'
// https://github.com/LucasBassetti/react-css-loaders'

const Loader = ( { color, background } ) => (
  <section className= {`hero is-fullheight ${background}`}>
    <div className="hero-body">
      <div className="container has-text-centered">
        <BarLoader color={color} />
      </div>
    </div>
  </section>


)

export default Loader