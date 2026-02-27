import React from 'react'
import Hero from '../components/Hero.jsx'
import Category from '../components/categories.jsx'
import Costestimate from '../components/costestimate.jsx'
import JoinSection from '../components/joinsection.jsx'
import HowItWorks from '../components/howitworks.jsx'


const home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Category />
      <JoinSection />
      <Costestimate />
    </div>
  )
}

export default home