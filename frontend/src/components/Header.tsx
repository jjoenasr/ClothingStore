import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import{ ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import BasicMenu from './BasicMenu'
import Avatar from '@mui/material/Avatar';
import { FaUser } from 'react-icons/fa';
import { useStore } from '../contexts/StoreContext'


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const {cartTotalItems, favoritesTotal, state} = useStore()
    const isAuthenticated = state.isAuthenticated
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
  
      window.addEventListener('scroll', handleScroll)
  
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])
  
    return (
      <header>
        <div className="flex items-center space-x-2 md:space-x-10">
          <img
            src={process.env.PUBLIC_URL + '/images/logo.png'}
            width={150}
            height={150}
            className="cursor-pointer object-contain"
            alt='logo'
          />
  
          <BasicMenu />
  
          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink"><Link to='/store'>HOME</Link></li>
            <li className="headerLink"><Link to='/store'>SHOP</Link></li>
            <li className="headerLink"><Link to='/store'>BLOG</Link></li>
            <li className="headerLink"><Link to='/store'>ABOUT</Link></li>
            <li className="headerLink"><Link to='/store'>SERVICES</Link></li>
          </ul>
        </div>
  
        <div className="flex items-center space-x-4 text-sm font-light">
          <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
          <div className='relative inline-block'>
            <Link to="/favorites">
              <HeartIcon className='h-6 w-6 cursor-pointer' />
            </Link>
            <span className="badge">{favoritesTotal()}</span>
          </div>
          <div className='relative inline-block'>
              <Link to="/cart">
                <ShoppingCartIcon className='h-6 w-6 cursor-pointer' />
              </Link>
              <span className="badge">{cartTotalItems()}</span>
          </div>
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
