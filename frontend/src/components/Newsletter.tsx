import React from 'react'

const Newsletter = () => {
  const handleClick = () => {
    
  }
  return (
    <div>
      <div className='newsletter '>
        <h1>Get Exclusive Offers on your email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type='email' placeholder='Your Email id' autoFocus required />
            <button onClick={handleClick}>Subscribe</button>
        </div>
    </div>
    </div>
  )
}

export default Newsletter
