import React from 'react'
import { IconHome, IconSchool,IconProfile, IconTasks } from '../../assets'
import './navbar.scss'

export default function Navbar() {

  return (
    <div className='navbar'>
        <div className='navbar-items'>
        <IconHome />
        <IconSchool />
        <IconTasks />
        <IconProfile />
        </div>
    </div>
  )
}
