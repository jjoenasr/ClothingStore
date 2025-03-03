import React, { useEffect, useState } from 'react'
import { getProfile} from '../services/authServices'
import { getMyOrders } from '../services/storeServices'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext'
import { User, Order } from '../../typings'
import OrderSummary from '../components/OrderSummary'
import { FaSignOutAlt } from 'react-icons/fa'

const Account = () => {
  const [myOrders, setMyOrders] = useState<Order[]>([])
  const [user, setUser] = useState<User | undefined>(undefined)
  const navigate = useNavigate()
  const {removeToken, setLoading} = useStore()

  useEffect(()=>{
    const getMyProfile = async() => {
      try{
        setLoading(true)
        const orders = await getMyOrders()
        setMyOrders(orders)
        const profile = await getProfile()
        setUser(profile)
        setLoading(false)
      } catch(error:unknown){
        console.error("Error: ", error)
      }
    }

    document.title = 'My account | Djackets';
    getMyProfile();
  }, [setLoading])

  const logout = ()=>{
    removeToken()
    navigate('/store')
  }
  
  return (
    <div className='flex flex-col space-y-4 p-12 max-w-2xl mx-auto border shadow-md rounded-lg pt-[96px] lg:pl-10'>
      <div className='flex flex-wrap justify-between'>
        <h1 className='text-4xl font-bold'>Account</h1>
        <button className='btn-dark flex items-center' onClick={logout}>Logout <FaSignOutAlt className='h-4 w-4 ml-2'/></button>
      </div>
      <hr className='border-gray-800 border'/>

      <div className=" max-w-md w-full ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile</h2>
          <div className="my-3">
              <label htmlFor="firstname" className="block text-gray-700 font-medium">First Name</label>
              <p id="firstname" className="mt-1 text-gray-900">{user?.first_name}</p>
          </div>
          <hr />
          <div className="my-3">
              <label htmlFor="lastname" className="block text-gray-700 font-medium">Last Name</label>
              <p id="lastname" className="mt-1 text-gray-900">{user?.last_name}</p>
          </div>
          <hr />
          <div className="my-3">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <p id="email" className="mt-1 text-gray-900">{user?.email}</p>
          </div>
          <hr />
          <div className="my-3">
              <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
              <p id="phone" className="mt-1 text-gray-900">{user?.phone}</p>
          </div>
      </div>
      <hr className='border-gray-800 border'/>
      <div className="max-w-xl w-full ">
        <h3 className='text-2xl font-bold mb-4 text-gray-800'>Past Orders</h3>
        <div className='flex flex-col space-y-6 w-full'>
        { myOrders?.map((order) => (
              <div className='' key={order.id}>
                <h3 className='text-l font-semibold my-2'> {order.number} </h3>
                <hr />
                <OrderSummary items={order.items} totalItems={order.total_items} totalPrice={order.paid_amount} />
              </div>
        ))}

        </div>
      </div>
      <hr />
      </div>
  )  
}

export default Account
