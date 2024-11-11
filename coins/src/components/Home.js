import React from 'react'
import LazyHero from 'react-lazy-hero'
// import { Animation } from 'react-animated-css'
// https://digital-flowers.github.io/react-animated-css.html




const Home = () => (
  <div className ="hero">
    <LazyHero imageSrc="https://newfinancial.org/wp-content/uploads/2019/01/iStock-869423492-Cover-image-full-2.jpg"
    isCentered = {true}
    minHeight="100vh"
    transitionDuration={0}
    transitionTimingFunction="ease-in-out"
    color="#00003f"
    opacity = {0.6}
    className="Lazy-hero">
      <h1>coins</h1>
    </LazyHero>

    {/* ... */}
  </div>

)

export default Home