import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Popular from '../components/Popular'

const Home = () => {
  useEffect(()=>{
    document.title = 'Home | MyStore'
  }, [])
  return (
    <div>
      <Hero />
      <Popular />
    </div>
  )
}

export default Home
