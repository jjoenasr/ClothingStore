import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import{ ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import BasicMenu from './BasicMenu'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useStore } from '../contexts/StoreContext'


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const {cartTotalItems, favoritesTotal} = useStore()
  
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
            <li className="headerLink">HOME</li>
            <li className="headerLink">SHOP</li>
            <li className="headerLink">BLOG</li>
            <li className="headerLink">ABOUT</li>
            <li className="headerLink">SERVICES</li>
          </ul>
        </div>
  
        <div className="flex items-center space-x-4 text-sm font-light">
          <p className="hidden lg:inline font-semibold cursor-pointer"> SIGN IN</p>
          <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
          <div className='relative inline-block'>
            <HeartIcon className='h-6 w-6 cursor-pointer' />
            <span className="badge">{favoritesTotal()}</span>
          </div>
          <div className='relative inline-block'>
              <ShoppingCartIcon className='h-6 w-6 cursor-pointer' />
              <span className="badge">{cartTotalItems()}</span>
          </div>
        
          <Link to="/account">
            <Avatar sx={{ bgcolor: deepPurple[500] }} className='cursor-pointer'>J</Avatar>
          </Link>
        </div>
      </header>
    )
}

export default Header
