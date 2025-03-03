import React from 'react'
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import BasicMenu from './BasicMenu'
import Avatar from '@mui/material/Avatar';
import { FaUser } from 'react-icons/fa';
import { useStore } from '../contexts/StoreContext'
import ModalCart from './ModalCart'


const Header = () => {
    const {state} = useStore()
    const isAuthenticated = state.isAuthenticated

    return (
      <header>
        <div className="flex items-center space-x-2 md:space-x-10">
          <div className="flex-shrink-0">
            <Link to="/store" className="text-xl font-extrabold text-[#0D775E] uppercase">Urban Threads</Link>
          </div>
          
  
          <BasicMenu />
  
          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink"><Link to='/store'>HOME</Link></li>
            <li className="headerLink"><Link to='/store'>SHOP</Link></li>
            <li className="headerLink"><Link to='/cart'>BASKET</Link></li>
            <li className="headerLink"><Link to='/store'>ABOUT</Link></li>
          </ul>
        </div>
  
        <div className="flex items-center space-x-4 text-sm font-light">
          <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
          <ModalCart />
          { isAuthenticated ?
            <Link to="/account">
              <Avatar  className='cursor-pointer'><FaUser className='h-6 w-6' /></Avatar>
            </Link>
          :
          <Link to='/login'>
          <p className="hidden uppercase lg:inline font-semibold cursor-pointer"> Sign In</p>
        </Link>
          }
        </div>
      </header>
    )
}

export default Header
