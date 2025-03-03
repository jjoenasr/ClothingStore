import React, { useEffect } from 'react'
// import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Popular from '../components/Popular'
import Newsletter from '../components/Newsletter'

const Home = () => {
  useEffect(()=>{
    document.title = 'Home | MyStore'
  }, [])
  return (
    <div className='w-screen'>
      <Banner />
      <Popular />
      <Newsletter />
    </div>
  )
}

export default Home
