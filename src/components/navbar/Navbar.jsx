import React from 'react'
import { Link } from 'react-router-dom'
import { IconHome, IconSchool,IconProfile, IconTasks } from '../../assets'
import './navbar.scss'

export default function Navbar() {


  return (
    <div className='navbar'>
        <div className='navbar-items'>
          <Link className='navbar-items-link'>
        <IconHome />
        </Link>
        <Link to='/classes' className='navbar-items-link school'>
        <IconSchool />
        </Link>
        <Link  className='navbar-items-link'>
        <IconTasks />
        </Link>
        <Link  className='navbar-items-link'>
        <IconProfile />
        </Link>
        </div>
    </div>
  )
}
