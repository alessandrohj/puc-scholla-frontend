import React from 'react'
import { Link } from 'react-router-dom'
import { IconHome, IconSchool,IconProfile, IconTasks, IconUsers } from '../../assets'
import './navbar.scss'

export default function Navbar({role}) {


  return (
    <div className='navbar'>
        <div className='navbar-items'>
          <Link to='/' className='navbar-items-link'>
        <IconHome />
        </Link>
        <Link to={role === 'super' ? '/schools' : '/classes'} className='navbar-items-link school'>
        <IconSchool />
        </Link>
        <Link  to={role === 'super' ? '/users' : '/assignment'}   className='navbar-items-link'>
       {role === 'super' ? <IconUsers /> : <IconTasks />}
        </Link>
        <Link  to='/profile' className='navbar-items-link'>
        <IconProfile />
        </Link>
        </div>
    </div>
  )
}
