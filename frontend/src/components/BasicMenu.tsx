import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import {FiMenu} from 'react-icons/fi'


const BasicMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
      setAnchorEl(null)
    }
  
    return (
      <div className="md:!hidden">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className="!capitalize !text-white"
        >
          <FiMenu className='h-6 w-6 text-black' aria-hidden='true' />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Home</MenuItem>
          <MenuItem onClick={handleClose}>Search</MenuItem>
          <MenuItem onClick={handleClose}>Basket</MenuItem>
          <MenuItem onClick={handleClose}>Favorites</MenuItem>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
        </Menu>
      </div>
    )
}

export default BasicMenu
