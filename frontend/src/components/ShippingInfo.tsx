import React, { useEffect, useState } from 'react'
import { useStore } from '../contexts/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

const ShippingInfo = () => {
  const [address, setAddress] = useState<string>('')
  const [zipcode, setZipcode] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [mystate, setMyState] = useState<string>('')
  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className='w-full max-w-xl mx-auto pt-8'>
        <p className='font-semibold mb-2'>Shipping Information:</p>
        <form className='bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                required 
                className="form-control" 
                type="text" 
                name="address" 
                placeholder="Address.." 
                value={address}
                onChange={(e) => { setAddress(e.target.value)}}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                required
                className="form-control" 
                type="text" 
                name="city" 
                placeholder="City.."
                value={city}
                onChange={(e) => { setCity(e.target.value)}}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                required 
                className="form-control" 
                type="text" 
                name="state" 
                placeholder="State.."
                value={mystate}
                onChange={(e) => { setMyState(e.target.value)}} 
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zipcode">
                Zip Code
              </label>
              <input
                required 
                className="form-control" 
                type="text" 
                name="zipcode" 
                placeholder="Zip code.."
                value={zipcode}
                onChange={(e) => { setZipcode(e.target.value)}}
              />
            </div>
            <div className="mx-auto">
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              >
                Continue
              </button>
            </div>

          </div>

        </form>
    </div>
  )
}

export default ShippingInfo
